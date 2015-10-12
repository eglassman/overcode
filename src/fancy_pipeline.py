import os
from os import path
import pickle

import pprint

from pipeline_util import ensure_folder_exists


###############################################################################
## Classes
###############################################################################
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

    def __repr__(self):
        return "Variable(" + self.local_name + ") in solution " + str(self.solnum)
    
    def __str__(self):
        s = """
Local name: %s
Solution: %s
Sequence: %s
""" % (self.local_name, self.solnum, str(self.sequence))
        if self.abstract_var:
            s += "Belongs to: " + AbstractVariable.__repr__(self.abstract_var)
        return s

class AbstractVariable(object):
    def __init__(self, sequence):
        self.sequence = sequence
        self.solutions = {}

    def should_contain(self, inst):
        assert isinstance(inst, VariableInstance)
        return self.sequence == inst.sequence

    def add_instance(self, inst):
        assert isinstance(inst, VariableInstance)
        assert inst.abstract_var == None

        self.solutions[inst.solnum] = inst.local_name
        inst.abstract_var = self

    def __repr__(self):
        return "AbstractVariable(" + str(self.sequence) + ")"

    def __str__(self):
        return """
Sequence: %s
Solutions: %s""" % (str(self.sequence), pprint.pformat(self.solutions))

###############################################################################
## Load preprocessed data
###############################################################################
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

###############################################################################
## Abstract variable collection
###############################################################################
def add_to_abstracts(var, all_abstracts):
    for abstract in all_abstracts:
        if abstract.should_contain(var):
            abstract.add_instance(var)
            break
    else:
        new_abstract = AbstractVariable(var.sequence)
        new_abstract.add_instance(var)
        all_abstracts.append(new_abstract)

###############################################################################
## Variable sequence extraction
###############################################################################
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

class ExtractionException(Exception):
    """No __return__ value in a solution trace."""

def extract_sequences_single_sol(sol, all_abstracts):
    if '__return__' not in sol.trace:
        raise ExtractionException('Too long')

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
        add_to_abstracts(var, all_abstracts)

def extract_and_collect_var_seqs(all_solutions, all_abstracts):
    skipped = []
    for sol in all_solutions:
        try:
            extract_sequences_single_sol(sol, all_abstracts)
        except ExtractionException:
            skipped.append(sol.solnum)

    return skipped


###############################################################################
## Dump output
###############################################################################

#from: http://stackoverflow.com/questions/8230315/python-sets-are-not-json-serializable
#and http://stackoverflow.com/questions/624926/how-to-detect-whether-a-python-variable-is-a-function
# class ElenaEncoder(json.JSONEncoder):
#     def default(self, obj):
#        if isinstance(obj, set):
#           return {'type':'set', 'list':list(obj)}
#        if isinstance(obj, types.FunctionType):
#           return {'type':'function'}
#        return json.JSONEncoder.default(self, obj)

# def dumpOutput(data, filename, sort_keys=True, indent=4):
#     filepath = path.join(destFolder, filename)
#     with open(filepath, 'w') as f:
#         json.dump(data, f, sort_keys=sort_keys, indent=indent, cls=ElenaEncoder)

def run(folderOfData, destFolder):
    all_solutions = []
    populate_from_pickles(all_solutions, path.join(folderOfData, 'pickleFiles'))
    all_abstracts = []
    skipped_extract_sequences = extract_and_collect_var_seqs(
        all_solutions, all_abstracts)

    # collect_abstracts(all_solutions, all_abstracts)


    # pprint.pprint(all_solutions)
    # pprint.pprint(all_solutions[0].local_vars)
    pprint.pprint(all_abstracts)
    # print(all_abstracts[0])
    print all_solutions[0].local_vars[0]
    print "skipped:", skipped_extract_sequences
