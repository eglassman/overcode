import cgi
from collections import Counter
import json
import os
from os import path
import pickle
import pprint

from external import identifier_renamer
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
        self.canonicalPYcode = []
        self.canonicalPYcodeIndents = []

    def __str__(self):
        return "Solution(" + str(self.solnum) + ")"
    __repr__ = __str__

class VariableInstance(object):
    def __init__(self, sequence, solnum, local_name):
        self.sequence = sequence
        self.solnum = solnum
        self.local_name = local_name
        self.abstract_var = None
        self.rename_to = None

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

        self.name_ctr = Counter()
        self.canon_name = None
        # solnum -> new name
        self.rename_to = {}

        self.is_unique = True

    def should_contain(self, inst):
        assert isinstance(inst, VariableInstance)
        return self.sequence == inst.sequence

    def add_instance(self, inst):
        assert isinstance(inst, VariableInstance)
        assert inst.abstract_var == None

        self.solutions[inst.solnum] = inst.local_name
        self.name_ctr[inst.local_name] += 1
        if self.is_unique:
            self.is_unique = False
        inst.abstract_var = self

    def most_common_name(self):
        name, count = self.name_ctr.most_common(1)[0]
        return name

    def print_solutions(self):
        pprint.pprint(self.solutions)

    def print_names(self):
        pprint.pprint(self.name_ctr)

    def __eq__(self, other):
        assert isinstance(other, AbstractVariable)
        return self.sequence == other.sequence

    def __repr__(self):
        if self.canon_name:
            inside = str(self.canon_name) + " " + str(self.sequence)
        else:
            inside = str(self.sequence)
        return "AbstractVariable(" + inside + ")"

    __str__ = __repr__

class Stack(object):
    def __init__(self):
        self.representative = None
        self.members = []
        self.count = 0

    def should_contain(self, sol):
        assert isinstance(sol, Solution)
        if self.representative == None:
            return True
        return set(self.representative.canonicalPYcode) == set(sol.canonicalPYcode)

    def add_solution(self, sol):
        assert isinstance(sol, Solution)
        if self.representative == None:
            self.representative = sol
        self.members.append(sol.solnum)
        self.count += 1


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

def find_canon_names(all_abstracts):
    seen = {}
    uniques = []
    for abstract in all_abstracts:
        if abstract.is_unique:
            uniques.append(abstract)
            continue

        name = abstract.most_common_name()
        if name in seen:
            append = '___' + str(seen[name])
        else:
            append = ''

        abstract.canon_name = name + append
        seen[name] = seen.get(name, 1) + 1
    for unique in uniques:
        name = unique.most_common_name()
        if name in seen:
            unique.canon_name = name + '__'
        else:
            unique.canon_name = name


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

        sol.abstract_vars.append(var.abstract_var)

def extract_and_collect_var_seqs(all_solutions, all_abstracts):
    skipped = []
    for sol in all_solutions:
        try:
            extract_sequences_single_sol(sol, all_abstracts)
        except ExtractionException:
            skipped.append(sol.solnum)

    return skipped

###############################################################################
## Rewrite solutions
###############################################################################
def fix_name_clashes(sol):
    if len(sol.abstract_vars) == len(set(sol.abstract_vars)):
        return
    assert len(sol.abstract_vars) > len(set(sol.abstract_vars))
    print 'Fixing clash in', sol.solnum

    # Multiple instances of a single abstract variable
    for var in sol.abstract_vars:
        indices = [i for i, v in enumerate(sol.abstract_vars) if v == var]
        if len(indices) == 1:
            continue
        for ind in indices:
            abs_var = sol.abstract_vars[ind]
            local_var = sol.local_vars[ind]
            if not abs_var.canon_name == local_var.local_name:
                # If canon and local names are both i, don't rename to i_i__
                new_name = abs_var.canon_name + '_' + local_var.local_name + '__'
                local_var.rename_to = new_name

class RenamerException(Exception):
    """A problem occurred while calling identifier_renamer."""

def rewrite_source(sol, tidy_path, canon_path, phrase_counter, tab_counters):
    with open(tidy_path, 'U') as f:
        renamed_src = f.read()

    extra_token = '_temp'
    for lvar in sol.local_vars:
        if lvar.rename_to:
            shared_name = lvar.rename_to
        else:
            shared_name = lvar.abstract_var.canon_name

        # Two passes to avoid conflicts between new names and old names
        try:
            renamed_src = identifier_renamer.rename_identifier(
                renamed_src, lvar.local_name, shared_name + extra_token)
            renamed_src = identifier_renamer.rename_identifier(
                renamed_src, shared_name + extra_token, shared_name)
        except:
            raise RenamerException('Failed to rename ' + str(sol.solnum))

    for unstrippedLine in renamed_src.split('\n'):
        strippedLine = unstrippedLine.strip()
        if not (unstrippedLine == '' or strippedLine == ''):
            leadingSpace = len(unstrippedLine) - len(strippedLine) #how much was lobbed off?
            sol.canonicalPYcode.append(strippedLine)
            sol.canonicalPYcodeIndents.append(leadingSpace)

            if strippedLine not in tab_counters:
                tab_counters[strippedLine] = Counter()
            tab_counters[strippedLine].update([leadingSpace])

    with open(canon_path, 'w') as f:
        f.write(renamed_src)

    phrase_counter.update(sol.canonicalPYcode)
    # TODO: pygmentize?

def rewrite_all_solutions(all_solutions, phrase_counter, tab_counters, folderOfData):
    skipped = []

    canon_folder = path.join(folderOfData, 'tidyDataCanonicalized')
    ensure_folder_exists(canon_folder)
    for sol in all_solutions:
        fix_name_clashes(sol)

        tidy_path = path.join(folderOfData, 'tidyData', sol.solnum + '.py')
        canon_path = path.join(canon_folder, sol.solnum + '.py')
        try:
            rewrite_source(sol, tidy_path, canon_path, phrase_counter, tab_counters)
        except RenamerException:
            skipped.append(sol.solnum)

    return skipped


###############################################################################
## Create stacks
###############################################################################
def stack_solutions(all_solutions, all_stacks):
    for sol in all_solutions:
        for stack in all_stacks:
            if stack.should_contain(sol):
                stack.add_solution(sol)
                break
        else:
            new_stack = Stack()
            new_stack.add_solution(sol)
            all_stacks.append(new_stack)


###############################################################################
## Populate solutions, phrases, variables
###############################################################################
def create_output(all_stacks, solutions, phrases, variables):
    for stack in all_stacks:
        # solution = {'code': groupDescription['rep']['code']}
        solution = {}
        solution['phraseIDs'] = set()
        solution['variableIDs'] = set()
        solution['lines'] = []
        rep = stack.representative
        for i in range(len(rep.canonicalPYcode)):
            phrase = rep.canonicalPYcode[i]
            if phrase not in phrases:
                phrases.append(phrase)
            phraseID = phrases.index(phrase) + 1
            solution['phraseIDs'].add(phraseID)
            lineDict = {}
            lineDict['indent'] = rep.canonicalPYcodeIndents[i]
            lineDict['phraseID'] = phraseID
            solution['lines'].append(lineDict)
        # if 'sharedVars' in groupDescription['rep'].keys():
        for avar in rep.abstract_vars:
            if not avar.canon_name.endswith('__'):
                if avar not in variables:
                    variables.append(avar)
                varID = variables.index(avar) + 1
                solution['variableIDs'].add(varID)
        # else:
        #     solution['variableIDs'] = []
        # if 'fnames' in groupDescription['rep'].keys():
        #     solution['keywords'] = rep['fnames']
        solution['number'] = int(rep.solnum)
        solution['members'] = stack.members
        solution['count'] = stack.count
        solution['phraseIDs'] = list(solution['phraseIDs'])
        solution['variableIDs'] = list(solution['variableIDs'])
        solutions.append(solution)

def reformat_phrases(phrases, tab_counters):
    for i in range(len(phrases)):
        phrase = phrases[i]
        mostCommonIndent = tab_counters[phrase].most_common(1)[0][0]
        phrases[i] = {
            'id': i+1,
            'code': cgi.escape(phrase),
            'indent': mostCommonIndent,
            # 'codeWithFeatureSpans': generateCodeWithFeatureSpans(phrase)
        }

def reformat_variables(variables):
    for i in range(len(variables)):
        var = variables[i]
        variables[i] = {
            'id': i+1,
            'varName': var.canon_name,
            'sequence': var.sequence
        }


###############################################################################
## Dump output
###############################################################################

#from: http://stackoverflow.com/questions/8230315/python-sets-are-not-json-serializable
#and http://stackoverflow.com/questions/624926/how-to-detect-whether-a-python-variable-is-a-function
class ElenaEncoder(json.JSONEncoder):
    def default(self, obj):
       if isinstance(obj, set):
          return {'type':'set', 'list':list(obj)}
       if isinstance(obj, types.FunctionType):
          return {'type':'function'}
       return json.JSONEncoder.default(self, obj)


def run(folderOfData, destFolder):
    ensure_folder_exists(destFolder)
    def dumpOutput(data, filename, sort_keys=True, indent=4):
        filepath = path.join(destFolder, filename)
        with open(filepath, 'w') as f:
            json.dump(data, f, sort_keys=sort_keys, indent=indent, cls=ElenaEncoder)

    all_solutions = []
    populate_from_pickles(all_solutions, path.join(folderOfData, 'pickleFiles'))

    all_abstracts = []
    skipped_extract_sequences = extract_and_collect_var_seqs(
        all_solutions, all_abstracts)
    find_canon_names(all_abstracts)

    phrase_counter = Counter()
    tab_counters = {}
    skipped_rewrite = rewrite_all_solutions(
        all_solutions, phrase_counter, tab_counters, folderOfData)

    all_stacks = []
    stack_solutions(all_solutions, all_stacks)

    solutions = []
    phrases = []
    variables = []
    create_output(all_stacks, solutions, phrases, variables)
    reformat_phrases(phrases, tab_counters)
    reformat_variables(variables)

    dumpOutput(solutions, 'solutions.json')
    dumpOutput(phrases, 'phrases.json')
    dumpOutput(variables, 'variables.json')

    # pprint.pprint(all_solutions)
    # pprint.pprint(all_solutions[0].local_vars)
    # pprint.pprint(all_abstracts)
    # print(all_abstracts[0])
    # print "NAME:",all_abstracts[0].most_common_name()
    # print all_solutions[0].local_vars[0]
    print "skipped when extracting:", skipped_extract_sequences
    print "skipped when rewriting:", skipped_rewrite
