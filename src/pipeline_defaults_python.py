from os import path
import StringIO
import subprocess

import pythonTidy
import remove_comments

def tidy_non_oppia(filename, sourceDir, destDir, testedFunctionName):
    tidy_up_buffer = StringIO.StringIO()
    pythonTidy.tidy_up(path.join(sourceDir, filename), tidy_up_buffer)
    new_src = remove_comments.minify(tidy_up_buffer.getvalue())

    lines = new_src.split('\n')
    with open(path.join(destDir, filename), 'w') as f:
        for line in lines:
            if line.strip() == '#!/usr/bin/python':
                continue
            if line.strip() == '# -*- coding: utf-8 -*-':
                continue
            if line.strip() == 'None':
                continue
            # Get rid of calls which don't return anything and were
            # presumably for debugging
            if line.split('(')[0] == testedFunctionName:
                print 'removing: ', line
                continue
            # Get rid of print statements with no indent
            if line.startswith('print'):
                print 'removing: ', line
                continue

            f.write(line+'\n')


def tidy_oppia(filename, sourceDir, destDir, testedFunctionName):
    tidy_up_buffer = StringIO.StringIO()
    pythonTidy.tidy_up(path.join(sourceDir, filename), tidy_up_buffer)
    new_src = remove_comments.minify(tidy_up_buffer.getvalue())

    lines = new_src.split('\n')
    with open(path.join(destDir, filename), 'w') as f:
        # Include a function definition as the first line
        f.write('def ' + testedFunctionName + '():\n')
        for line in lines:
            if line.strip() == '#!/usr/bin/python':
                continue
            if line.strip() == '# -*- coding: utf-8 -*-':
                continue
            if line.strip() == 'None':
                continue
            # Get rid of calls which don't return anything and were
            # presumably for debugging
            if line.split('(')[0] == testedFunctionName:
                print 'removing: ', line
                continue
            # Do not remove print statements since oppia solutions print
            # their results instead of returning them

            # the given solution becomes the body of a function, so indent each line
            f.write("    "+line+'\n')


def make_default_finalizer(testedFunctionName):
    """Ignores most of the stuff in the trace and returns a tuple of
    new_trace, argumentNames, returnVarNames. The original trace
    consists of a list of these:
    {
        event: str,
        func_name: str,
        globals: { name: val, ... },
        heap: [...],
        line: int,
        ordered_globals: [...],
        stack_to_render: [...],
        stdout: ''
    }

    The new trace is a dict like this:
    { 0: {
        Line: int,
        globals: { name: val, ...},
        locals: { name: val, ...}
    }, 1: {...}, ...}

    new_trace[i][Line] = old_trace[i][line] if it exists, -1 otherwise
    new_trace[i][globals] = dereferenced old_trace[i][globals]
    new_trace[i][locals] = dereferenced encoded_locals from the last frame of
                           the old_trace's stack_to_render

    """
    def elena_finalizer(input_code, output_trace):
        def extractValues(dictOfVars,heap):
            dictToReturn = {}
            for varname, varencoded in dictOfVars.iteritems():
                if isinstance(varencoded, list): # varencoded is list:
                    vartype = varencoded[0]
                    varvalue = varencoded[1]
                    if vartype == 'REF': # then you have to find it in the heap
                        heapvartype = heap[varvalue][0]
                        heapvarvalue = heap[varvalue][1]
                        if heapvartype == 'NORMALVAR':
                            dictToReturn[varname] = heapvarvalue
                    elif vartype == 'NORMALVAR':
                        dictToReturn[varname] = varvalue
                    else:
                        continue
                else:
                    # the primitives thing isn't turned on, so it's just stored
                    # as itself with no annotation about type
                    dictToReturn[varname] = varencoded
            return dictToReturn

        def extractArgumentsAndReturnVars(step):
            namesOfArguments = []
            namesOfReturnVariables = []
            try:
                dictOfVars = step['stack_to_render'][0]['encoded_locals']
                if step['event'] == 'call' and step["func_name"] == testedFunctionName:
                    for variableName in dictOfVars.keys():
                        namesOfArguments.append(variableName)
                if '__return__' in dictOfVars.keys() and step["func_name"] == testedFunctionName:
                    for variableName in dictOfVars.keys():
                        if variableName != '__return__' and dictOfVars[variableName] == dictOfVars['__return__']:
                            namesOfReturnVariables.append(variableName)
            except:
                pass
            return namesOfArguments, namesOfReturnVariables

        progTraceDict = {}
        argAndReturnVarInfo = {}
        ctr = 0
        for scope in output_trace:
            progTraceDict[ctr] = {}
            if 'event' in scope and scope['event']=='instruction_limit_reached':
                print "Exceeded instruction limit"

            if 'line' in scope:
                progTraceDict[ctr]['Line'] = scope['line']
            else:
                progTraceDict[ctr]['Line'] = -1
            progTraceDict[ctr]['globals'] = {}
            progTraceDict[ctr]['locals'] = {}
            if 'globals' in scope:
                if scope['globals']:  #if its not an empty list
                    progTraceDict[ctr]['globals'] = extractValues(scope['globals'],scope['heap'])
            if 'stack_to_render' in scope:
                if scope['stack_to_render']:  #if its not an empty list
                    progTraceDict[ctr]['locals'] = extractValues(scope['stack_to_render'][-1]['encoded_locals'],scope['heap'])
            ctr += 1
        namesOfArguments_accumulated = []
        namesOfReturnVariables_accumulated = []
        for scope in output_trace:
            namesOfArguments, namesOfReturnVariables = extractArgumentsAndReturnVars(scope)
            namesOfArguments_accumulated.extend(namesOfArguments)
            namesOfReturnVariables_accumulated.extend(namesOfReturnVariables)
        argAndReturnVarInfo['namesOfArguments'] = list(set(namesOfArguments_accumulated))
        argAndReturnVarInfo['namesOfReturnVariables'] = list(set(namesOfReturnVariables_accumulated))
        return progTraceDict, argAndReturnVarInfo['namesOfArguments'], argAndReturnVarInfo['namesOfReturnVariables']
    return elena_finalizer

def extract_var_info_from_trace(trace):
    """
    returns {
        __lineNo__: [ (step, line # at that step), ...],
        varname1: [ (step, <value at that step> or 'myNaN'), ...],
        varname2: [...],
        ...
    }

    where [varname1, varname2, ...] is the set union of all local variable
    names found in the trace
    """

    numSteps = len(trace)
    results = { '__lineNo__': [] }
    accumulatedVarnames = set()
    # Assumes trace has been formatted by elena_finalizer, and the keys of
    # the trace are generated with a counter
    # TODO: can we assume this? Or do we have to sort trace.keys()?
    for step in xrange(numSteps):
        event = trace[step]
        # TODO: do we need (step, <line # at that step>) pairs? Or can we
        # just use the index since we're appending in order?
        results['__lineNo__'].append((step, event['Line']))
        accumulatedVarnames |= set(event['locals'].keys())

    for var in accumulatedVarnames:
        # Make a list of (step, varVal) pairs for each step in the trace,
        # where varVal is the value of var if var is defined at that step,
        # and 'myNaN' otherwise
        # TODO: See above - do we need the step?
        results[var] = [(s, trace[s]['locals'].get(var, 'myNaN')) for s in xrange(numSteps)]
    return results


def format_as_html(filename, sourceDir, destDir):
    sourcePath = path.join(sourceDir, filename)
    destPath = path.join(destDir, filename + '.html')

    subprocess.call("pygmentize -O style=colorful,linenos=1 -o %s %s" % (destPath, sourcePath), shell=True)

    # Format html code
    with open(destPath, 'r') as f:
        htmlCode = f.read()
    with open(destPath, 'w') as f:
        f.write(htmlCode.replace("\"","'").replace("\n","<br>"))

