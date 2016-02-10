import cgi
from collections import Counter
import json
from math import log
import os
from os import path
import pickle
import pprint
import re
import types

from external import identifier_renamer
from pipeline_util import ensure_folder_exists, make_hashable

use_original_line_equality_metric = False

# CORRECT_OUTPUT = {
#     "dotProduct([-22, -54, 20, 23, 76, 0], [48, 62, -4, 89, -41, 15])": -5553, 
#     "dotProduct([-45], [-60])": 2700, 
#     "dotProduct([-62, 4, 73, -46, 79, -56], [77, -80, 3, 99, 59, 7])": -5160, 
#     "dotProduct([-7, 96, -5, -45, -50, 5, -98, -16, -58], [88, -79, -47, 4, -19, -14, -47, -75, 35])": -3489, 
#     "dotProduct([-90, -29, 36, -74, -24, 10, -16, 16, -28], [68, 39, -5, 7, 67, 91, 48, -60, -67])": -8499, 
#     "dotProduct([31, 98, -78, -50, 55, -4], [-94, -23, -56, 31, 77, -84])": 2221, 
#     "dotProduct([4, 69, -97], [-91, -71, -93])": 3758, 
#     "dotProduct([68, 33, 56, 20, 4], [18, 93, -15, -57, -82])": 1985, 
#     "dotProduct([69, 57, -64, -4, -5, -32, 30, 33], [-13, -16, -73, 26, -11, 98, 100, -8])": 2414, 
#     "dotProduct([72, 18, 18, -57, -91, 61], [37, 8, 11, 30, 2, -64])": -2790
# }
# CORRECT_OUTPUT = {
#     "dotProduct([1, 2, 3], [4, 5, 6])": 32
# }
# CORRECT_OUTPUT = {"is_list_permutation(['1', '2', 'a'], ['2', 'a', '1'])": ('1',
#                                                            1,
#                                                            str),
#  'is_list_permutation([0, 4, 8, 3, 0, 2, 2, 1, 4, 7, 8, 3, 7, 0, 0], [3, 4, 0, 3, 8, 0, 2, 0, 7, 2, 0, 3, 7, 2, 1])': False,
#  'is_list_permutation([0, 4, 8, 3, 2, 2, 1, 4, 7, 8, 3, 7, 0], [3, 4, 6, 2, 1, 2, 6, 7, 9, 8])': False,
#  'is_list_permutation([1, 1, 1], [1, 1, 1])': (1, 3, int),
#  'is_list_permutation([1, 1, 2, 2, 1], [2, 1, 2, 1, 1])': (1, 3, int),
#  'is_list_permutation([1, 1, 2, 2, 2], [1, 2, 2, 1, 2])': (2, 3, int),
#  'is_list_permutation([1, 1], [1])': False,
#  "is_list_permutation([1, 2, '5', 2, 5, 3, 4, 4, 5, 5, 6], [3, 5, 1, '5', 2, 5, 2, 6, 4, 5, 4])": (5,
#                                                                                                    3,
#                                                                                                    int),
#  'is_list_permutation([1, 2, 1], [1, 2, 1])': (1, 2, int),
#  'is_list_permutation([1, 2, 1], [2, 1, 1])': (1, 2, int),
#  'is_list_permutation([1, 2, 1], [2, 1, 2])': False,
#  'is_list_permutation([1, 2, 3], [3, 2, 1])': (1, 1, int),
#  "is_list_permutation([1], ['1', 1])": False,
#  'is_list_permutation([1], [1])': (1, 1, int),
#  'is_list_permutation([1], [])': False,
#  "is_list_permutation([3, '5', '5', 7, 1, 2], [1, 2, '5', 7, 3, '5'])": ('5',
#                                                                          2,
#                                                                          str),
#  "is_list_permutation([3, '5', 7, 1], [1, 2, 3, '5', 7])": False,
#  'is_list_permutation([3, 2, 1, 4, 5, 6, 6, 6, 6], [1, 6, 2, 6, 3, 6, 4, 6, 5])': (6,
#                                                                                    4,
#                                                                                    int),
#  "is_list_permutation([], ['1'])": False,
#  'is_list_permutation([], [])': (None, None, None)}

# CORRECT_OUTPUT = {"myLog(42, 5)": 2, "myLog(4, 16)": 0, "myLog(149, 3)": 4, "myLog(26, 3)": 2, "myLog(27, 3)": 3, "myLog(28, 3)": 3, "myLog(76, 4)": 3, "myLog(12, 13)": 0}
# CORRECT_OUTPUT = {"longest_word('zebra', ['za', 'zaa', 'zea', 'bra', 'arb'])": "arb", "longest_word('aaa', ['aaa', 'aaaa', 'aa', 'a'])": "aaa", "longest_word('xylophone', ['nab', 'baa', 'ban', 'x', 'an', 'a'])": "x", "longest_word('zebra', ['xx', 'yy', 'oo', 'a', 'kk'])": "a", "longest_word('another', ['the', 'another', 'ther', 'tha', 'a'])": "another", "longest_word('abcd', ['aaa', 'cab', 'bat', 'a', 'cabs'])": "cab", "longest_word('a', ['aaa', 'cab', 'bat', 'a', 'cabs'])": "a", "longest_word('abcd', ['dcba', 'dab', 'abcde', 'bcad', 'b'])": "bcad", "longest_word('another', ['ran', 'tao', 'r', 'ona', 'art'])": "art", "longest_word('banana', ['nab', 'baa', 'ban', 'an', 'a'])": "baa", "longest_word('ab', ['aba', 'ba', 'bab'])": "ba", "longest_word('zebra', ['zen', 'zag', 'mag', 'trag', 'zr'])": "zr", "longest_word('xylophone', ['lyx', 'ophxyloen', 'phone', 'one'])": "ophxyloen", "longest_word('taupe', ['ip', 'ap', 'aa', 'ap', 'ar'])": "ap", "longest_word('ana', ['nan', 'an', 'a', 'an'])": "an", "longest_word('aabbccdd', ['dd', 'abbccd', 'aa', 'abcd'])": "abbccd", "longest_word('abcd', ['aaa', 'bbb', 'ccc', 'ddd'])": None, "longest_word('abaca', ['aaa', 'cab', 'bat', 'a', 'cabs'])": "aaa", "longest_word('st', ['a', 's', 't', 'ba'])": "s", "longest_word('pow', ['wow', 'p', 'o', 'w'])": "o", "longest_word('ab', ['ab'])": "ab", "longest_word('banana', ['pqr', 'na', 'bn', 'n', 'a'])": "bn", "longest_word('taupe', ['pa', 'ta', 'ea', 'ae', 'at'])": "ae", "longest_word('stairs', ['ss', 'ai', 'rit', 'riat', 'rat'])": "riat", "longest_word('computer', ['pan', 'pat', 'par', 'on', 'retupmoc'])": "retupmoc"}

CORRECT_OUTPUT = {"flatten([[[1]], [[[5]]]])": [1, 5], "flatten([[1], [2, 3]])": [1, 2, 3], "flatten([[1], [1]])": [1, 1], "flatten([1])": [1], "flatten([[1, [2, 3]], [[4, 5, 6], [7, [8, 9]]]])": [1, 2, 3, 4, 5, 6, 7, 8, 9], "flatten([[], []])": [], "flatten([])": [], "flatten([[1]])": [1], "flatten([[1, [2, 3]], [[4, 5, 6], [7, [8, 9]]], [[3, 2, 1], [2, 1], [1, [0]]]])": [1, 2, 3, 4, 5, 6, 7, 8, 9, 3, 2, 1, 2, 1, 1, 0], "flatten([[3], [2, 1, 0], [4, 5, 6, 7]])": [3, 2, 1, 0, 4, 5, 6, 7]}
# CORRECT_OUTPUT = {'flipDict({0: 1, 2: 1, 3: 3, 6: 3})': {1: [0, 2], 3: [3, 6]},
 # 'flipDict({0: 2, 9: 0, 2: 9, 5: 9})': {0: [9], 2: [0], 9: [2, 5]},
 # 'flipDict({1: 0, 2: 1, 3: 1, 4: 1})': {0: [1], 1: [2, 3, 4]},
 # 'flipDict({1: 1})': {1: [1]},
 # 'flipDict({1: 2, 2: 1})': {1: [2], 2: [1]},
 # 'flipDict({1: 3, 2: 4})': {3: [1], 4: [2]},
 # 'flipDict({1: 6, 2: 3, 3: 2, 4: 1})': {1: [4], 2: [3], 3: [2], 6: [1]},
 # 'flipDict({2: 1, 3: 1})': {1: [2, 3]},
 # 'flipDict({8: 6, 2: 6, 4: 6, 6: 6})': {6: [2, 4, 6, 8]},
 # 'flipDict({})': {}}

###############################################################################
## Helper functions
###############################################################################
def add_to_setlist(elem,setlist):
    """Maintains a list of unique items in the order they were added"""

    if setlist==[]:
        setlist.append(elem)
    else:
        for listelem in setlist:
            if elem == listelem:
                return
        setlist.append(elem)

def get_name(var_obj):
    """Get the canonicalized name for a variable object."""

    if isinstance(var_obj, AbstractVariable):
        return var_obj.canon_name
    if var_obj.abstract_var:
        return var_obj.abstract_var.canon_name
    if var_obj.maps_to:
        return var_obj.maps_to.canon_name
    return var_obj.local_name


###############################################################################
## Classes
###############################################################################
class Solution(object):
    """Information about a single solution."""

    def __init__(self, solnum, testcase_to_trace):
        self.solnum = solnum
        # a dictionary mapping a testcase string to a trace
        self.testcase_to_trace = testcase_to_trace
        self.local_vars = []
        self.abstract_vars = []
        # a list of (line object, local names, indent) tuples
        self.lines = []
        # a list of line objects
        self.canonical_lines = []

        self.correct = None

    def getDict(self):
        return self.__dict__

    def difference_metric(self, other):
        """A number representing how similar this solution is with another.
        Higher numbers => more similar. Currently, the number of rendered
        phrases shared between the two solutions, plus the number of variable
        names shared."""
        rendered_self = set(l.render() for l in self.canonical_lines)
        rendered_other = set(l.render() for l in other.canonical_lines)
        # my_line_total = len(self.canonical_lines)
        shared_lines = rendered_self & rendered_other

        names_self = set(get_name(v) for v in self.local_vars)
        names_other = set(get_name(v) for v in other.local_vars)
        shared_names = names_self & names_other

        return len(shared_lines) + len(shared_names)

    def __str__(self):
        return "Solution(" + str(self.solnum) + ")"
    __repr__ = __str__

class VariableInstance(object):
    """A single variable within a solution."""

    def __init__(self, sequence, solnum, local_name):
        self.sequence = sequence
        self.solnum = solnum
        self.local_name = local_name
        self.abstract_var = None
        self.rename_to = None

        self.maps_to = None
        self.templates_with_indices = set()

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
    """A canonical variable as characterized by its sequence of values."""

    def __init__(self, sequence):
        # Sequence of values taken on by this variable
        self.sequence = sequence
        # solnum -> local name of this variable in that solution
        self.solutions = {}
        # Counter for keeping track of most common names
        self.name_ctr = Counter()
        self.canon_name = None
        self.is_unique = None

        self.templates_with_indices = set()

    def should_contain(self, inst):
        """
        Whether a particular VariableInstance is an example of this abstract
        variable.

        inst: an instance of VariableInstance
        returns: boolean, True if inst should be added to self, False otherewise.
        """
        assert isinstance(inst, VariableInstance)
        return self.sequence == inst.sequence

    def add_instance(self, inst):
        """
        Add a VariableInstance to this abstract variable.

        inst: an instance of VariableInstance. Must not be associated with
              another AbstractVariable.
        """
        assert isinstance(inst, VariableInstance)
        assert inst.abstract_var == None

        # Update internal data structures
        self.solutions[inst.solnum] = inst.local_name
        self.name_ctr[inst.local_name] += 1
        if self.is_unique==None:
            self.is_unique = True
        elif self.is_unique:
            self.is_unique = False
        # Link the VariableInstance to this AbstractVariable
        inst.abstract_var = self

    def most_common_name(self):
        """
        Get the most common name for this abstract variable across all solutions.

        returns: string, most common name
        """

        name, count = self.name_ctr.most_common(1)[0]
        return name

    def print_solutions(self):
        """Pretty print the solutions containing this abstract variable."""
        pprint.pprint(self.solutions)

    def print_names(self):
        """Pretty print the local names given to this abstract variable."""
        pprint.pprint(self.name_ctr)

    def __eq__(self, other):
        """Two AbstractVariables are equal if they have the same sequence."""
        assert isinstance(other, (AbstractVariable, VariableInstance))
        if isinstance(other, VariableInstance):
            return False
        return self.sequence == other.sequence

    def __hash__(self):
        return hash(make_hashable(self.sequence))

    def __repr__(self):
        if self.canon_name:
            inside = str(self.canon_name) + " " + str(self.sequence)
        else:
            inside = str(self.sequence)
        return "AbstractVariable(" + inside + ")"

    __str__ = __repr__

class Line(object):
    """A line of code, without indent recorded, with blanks for variables, and
    the corresponding abstract variables to fill the blanks."""

    def __init__(self, template, abstract_variables, line_values):
        self.template = template
        self.abstract_variables = abstract_variables
        # dictionary mapping testcase strings to sequences of values
        self.line_values = line_values

    def __hash__(self):
        if use_original_line_equality_metric:
            return hash((make_hashable(self.abstract_variables),self.template))
        return hash((make_hashable(self.line_values),self.template))

    def __eq__(self, other):
        """Old definition: Two Lines are equal if they have the same template and
        abstract variables. New definition: two Lines are equal if they have the
        same template and line values"""
        assert isinstance(other, Line)
        if use_original_line_equality_metric:
            return self.abstract_variables == other.abstract_variables and self.template == other.template
        return self.line_values == other.line_values and self.template == other.template

    def getDict(self):
        return self.__dict__

    def render(self):
        # Replace all the blanks with '{}' so we can use built-in string formatting
        # to fill in the blanks with the list of ordered names
        names = [get_name(var) for var in self.abstract_variables]

        # Make sure that a pair of curly braces in the actual line, e.g. from
        # initializing a dictionary, does not cause issues
        try:
            step1 = self.template.replace('{}', '_braces_')
            step2 = step1.replace('___', '{}').format(*names)
            return step2.replace('_braces_', '{}')
        except:
            print "original:", self.template
            print "replace braces:", step1
            print "replaces blanks:", step2
            raise


    def __str__(self):
        return self.template + " ||| " + str(self.line_values) #+ " ||| " + line_values_formatted + "\n" # + " ||| " + str(self.local_names) + "\n"
    __repr__ = __str__

class Stack(object):
    """A group of Solutions that are considered equivalent."""
    def __init__(self):
        self.representative = None
        self.members = []
        self.count = 0

    def should_contain(self, sol):
        """
        Whether a particular solution belongs in this stack.

        sol: an instance of Solution
        returns: boolean, True if sol belongs in this stack, False otherwise
        """
        assert isinstance(sol, Solution)
        if self.representative == None:
            return True

        # This captures having the same output on all test cases, but only
        # works if the two solutions were run on the same set of tests.
        same_output = self.representative.output == sol.output

        # Use Counters instead of sets so that multiple lines with the same
        # template and values do not get collapsed into one in a single
        # solution. For example, two variables both instantiated to 0 will
        # both have the form ___=0, and the information that there were two
        # such lines should not be lost.
        lines_match = Counter(self.representative.canonical_lines) == Counter(sol.canonical_lines)
        return lines_match and same_output

    def add_solution(self, sol):
        """
        Add a solution to this stack.
        """
        assert isinstance(sol, Solution)
        if self.representative == None:
            self.representative = sol
        self.members.append(sol.solnum)
        self.count += 1


###############################################################################
## Load preprocessed data
###############################################################################
def populate_from_pickles(all_solutions, pickleSrc):
    """
    Load program traces, args and return variables from pickle files as
    created by the pipeline preprocessor. Create a Solution instance for
    each pickle file and add them to all_solutions.

    all_solutions: list to add solutions to
    pickleSrc: string, path to directory containing pickle files
    formattedSrc: string, path to directory containing formatted code, e.g.
                  as HTML
    formattedExtn: string, extension of files in the formattedSrc directory

    mutates all_solutions
    """

    print "Loading data"
    for filename in os.listdir(pickleSrc):
        solnum = filename.split('.')[0]
        # print solnum

        with open(path.join(pickleSrc, filename), 'r') as f:
            unpickled = pickle.load(f)

        testcases = unpickled['testcases']
        traces = unpickled['traces']

        testcase_to_trace = {}
        for i in range(len(testcases)):
            testcase_to_trace[testcases[i]] = traces[i]

        sol = Solution(solnum, testcase_to_trace)

        all_solutions.append(sol)


###############################################################################
## Abstract variable collection
###############################################################################
def add_to_abstracts(var, all_abstracts):
    """
    Add var to the AbstractVariable it belongs in, or create a new one if there
    is not yet an appropriate AbstractVariable.

    var: an instance of VariableInstance
    all_abstracts: list of existing AbstractVariable instances

    mutates all_abstracts and var
    """

    for abstract in all_abstracts:
        if abstract.should_contain(var):
            abstract.add_instance(var)
            break
    else:
        new_abstract = AbstractVariable(var.sequence)
        new_abstract.add_instance(var)
        all_abstracts.append(new_abstract)

def find_canon_names(all_abstracts):
    """
    Assign canon names to all AbstractVariables by appending a modifier to
    the most common name if it collides with another name, or appending a
    double underscore if a variable is unique.

    all_abstracts: list of AbstractVariable instances

    mutates the elements of all_abstracts
    """

    # name -> (count, AbstractVariable)
    name_dict = {}
    uniques = []

    # Create a map from names to a list of (number of solutions using
    # that name, associated AbstractVariable instance) pairs
    for abstract in all_abstracts:
        name = abstract.most_common_name()
        count = len(abstract.solutions)
        if name not in name_dict:
            name_dict[name] = [(count, abstract)]
        else:
            name_dict[name].append((count, abstract))

    # For each name, assign modifiers if necessary in order of popularity
    for name in name_dict:
        # Sorting tuples uses the first element by default, no need to specify
        name_dict[name].sort(reverse=True)
        for i in range(len(name_dict[name])):
            count, abstract = name_dict[name][i]
            append = '' if i == 0 else '___' + str(i + 1)
            abstract.canon_name = name + append

def find_template_info_scores(abstracts):
    counts = Counter()
    for avar in abstracts:
        counts.update(avar.templates_with_indices)
    total = float(sum(counts.values()))

    # log2(1/p)
    scores = { template: log(total/count, 2) for template, count in counts.iteritems() }

    # Set a threshold that will separate templates that appear once from those
    # that appear more than once. The difference in entropy between a template
    # that appears once and one that appears twice is always 1 because of how
    # logs work, so just add 0.5 to separate nicely.
    try:
        threshold = log(total/2.0, 2) + 0.5
    except ValueError:
        print "counts:", counts
        print "total:", total
        return
    return (scores, threshold)


###############################################################################
## Variable sequence extraction
###############################################################################
def extract_single_sequence(column):
    """
    Collapse a trace of variable values over time into a single sequence.

    column: list of (step, value) pairs
    returns: list of values
    """

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

def extract_output_and_sequences_single_sol(sol, correct_abstracts, correct_output):
    """
    For each local variable in a single solution, extract its sequence of
    values, create a VariableInstance, and assign that VariableInstance to
    an AbstractVariable.

    sol: instance of Solution
    correct_abstracts: list of AbstractVariable instances. Can be empty.
    raises ExtractionException if there is no __return__ value in the
           solution trace

    mutates sol and correct_abstracts
    """

    output = {}
    sequences = {}
    for (testcase, trace) in sol.testcase_to_trace.iteritems():
        if '__return__' not in trace:
            raise ExtractionException('Solution did not run to completion')

        # The second-to-last step seems to always have the return value.
        # Steps in the trace are of the form (step, value), so take just
        # the value
        output[testcase] = trace['__return__'][-2][1]

        for localVarName, localVarData in trace.iteritems():
            if localVarName.startswith('__'):
                continue
            try:
                sequence = extract_single_sequence(localVarData)
            except RuntimeError:
                # Encountered a recursion error when comparing values. There
                # was some sort of self-referential list? Couldn't figure out
                # why so just catching the error.
                raise ExtractionException('Error extracting sequence')

            if (len(sequence) == 1 and
                type(sequence[0]) is str and
                sequence[0].startswith('__')):
                # Just a function definition
                continue
            if localVarName not in sequences:
                sequences[localVarName] = {}
            sequences[localVarName][testcase] = sequence

    sol.output = output
    sol.correct = (output == correct_output)

    for localVarName in sequences:
        var = VariableInstance(sequences[localVarName], sol.solnum, localVarName)
        sol.local_vars.append(var)

        # Only collect variables from correct solutions into AbstractVariables.
        # Incorrect solutions will be handled later.
        # TODO: split this out and handle variable collection at the same time
        # for everything?
        if sol.correct:
            add_to_abstracts(var, correct_abstracts)
            sol.abstract_vars.append(var.abstract_var)

def extract_output_and_seqs(all_solutions,
                            correct_solutions,
                            incorrect_solutions,
                            correct_abstracts):
    """
    Extract and collect variable information from all solutions.

    all_solutions: list of Solution instances
    incorrect_solutions: list for Solution instances that are incorrect and
        so have not had variables collected yet
    all_abstracts: list for AbstractVariable instances from correct solutions
    returns: list, solution numbers skipped

    mutates all_abstracts and elements of all_solutions
    """
    skipped = []
    for sol in all_solutions[:]:
        try:
            print "Collecting variables in", sol.solnum
            extract_output_and_sequences_single_sol(sol, correct_abstracts, CORRECT_OUTPUT)
            if sol.correct:
                correct_solutions.append(sol)
            else:
                incorrect_solutions.append(sol)
        except ExtractionException:
            # If we couldn't extract the required info, remove this solution from
            # the list so we don't keep trying to process it later. Since we are
            # iterating through a copy, this will not cause problems
            all_solutions.remove(sol)
            skipped.append(sol.solnum)

    return skipped


###############################################################################
## Line computation functions
###############################################################################
def extract_var_values_at_line(line_number, local_name, trace):
    """
    Get the values of a particular variable on a single line over time.

    line_number: the line number we want values for
    local_name: the name of the variable we want values of
    trace: the trace to extract info from

    returns: a list of values representing the sequence of values of the
        given variable on a particular line
    """
    values = []
    # All the steps in the trace where the line being executed is the
    # line we care about
    relevant_steps = [step for (step, line_no) in trace['__lineNo__'] if line_no == line_number]

    for relevant_step in relevant_steps:
        # For each step in the trace, if we care about that step, pick
        # out the value of the variable we are examining
        try:
            for (step, val) in trace[local_name]:
                if step == relevant_step:
                    values.append(val)
                    break
        except KeyError:
            return "not_initialized"

    return values

def compute_lines(sol, tidy_path, all_lines):
    """
    Computes line objects for the solution, adds them to sol object and the
    all_lines setlist

    Mutates sol, all_lines
    """
    with open(tidy_path, 'U') as f:
        # It's not renamed yet, but the variable has to have the same name so
        # that each time through the loop below changes it incrementally
        renamed_src = f.read()

    # Rename all variables as placeholders, and saves a mapping
    # from placeholder to (original name, variable object)
    mappings = {}
    ctr = 0
    for lvar in sol.local_vars:
        placeholder = '___' + str(ctr) + '___'
        try:
            # This variable must be named the same as the one on the next
            # line. Do not change the name of this variable in an effort to
            # make it more readable. You will break the code and cry.
            renamed_src = identifier_renamer.rename_identifier(
                renamed_src, lvar.local_name, placeholder)
        except:
            raise RenamerException('Failed to rename ' + str(sol.solnum))

        ctr += 1

        var_to_map = lvar.abstract_var if sol.correct else lvar
        mappings[placeholder] = (lvar.local_name, var_to_map)

    # Break solutions down into line objects
    # renamed_src consists of the solution with variables replaced with
    # numbered blanks.
    raw_lines = renamed_src.split('\n')
    for (line_no, raw_line) in enumerate(raw_lines, start=1):
        stripped_line = raw_line.strip()

        # Ignore empty lines
        if stripped_line == '':
            continue
        indent = len(raw_line) - len(stripped_line)

        blanks = re.findall(r'___\d+___', stripped_line)
        if len(blanks) > 0:
            # Grab a list of (local name, var_obj) pairs in the order
            # they appear and transform it into two ordered lists of local
            # names and variable objects
            local_names, variable_objects = zip(*[mappings[blank] for blank in blanks])
        else:
            local_names = ()
            variable_objects = ()

        # The template is the raw line with numbered blanks replaced with
        # generic blanks
        template = re.sub(r'___\d+___', '___', stripped_line)

        # line_values is a list of dictionaries, one per blank
        # Each dictionary maps from a testcase to a sequence of values
        line_values = []
        for lname in local_names:
            values = {}
            for (testcase, trace) in sol.testcase_to_trace.iteritems():
                values[testcase] = extract_var_values_at_line(line_no, lname, trace)
            line_values.append(values)
        
        # Create the line object, add it to the solution
        line_object = Line(template, variable_objects, line_values)
        this_line_in_solution = (line_object, local_names, indent)
        
        sol.lines.append(this_line_in_solution)
        sol.canonical_lines.append(line_object)

        # Record the template-index pairs that variables occur in
        for var_obj in set(variable_objects):
            # Find the positions in the template that each variable appears
            indices = tuple(i for (i, v) in enumerate(variable_objects) if v==var_obj)
            # Add the (template, indices) pair to that variable's set
            var_obj.templates_with_indices.add((template, indices))

        add_to_setlist(line_object, all_lines)

def compute_all_lines(all_solutions, folderOfData, all_lines):
    skipped = []
    for sol in all_solutions:
        tidy_path = path.join(folderOfData, 'tidyData', sol.solnum + '.py')
        try:
            print "Computing lines for", sol.solnum
            compute_lines(sol, tidy_path, all_lines)
        except RenamerException:
            skipped.append(sol.solnum)

    return skipped


###############################################################################
## Rewrite solutions
## THIS SECTION IS NO LONGER USED. Keeping it in just in case.
###############################################################################
def fix_name_clashes(sol):
    """
    Fix the problem with multiple copies of a single AbstractVariable within
    a single solution.

    sol: instance of Solution
    """

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

def rewrite_source(sol, tidy_path, canon_path):
    """
    Rename local variables within a single solution to their canon equivalents,
    or a modified version if there is a clash. Also stores the canonical python
    code in the Solution.

    sol: instance of Solution
    tidy_path: string, path to directory containing tidied source for sol
    canon_path: string, path to directory to write the canonicalized source to
    raises RenamerException if a problem occurs when renaming

    mutates sol
    """

    with open(tidy_path, 'U') as f:
        renamed_src = f.read()

    extra_token = '_temp'
    # Two passes to avoid conflicts between new names and old names
    # TODO: can this be abstracted? It's bothering me :(
    # First pass: local to <canon>_temp
    for lvar in sol.local_vars:
        if lvar.rename_to:
            shared_name = lvar.rename_to
        else:
            shared_name = lvar.abstract_var.canon_name

        try:
            renamed_src = identifier_renamer.rename_identifier(
                renamed_src, lvar.local_name, shared_name + extra_token)
        except:
            # Who knows what kind of exception this raises? Raise our own
            raise RenamerException('Failed to rename ' + str(sol.solnum))

    # Second pass: <canon>_temp to <canon>
    for lvar in sol.local_vars:
        if lvar.rename_to:
            shared_name = lvar.rename_to
        else:
            shared_name = lvar.abstract_var.canon_name

        try:
            renamed_src = identifier_renamer.rename_identifier(
                renamed_src, shared_name + extra_token, shared_name)
        except:
            # Who knows what kind of exception this raises? Raise our own
            raise RenamerException('Failed to rename ' + str(sol.solnum))

    with open(canon_path, 'w') as f:
        f.write(renamed_src)

def rewrite_all_solutions(all_solutions, folderOfData):
    """
    Rename variables across all solutions, write out the canonicalized code,
    and keep track of phrases.

    all_solutions: list of Solution instances
    folderOfData: base directory containing data and output folders
    returns: list, solution numbers skipped

    mutates elements of all_solutions
    """
    skipped = []

    canon_folder = path.join(folderOfData, 'tidyDataCanonicalized')
    ensure_folder_exists(canon_folder)
    for sol in all_solutions:
        fix_name_clashes(sol)

        tidy_path = path.join(folderOfData, 'tidyData', sol.solnum + '.py')
        canon_path = path.join(canon_folder, sol.solnum + '.py')
        try:
            print "Rewriting", sol.solnum
            rewrite_source(sol, tidy_path, canon_path)
        except RenamerException:
            skipped.append(sol.solnum)

    return skipped


###############################################################################
## Create stacks
###############################################################################
def stack_solutions(all_solutions, all_stacks):
    """
    Collect solutions into stacks.

    all_solutions: list of Solution instances
    all_stacks: list of existing Stacks

    mutates all_stacks
    """
    for sol in all_solutions:
        print "Stacking", sol.solnum
        for stack in all_stacks:
            if stack.should_contain(sol):
                stack.add_solution(sol)
                break
        else:
            new_stack = Stack()
            new_stack.add_solution(sol)
            all_stacks.append(new_stack)

def fake_stacks(solutions):
    stacks = []
    for sol in solutions:
        stack = Stack()
        stack.add_solution(sol)
        stacks.append(stack)
    return stacks

def find_closest_stacks(all_stacks, correct_stacks):
    stacks_needing_correct = []
    for stack in all_stacks:
        rep = stack.representative
        best_metric = 0
        closest_stacks = []
        # An incorrect stack's closest_stacks should always include a correct
        # stack, even if it's not as close as other incorrect stacks.
        needs_correct = not rep.correct
        for other_stack in all_stacks:
            if stack == other_stack:
                continue
            other_rep = other_stack.representative
            metric = rep.difference_metric(other_rep)
            if metric == best_metric:
                closest_stacks.append(other_stack)
                if (not rep.correct) and other_rep.correct:
                    # Found a correct stack that's closest to this incorrect
                    # stack
                    needs_correct = False
            elif metric > best_metric:
                best_metric = metric
                closest_stacks = [other_stack]
                # Resetting list of closest stacks. If this stack is incorrect,
                # we need to find a correct stack if the closest one we just
                # added is also incorrect
                needs_correct = (not rep.correct) and (not other_rep.correct)
        stack.closest_stacks = closest_stacks
        if needs_correct:
            stacks_needing_correct.append(stack)

    # Find a closest correct solution for stacks that need it
    for wrong_stack in stacks_needing_correct:
        rep = wrong_stack.representative
        best_metric = 0
        closest_stacks = []
        for right_stack in correct_stacks:
            metric = rep.difference_metric(right_stack.representative)
            if metric == best_metric:
                closest_stacks.append(right_stack)
            elif metric > best_metric:
                best_metric = metric
                closest_stacks = [right_stack]
        wrong_stack.closest_stacks.extend(closest_stacks)


###############################################################################
## do things with templates
###############################################################################
def break_ties(var_to_match, best_avars):
    return best_avars[0]

def find_matching_var(var_to_match, correct_abstracts, scores, threshold):
    """Actually apply our heuristic to determine which AbstractVariable,
    if any, should be associated with the given incorrect variable.

    var_to_match: VariableInstance, the variable to find an association for
    correct_abstracts: list of correct AbstractVariables
    scores: dictionary mapping template-index pairs to information values
    threshold: the amount of information a match requires to be considered

    (scores and threshold are both found from find_template_info_scores.)

    mutates var_to_match if an associated AbstractVariable is found.

    returns (match type, info content) where match type is one of 'no_match',
        'templates_differ', 'templates_match_perfectly', 'values_match'
    """
    best_avars = []
    best_info_content = 0
    for avar in correct_abstracts:
        # See if var_to_match has exactly the same values as a correct
        # AbstractVariable
        if avar.should_contain(var_to_match):
            avar.add_instance(var_to_match)
            return ('values_match', None)

        # set of template-index pairs var_to_match appears in that the
        # AbstractVariable under consideration does not
        diff = var_to_match.templates_with_indices - avar.templates_with_indices
        # set of template-index pairs shared between var_to_match and the
        # AbstractVariable under consideration
        shared = var_to_match.templates_with_indices & avar.templates_with_indices

        # Since every template in correct abstract variables is in scores
        # and we are only looking up the score of templates that are shared
        # with correct abstract variables, we will never get key errors
        match_info_content = sum(scores[t] for t in shared)

        if match_info_content > threshold:
            if len(diff) == 0:
                # All templates in var_to_match are shared by the AbstractVariable
                var_to_match.maps_to = avar
                return ('templates_match_perfectly', match_info_content)
            elif match_info_content >= best_info_content:
                # This is (one of) the best match(es) we've seen
                best_info_content = match_info_content
                best_avars.append(avar)

    if best_avars:
        # multiple AbstractVariables are tied for best match based on the
        # information content. Pick the "best" one (at the moment, it's
        # just arbitrary - the first one is picked). Using string edit
        # distance here instead was discussed.
        var_to_match.maps_to = break_ties(var_to_match, best_avars)
        return ('templates_differ', best_info_content)
    else:
        return ('no_match', None)

def render_template_indices((template, indices), fill_in):
    """Helper function that takes a template and a set of indices, and
    returns the template with the specified blanks filled in with the given
    string.

    examples:
    render_template_indices(("for ___ in ___:", (0,)), "i")
    >>> "for i in ___:"

    render_template_indices(("___=___[___]*___[___]", (2, 4)), "index")
    >>> "___=___[index]*___[index]"

    """
    buildme = []
    last_end = 0
    for i, match in enumerate(re.finditer('___', template)):
        buildme.append(template[last_end:match.start()])
        if i in indices:
            buildme.append(fill_in)
        else:
            buildme.append('___')
        last_end = match.end()
    buildme.append(template[last_end:])
    return ''.join(buildme)

def find_all_matching_vars(incorrect_solutions, correct_abstracts, incorrect_variables):
    """Associate a correct AbstractVariable with every local variable in an
    incorrect solution, if there is an unambiguous match that is close enough.
    This association determines what name to use when rendering the incorrect
    variable.

    incorrect_solutions: list of Solutions
    correct_abstracts: list of AbstractVariables from correct solutions
    incorrect_variables: list to populate with VariableInstances that don't
        belong to any AbstractVariable. Can be empty.

    The returned list is dumped into a json file and isonly used for debugging,
    but is described below anyway.

    returns a list of dictionaries, one per incorrect variable, of the
    following form:
    {
        solution: solnum
        original: list of templates in which the incorrect variable appears in
            the original incorrect solution, with the appropriate blanks filled
            in with the local name
        match_type: one of 'values_match', 'templates_match_perfectly',
            'templates_differ', or 'no_match'
        maps_to: list of templates of the abstract variable with which the
            incorrect variable is associated, with the appropriate blanks
            filled in. If there is no match, this field is absent.
        values_of_match: dictionary mapping testcases to value sequences of
            the associated abstract variable. If there is no match, this field
            is absent.
        info_content: information content of the match if it is based on
            templates (templates_match_perfectly or templates_differ). Absent
            otherwise.
    }
    """

    # Find the information given by the presence of any given template
    scores, threshold = find_template_info_scores(correct_abstracts)
    output = []
    for sol in incorrect_solutions:
        for lvar in sol.local_vars:
            # Find the actual match
            (match_type, info_content) = find_matching_var(
                lvar, correct_abstracts, scores, threshold)
            if match_type != 'values_match':
                incorrect_variables.append(lvar)

            ### Everything below here is only used to generate the output.
            result = {
                'solution': sol.solnum,
                'original': [render_template_indices(t, lvar.local_name) for t in lvar.templates_with_indices],
                'match_type': match_type
            }
            if match_type == 'values_match':
                avar = lvar.abstract_var
            elif match_type == 'no_match':
                output.append(result)
                continue
            else:
                avar = lvar.maps_to
                result['info_content'] = info_content
            result['maps_to'] = [render_template_indices(t, avar.canon_name) for t in avar.templates_with_indices],
            result['values_of_match'] = avar.sequence

            output.append(result)
    return output


###############################################################################
## Populate solutions, phrases, variables
###############################################################################
def format_stack_output(all_stacks, all_abstracts, ordered_phrases, phrase_to_lines, all_lines):
    stacks_json_format = []
    for (i, stack) in enumerate(all_stacks, start=1):
        rep = stack.representative
        stack_json = {
            'id': i,
            'number': rep.solnum,
            'correct': rep.correct,
            'members': stack.members,
            'count': stack.count,
            'phraseIDs': set(),
            'variableIDs': set(),
            'lines': []
        }
        # if not rep.correct:
        stack_json['closest_stacks'] = [all_stacks.index(s) + 1 for s in stack.closest_stacks]
        stack_json['count_closest_stacks'] = len(stack_json['closest_stacks']);

        for (line_object, local_names, indent) in rep.lines:
            phrase = line_object.render()
            line_obj_id = all_lines.index(line_object)
            if phrase not in phrase_to_lines:
                phrase_to_lines[phrase] = set()
                ordered_phrases.append(phrase)
            phrase_to_lines[phrase].add(line_obj_id)
            phraseID = ordered_phrases.index(phrase) + 1
            stack_json['phraseIDs'].add(phraseID)
            stack_json['lines'].append({
                'indent': indent,
                'phraseID': phraseID
            })

        if rep.correct:
            for avar in rep.abstract_vars:
                # if not var.canon_name.endswith('__'):
                varID = all_abstracts.index(avar) + 1
                stack_json['variableIDs'].add(varID)
        else:
            for lvar in rep.local_vars:
                var = lvar.abstract_var if lvar.abstract_var else lvar
                # if not var.canon_name.endswith('__'):
                varID = all_abstracts.index(var) + 1
                stack_json['variableIDs'].add(varID)

        stack_json['phraseIDs'] = list(stack_json['phraseIDs'])
        stack_json['variableIDs'] = list(stack_json['variableIDs'])
        stacks_json_format.append(stack_json)
    return stacks_json_format

def format_variable_output(all_abstracts):
    variables_json_format = []
    for (i, var) in enumerate(all_abstracts):
        variables_json_format.append({
            'id': i + 1,
            'varName': get_name(var),
            'sequence': var.sequence
        })
    return variables_json_format

def format_line_output(all_lines):
    expanded_output = []
    for (i, line) in enumerate(all_lines):
        expanded_output.append({
            'id': i + 1,
            'expanded_representation': str(line)
        })
    return expanded_output

def format_phrase_output(ordered_phrases, phrase_to_lines):
    phrases_json_format = []
    for (i, phrase) in enumerate(ordered_phrases):
        phrases_json_format.append({
            'code': phrase,
            'corresponding_lines': list(phrase_to_lines[phrase]),
            'id': i + 1
        })
    return phrases_json_format


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
        if isinstance(obj, types.TypeType):
            return {'type': 'type', 'value':str(obj)}
        if isinstance(obj, types.BuiltinFunctionType):
            return {'type': 'built-in', 'value':str(obj)}
        return json.JSONEncoder.default(self, obj)


###############################################################################
## Run the pipeline!
###############################################################################
def run(folderOfData, destFolder):
    ensure_folder_exists(destFolder)
    def dumpOutput(data, filename, sort_keys=True, indent=4):
        filepath = path.join(destFolder, filename)
        with open(filepath, 'w') as f:
            json.dump(data, f, sort_keys=sort_keys, indent=indent, cls=ElenaEncoder)

    # Load solutions
    all_solutions = []
    populate_from_pickles(all_solutions, path.join(folderOfData, 'pickleFiles'))

    # Extract output and variable sequences from the processed traces, and assign
    # correct variables to AbstractVariables
    correct_abstracts = []
    correct_solutions, incorrect_solutions = [], []
    skipped_extraction = extract_output_and_seqs(
        all_solutions, correct_solutions, incorrect_solutions, correct_abstracts)

    # Assign names to the correct AbstractVariables
    find_canon_names(correct_abstracts)

    # Collect lines
    all_lines = []
    skipped_by_renamer = compute_all_lines(all_solutions, folderOfData, all_lines)

    # Stack correct solutions
    correct_stacks = []
    stack_solutions(correct_solutions, correct_stacks)

    # Determine how to name variables in incorrect solutions by matching them
    # to variables in correct solutions
    incorrect_variables = []
    var_mappings = find_all_matching_vars(
        incorrect_solutions, correct_abstracts, incorrect_variables)
    dumpOutput(var_mappings, 'var_mappings.json')

    # Turn every incorrect solution into a singleton stack
    incorrect_fake_stacks = fake_stacks(incorrect_solutions)
    all_stacks = correct_stacks + incorrect_fake_stacks
    all_variables = correct_abstracts + incorrect_variables

    # For every stack, find the other stacks that are closest
    find_closest_stacks(all_stacks, correct_stacks)

    # Generate the output for json files
    ordered_phrases = []
    phrase_to_lines = {}
    solutions = format_stack_output(
        all_stacks, all_variables, ordered_phrases, phrase_to_lines, all_lines)
    variables = format_variable_output(all_variables)
    expanded_lines = format_line_output(all_lines)
    formatted_phrases = format_phrase_output(ordered_phrases, phrase_to_lines)

    dumpOutput(expanded_lines, 'lines.json')
    dumpOutput(solutions, 'solutions.json')
    dumpOutput(formatted_phrases, 'phrases.json')

    try:
        dumpOutput(variables, 'variables.json')
    except ValueError:
        # Circular reference. Try pretty printing instead. This might break
        # things in the UI (though currently variables are not used so it's
        # safe, for now)
        with open(path.join(destFolder, 'variables.json'), 'w') as f:
            pprint.pprint(variables, f)

    print "Number of solutions processed:", len(correct_solutions + incorrect_solutions)
    print "Number of incorrect solutions:", len(incorrect_solutions)
    print "Number of correct stacks:", len(correct_stacks)
    print "Number of phrases:", len(formatted_phrases)
    print "Number of variables:", len(variables)
    # print "skipped when extracting:", skipped_extraction
    # print "skipped when rewriting:", skipped_rewrite
