import os
from os import path
import pickle

import pprint

from pipeline_util import ensure_folder_exists

class Solution(object):
    def __init__(self, solnum, trace, args, retVars):
        self.solnum = solnum
        self.trace = trace
        self.args = args
        self.retVars = retVars
        self.local_vars = []
        self.abstract_vars = []

    def __str__(self):
        return "Solution(" + str(self.solnum) + ")"
    __repr__ = __str__

class VariableInstance(object):
    def __init__(self, sequence, solnum, local_name):
        self.sequence = sequence
        self.solnum = solnum
        self.local_name = local_name
        self.abstract_var = None

    def __str__(self):
        return "Variable(" + self.local_name + ") in solution " + str(self.solnum)
    __repr__ = __str__

def populate_from_pickles(all_solutions, pickleSrc, formattedSrc=None, formattedExtn='.py.html'):
    print "Loading data"
    for filename in os.listdir(pickleSrc):
        solnum = filename.split('.')[0]
        solNumInt = int(solnum)
        print solnum

        with open(path.join(pickleSrc, filename), 'r') as f:
            unpickled = pickle.load(f)

        sol = Solution(solnum,
                       unpickled['trace'],
                       unpickled['args'],
                       unpickled['returnVars'])

        if formattedSrc:
            with open(path.join(formattedSrc, solNum + formattedExtn), 'r') as f:
                sol.formatted_code = f.read()

        all_solutions.append(sol)


def extract_single_sequence(column):
    valueSequence = []
    for elem in column:
        val = elem[1]
        if val != 'myNaN' and val != None:

            if valueSequence == []:
                valueSequence.append(val)
            else:
                lastval = valueSequence[-1]
                if val != lastval:
                    valueSequence.append(val)
    return valueSequence

def extract_variable_sequences(all_solutions):
    skipped = []
    for sol in all_solutions:
        if '__return__' not in sol.trace:
            skipped.append(sol.solnum)
            continue

        for localVarName, localVarData in sol.trace.iteritems():
            if localVarName.startswith('__'):
                continue
            sequence = extract_single_sequence(localVarData)
            if (len(sequence) == 1 and
                type(sequence[0]) is str and
                sequence[0].startswith('__')):
                # Just a function definition
                continue
            var = VariableInstance(sequence, sol.solnum, localVarName)
            sol.local_vars.append(var)
    return skipped


#from: http://stackoverflow.com/questions/8230315/python-sets-are-not-json-serializable
    #and http://stackoverflow.com/questions/624926/how-to-detect-whether-a-python-variable-is-a-function
    class ElenaEncoder(json.JSONEncoder):
        def default(self, obj):
           if isinstance(obj, set):
              return {'type':'set', 'list':list(obj)}
           if isinstance(obj, types.FunctionType):
              return {'type':'function'}
           return json.JSONEncoder.default(self, obj)

def dumpOutput(data, filename, sort_keys=True, indent=4):
    filepath = path.join(destFolder, filename)
    with open(filepath, 'w') as f:
        json.dump(data, f, sort_keys=sort_keys, indent=indent, cls=ElenaEncoder)

def run(folderOfData, destFolder):
    all_solutions = []
    populate_from_pickles(all_solutions, path.join(folderOfData, 'pickleFiles'))

    skipped_extract_sequences = extract_variable_sequences(all_solutions)

    pprint.pprint(all_solutions)
    pprint.pprint(all_solutions[0].local_vars)
