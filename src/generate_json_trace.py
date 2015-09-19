# Generates a JSON trace that is compatible with the js/pytutor.js frontend

import sys, pg_logger, json
from optparse import OptionParser

# print sys.argv[1]
testedfuncname = "dotProduct"
#sys.exit()

# To make regression tests work consistently across platforms,
# standardize display of floats to 3 significant figures
#
# Trick from:
# http://stackoverflow.com/questions/1447287/format-floats-with-standard-json-module
json.encoder.FLOAT_REPR = lambda f: ('%.3f' % f)

def elena_finalizer(input_code, output_trace):
  def extractValues(dictOfVars,heap):
    dictToReturn = {}
    for varname, varencoded in dictOfVars.iteritems():
        if isinstance(varencoded, list): # varencoded is list:
            vartype = varencoded[0]
            varvalue = varencoded[1]
            if vartype == 'REF': #then you have to find it in the heap
                heapvartype = heap[varvalue][0]
                heapvarvalue = heap[varvalue][1]
                if heapvartype == 'NORMALVAR':
                    dictToReturn[varname] = heapvarvalue
            elif vartype == 'NORMALVAR':
                dictToReturn[varname] = varvalue
            else:
                continue
        else:
            dictToReturn[varname] = varencoded #because the primitives thing isn't turned on, so its just stored as it self with no annotation about type
    return dictToReturn

  def extractArgumentsAndReturnVars(step):
    namesOfArguments = []
    namesOfReturnVariables = []
    try:
        dictOfVars = step['stack_to_render'][0]['encoded_locals']
        #print dictOfVars
        if step['event'] == 'call' and step["func_name"] == testedfuncname:
            #print 'called on ', dictOfVars.keys()
            for variableName in dictOfVars.keys():
                namesOfArguments.append(variableName)
            #print namesOfArguments
        if '__return__' in dictOfVars.keys() and step["func_name"] == testedfuncname:
            for variableName in dictOfVars.keys():
                if variableName != '__return__' and dictOfVars[variableName] == dictOfVars['__return__']:
                    #print variableName, ' is returned'
                    namesOfReturnVariables.append(variableName)
    except:
        pass
    return namesOfArguments, namesOfReturnVariables

  progTraceDict = {}
  argAndReturnVarInfo = {}
  ctr = 0
  for scope in output_trace:
    #print '-------------------------------------------------'
    #print scope
    #for key in scope.keys():
    #    print key, ' : ', scope[key]
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

    # for k,v in e['locals'].iteritems():
    #   if hasattr(v, '__call__'):
    #     #print 'its a function'
    #     e['locals'][k] = '__function__'
    #try:
    #  #note: the following is no longer just locals!
    #  progTraceDict[ctr]['locals'] = dict(scope['stack_to_render'][0]['encoded_locals'].items() + scope['globals'].items())
    #except:
    #  progTraceDict[ctr]['locals'] = scope['globals']

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

def json_finalizer(input_code, output_trace):
  ret = dict(code=input_code, trace=output_trace)
  # sort_keys=True leads to printing in DETERMINISTIC order, but might
  # screw up some old tests ... however, there is STILL non-determinism
  # in Python 3.3 tests, ugh!
  json_output = json.dumps(ret, indent=INDENT_LEVEL)
  return json_output

def js_var_finalizer(input_code, output_trace):
  global JS_VARNAME
  ret = dict(code=input_code, trace=output_trace)
  json_output = json.dumps(ret, indent=None)
  return "var %s = %s;" % (JS_VARNAME, json_output)

# parser = OptionParser(usage="Generate JSON trace for pytutor")
# parser.add_option('-c', '--cumulative', default=False, action='store_true',
#         help='output cumulative trace.')
# parser.add_option('-p', '--heapPrimitives', default=False, action='store_true',
#         help='render primitives as heap objects.')
# parser.add_option('-o', '--compact', default=False, action='store_true',
#         help='output compact trace.')
# parser.add_option('-i', '--input', default=False, action='store',
#         help='JSON list of strings for simulated raw_input.', dest='raw_input_lst_json')
# parser.add_option("--create_jsvar", dest="js_varname", default=None,
#                   help="Create a JavaScript variable out of the trace")

# (options, args) = parser.parse_args()
# INDENT_LEVEL = None if options.compact else 2

# fin = sys.stdin if args[0] == "-" else open(args[0])

# if options.js_varname:
#   JS_VARNAME = options.js_varname
#   print(pg_logger.exec_script_str_local(fin.read(), options.raw_input_lst_json, options.cumulative, options.heapPrimitives, js_var_finalizer))
# else:
#   print(pg_logger.exec_script_str_local(fin.read(), options.raw_input_lst_json, options.cumulative, options.heapPrimitives, json_finalizer))

#return pg_logger.exec_script_str_local(fin.read(), options.raw_input_lst_json, options.cumulative, options.heapPrimitives, elena_finalizer)
