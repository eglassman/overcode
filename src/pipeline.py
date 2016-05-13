import cgi
from collections import Counter
import imp
import json
from math import log
import os
from os import path
import pickle
import pprint
import re
import string
import types
import numpy
from gensim import corpora, models, similarities

from external import identifier_renamer
from pipeline_util import ensure_folder_exists, make_hashable

import logging
logging.basicConfig(format='%(asctime)s : %(levelname)s : %(message)s', level=logging.INFO)

###############################################################################
## NOTES
###############################################################################
# The function that does all the work is "run", at the bottom of the file. This
# file shouldn't be run directly: use run_pipeline.py instead, which provides a
# nice command-line interface.
#
# Comments explaining the flow of execution can be found below. Start with the
# "run" function!
###############################################################################


# The MITx grader object. Set with set_grader near the bottom of the file.
GRADER = None
use_original_line_equality_metric = False

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
    if var_obj.clash_resolution_name:
        return var_obj.clash_resolution_name
    if var_obj.abstract_var:
        return var_obj.abstract_var.canon_name
    if var_obj.maps_to:
        return var_obj.maps_to.canon_name
    return var_obj.local_name

def compare_output(ordered_tests, tests_to_actual, tests_to_expected):
    error_vector = []
    if GRADER:
        for (i, test) in enumerate(GRADER.tests()):
            actual = tests_to_actual[ordered_tests[i]]
            expected = tests_to_expected[ordered_tests[i]]
            error_vector.append(test.compare_results(expected, actual))
    else:
        for test in ordered_tests:
            actual = tests_to_actual[test]
            expected = tests_to_expected[test]
            error_vector.append(actual == expected)

    return error_vector

###############################################################################
## Classes
###############################################################################
class Solution(object):
    """Information about a single solution."""

    def __init__(self, solnum, ordered_testcases, testcase_to_trace, testcase_to_output, correct_output):
        self.solnum = solnum
        # list of testcase strings
        self.testcases = ordered_testcases
        # a dictionary mapping a testcase string to a trace
        self.testcase_to_trace = testcase_to_trace
        # a dictionary mapping a testcase string to stdout results for that test
        self.output = testcase_to_output

        self.local_vars = []
        self.abstract_vars = []
        # a list of (line object, local names, indent) tuples
        self.lines = []
        # a list of line objects
        self.canonical_lines = []

        # list of booleans, one per test, where True indicates a passed test
        # and False represents a failed test.
        self.error_vector = compare_output(ordered_testcases, testcase_to_output, correct_output)
        self.correct = all(self.error_vector)

    def getDict(self):
        return self.__dict__

    def difference_metric(self, other):
        """A number representing how similar this solution is with another.
        Higher numbers => more similar. Currently, the number of rendered
        phrases shared between the two solutions, plus the number of variable
        names shared."""
        try:
            rendered_self = set(l.render() for l in self.canonical_lines)
            rendered_other = set(l.render() for l in other.canonical_lines)
            # my_line_total = len(self.canonical_lines)
            shared_lines = rendered_self & rendered_other
            num_lines_total = len(rendered_self) + len(rendered_other)
            shared_lines_percent = float(len(shared_lines)) / num_lines_total

            names_self = set(get_name(v) for v in self.local_vars)
            names_other = set(get_name(v) for v in other.local_vars)
            shared_names = names_self & names_other
            num_names_total = len(names_self) + len(names_other)
            shared_names_percent = float(len(shared_names)) / num_names_total
            return shared_lines_percent + shared_names_percent
        except ZeroDivisionError:
            return 0.0


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
        self.clash_resolution_name = None

        self.maps_to = None

        # A set of tuples of the form (template, tuple of indices). Templates
        # are strings representing lines of code with variables replaced with
        # blanks, as in Line objects. The tuple of indices indicate which
        # blanks in the template are occupied by this variable. The set as a
        # whole represents all lines of code in which this variable appears.
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

        # (This field is the same as in VariableInstances)
        # A set of tuples of the form (template, tuple of indices). Templates
        # are strings representing lines of code with variables replaced with
        # blanks, as in Line objects. The tuple of indices indicate which
        # blanks in the template are occupied by this variable. The set as a
        # whole represents all lines of code in which this variable appears.
        self.templates_with_indices = set()

    def should_contain(self, inst):
        """
        Whether a particular VariableInstance is an example of this abstract
        variable.

        inst: an instance of VariableInstance
        returns: boolean, True if inst should be added to self, False otherewise.
        """
        assert isinstance(inst, VariableInstance)
        try:
            return self.sequence == inst.sequence
        except AttributeError:
            return False

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

    def __init__(self, template, variable_objects, line_values):
        # A string representing a line of code with all variables replaced
        # with blanks
        self.template = template

        # An ordered list of variables that fill in the blanks. May be either
        # AbstractVariables or VariableInstances.
        self.variable_objects = variable_objects

        # A list of dictionaries representing the values each blank takes on.
        # Each dict maps testcase strings to lists of values.
        self.line_values = line_values

    def __hash__(self):
        if use_original_line_equality_metric:
            return hash((make_hashable(self.variable_objects),self.template))
        return hash((make_hashable(self.line_values),self.template))

    def __eq__(self, other):
        """
        Old definition: Two Lines are equal if they have the same template and
        abstract variables.
        New definition: two Lines are equal if they have the
        same template and line values.
        """
        assert isinstance(other, Line)
        if use_original_line_equality_metric:
            return self.variable_objects == other.variable_objects and self.template == other.template
        return self.line_values == other.line_values and self.template == other.template

    def getDict(self):
        return self.__dict__

    def render(self):
        """
        Get the string representation of this line with all the appropriate
        names filled in.
        """
        # The variable names to fill in
        names = [get_name(var) for var in self.variable_objects]

        # Temporarily replace curly braces so that built-in string formatting
        # can be used. Then replace all the blanks with '{}' and fill in the
        # names with said string formatting. Finally put the original curly
        # braces back in.
        try:
            step1 = self.template.replace('{', '_left_brace_')
            step2 = step1.replace('}', '_right_brace_')
            step3 = step2.replace('___', '{}').format(*names)
            step4 = step3.replace('_left_brace_', '{');
            return step4.replace('_right_brace_', '}')
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

    # Get the correct answer from answer.py
    answer_path = path.join(pickleSrc, 'answer.pickle')
    if path.isfile(answer_path):
        with open(answer_path, 'r') as f:
            unpickled = pickle.load(f)

        testcases, correct_outputs = unpickled['testcases'], unpickled['outputs']
        testcase_to_correct_output = {testcases[i]: correct_outputs[i] for i in range(len(testcases))}
        print "ANSWER:", testcase_to_correct_output

    # Now load the rest of the solutions
    for filename in os.listdir(pickleSrc):
        solnum = filename.split('.')[0]
        if solnum == "answer":
            continue

        with open(path.join(pickleSrc, filename), 'r') as f:
            unpickled = pickle.load(f)

        testcases = unpickled['testcases']
        ordered_outputs = unpickled['outputs']
        traces = unpickled['traces']

        testcase_to_trace = {testcases[i]: traces[i] for i in range(len(testcases))}
        testcase_to_output = {testcases[i]: ordered_outputs[i] for i in range(len(testcases))}

        # Make the Solution object
        sol = Solution(solnum,
                       testcases,
                       testcase_to_trace,
                       testcase_to_output,
                       testcase_to_correct_output)
        all_solutions.append(sol)

    return testcase_to_correct_output


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
    Assign canon names to all AbstractVariables. Each AbstractVariable
    takes on the name that it is assigned most frequently. If two or more
    AbstractVariables are assigned the SAME name most frequently, the
    AbstractVariable that appears in the most solutions gets the unmodified
    name. Any other AbstractVariables get suffixes appended: three underscores
    and a number, in order of decreasing frequency (i.e., the second most
    common variable gets ___2 appended, the third most common gets ___3, etc.)

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

def extract_sequences_single_sol(sol, correct_abstracts):
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

    # maps the name of a local variable to a sequence. A sequence is a
    # dictionary mapping testcase strings to lists of values.
    sequences = {}
    for (testcase, trace) in sol.testcase_to_trace.iteritems():
        # Extract the sequences for each variable in the trace
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

    # Create VariableInstance objects and associate them with Solutions.
    # For correct solutions, also collect the variables into AbstractVariables
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

def extract_variable_seqs(all_solutions,
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
            extract_sequences_single_sol(sol, correct_abstracts)
            if sol.correct:
                correct_solutions.append(sol)
            else:
                incorrect_solutions.append(sol)
        except ExtractionException:
            # If we couldn't extract the required info, remove this solution from
            # the list so we don't keep trying to process it later. Since we are
            # iterating through a (shallow) copy, this will not cause problems
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
    if sol.correct:
        fix_name_clashes(sol)

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

        if sol.correct and lvar.clash_resolution_name is None:
            var_to_map = lvar.abstract_var
        else:
            var_to_map = lvar
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
        # Each dictionary maps from a testcase to a sequence of values, and
        # represents the values taken on by the variable at that blank
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
## The rewriting parts are no longer used; fix_name_clashes is, however
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
    for var in set(sol.abstract_vars):
        indices = [i for i, v in enumerate(sol.abstract_vars) if v == var]
        if len(indices) == 1:
            continue
        for (modifier, ind) in enumerate(indices):
            abs_var = sol.abstract_vars[ind]
            local_var = sol.local_vars[ind]
            if not abs_var.canon_name == local_var.local_name:
                # If canon and local names are both i, don't rename to i_i__
                # new_name = abs_var.canon_name + '_' + local_var.local_name + '__'
                suffix = string.ascii_uppercase[modifier]
                new_name = abs_var.canon_name + suffix
                local_var.clash_resolution_name = new_name
                print "local var", local_var.local_name, "clash resolution:", new_name

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
        if lvar.clash_resolution_name:
            shared_name = lvar.clash_resolution_name
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
        if lvar.clash_resolution_name:
            shared_name = lvar.clash_resolution_name
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

def find_sort_metrics(incorrect_stacks, correct_stacks):
    for wrong_stack in incorrect_stacks:
        wrong_rep = wrong_stack.representative
        metrics = []
        for right_stack in correct_stacks:
            right_rep = right_stack.representative
            metric = wrong_rep.difference_metric(right_rep)
            metrics.append((right_stack, metric))
        wrong_stack.correct_stack_distances = metrics

def find_sort_metrics_all(all_stacks):
    for stack1 in all_stacks:
        rep1 = stack1.representative

        metrics = []
        for stack2 in all_stacks:
            # if stack2 == stack1:
            #     continue
            rep2 = stack2.representative
            metric = rep1.difference_metric(rep2)
            metrics.append((stack2, metric))

        stack1.stack_distances = metrics


###############################################################################
## do things with templates
###############################################################################
def break_ties(var_to_match, best_avars):
    return best_avars[0]

def find_matching_var(var_to_match, correct_abstracts, scores, threshold):
    """Actually apply our heuristic to determine which AbstractVariable,
    if any, should be associated with the given incorrect variable,
    var_to_match.

    First, check if var_to_match belongs in an existing AbstractVariable,
    i.e., if its sequence of values is the same as some correct variable's.
    If so, add var_to_match to that AbstractVariable.

    Second, check if there is a correct variable with exactly the same set of
    template-index pairs. In other words, are the same operations performed
    on var_to_match as on a correct variable? If so, assign the name of that
    variable to var_to_match.

    Third, go through all the correct variables and find the set of
    template-index pairs they share with var_to_match. For each pair that
    var_to_match shares with a correct variable, find how much information
    the presence of that pair gives us. Pick (one of) the correct variable(s)
    whose set of shared template-index pairs gives us the most information.

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
            return ('values_match', avar, None)

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
                return ('templates_match_perfectly', avar, match_info_content)
            elif match_info_content >= best_info_content:
                # This is (one of) the best match(es) we've seen
                best_info_content = match_info_content
                best_avars.append(avar)

    if best_avars:
        # multiple AbstractVariables are tied for best match based on the
        # information content. Pick the "best" one (at the moment, it's
        # just arbitrary - the first one is picked). Using string edit
        # distance here instead was discussed.
        best = break_ties(var_to_match, best_avars)
        var_to_match.maps_to = best
        return ('templates_differ', best, best_info_content)
    else:
        return ('no_match', None, None)

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
        seen_names = Counter()
        for lvar in sol.local_vars:
            # Find the actual match
            (match_type, matched_var, info_content) = find_matching_var(
                lvar, correct_abstracts, scores, threshold)
            if match_type != 'values_match':
                incorrect_variables.append(lvar)

            if matched_var:
                name = get_name(matched_var)
                if name in seen_names:
                    print "Fixing clash when fuzzy renaming", sol.solnum
                    modifier = seen_names[name]
                    suffix = string.ascii_uppercase[modifier]
                    lvar.clash_resolution_name = name + suffix
                seen_names.update([name])

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
            'num_passed_tests': rep.error_vector.count(True),
            'total_num_tests': len(rep.error_vector),
            'error_vector': rep.error_vector,
            'test_input_outputs': rep.output,
            'testcases': rep.testcases,
            'members': stack.members,
            'count': stack.count,
            'phraseIDs': set(),
            'lineIDs': set(),
            'variableIDs': set(),
            'lines': []
        }
        # if not rep.correct:
        # stack_json['closest_stacks'] = [all_stacks.index(s) + 1 for s in stack.closest_stacks]
        # stack_json['count_closest_stacks'] = len(stack_json['closest_stacks']);
        # if not rep.correct:
        #     id_to_metric = {}
        #     for (right_stack, metric) in stack.correct_stack_distances:
        #         right_id = all_stacks.index(right_stack) + 1
        #         id_to_metric[right_id] = metric
        #     stack_json['correct_stack_distances'] = id_to_metric
        # id_to_metric = {}
        # for (s, metric) in stack.stack_distances:
        #     s_id = all_stacks.index(s) + 1
        #     id_to_metric[s_id] = metric
        # stack_json['stack_distances'] = id_to_metric

        for (line_object, local_names, indent) in rep.lines:
            phrase = line_object.render()
            line_obj_id = all_lines.index(line_object) + 1
            if phrase not in phrase_to_lines:
                phrase_to_lines[phrase] = set()
                ordered_phrases.append(phrase)
            phrase_to_lines[phrase].add(line_obj_id)
            phraseID = ordered_phrases.index(phrase) + 1
            stack_json['phraseIDs'].add(phraseID)
            stack_json['lineIDs'].add(line_obj_id)
            stack_json['lines'].append({
                'indent': indent,
                'phraseID': phraseID,
                'line_obj_ID': line_obj_id
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

    # These are the properties of lines
    # self.template = template
    # self.abstract_variables = abstract_variables
    # # dictionary mapping testcase strings to sequences of values
    # self.line_values = line_values

    expanded_output = []
    for (i, line) in enumerate(all_lines):
        expanded_output.append({
            'id': i + 1,
            'expanded_representation': str(line),
            'template': line.template,
            #'abstract_variables': line.abstract_variables, #TODO: OPENS CAN OF WORMS
            'line_values': line.line_values
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
## Do Topic Modeling
###############################################################################
def create_LDA_results(solutions,variables):

    topic_model = {}

    #create a corpus of variables
    corpus = []
    for i,varIds in enumerate([sol['variableIDs'] for sol in solutions]):
        document = []
        for var_id in varIds:
            try:
                for entry in document:
                    if entry[0]==(var_id-1):
                        #print 'already in document'
                        raise ValueError('There are multiple copies of this \
                            variable in the solution, and we dont handle that yet')
                document.append((var_id-1,1.0))
            except ValueError as err:
                print(err.args)
        corpus.append(document)

    K = 100 #number of topics
    lda = models.ldamodel.LdaModel(corpus,num_topics=K,passes=10,alpha='auto')

    topic_model['top_topics'] = lda.top_topics(corpus, num_words=10)

    sol_topics = []
    for doc in enumerate(corpus):
        topics_for_doc = lda.get_document_topics(doc)
        sol_topics.append(topics_for_doc)
    topic_model['topics_per_sol'] = sol_topics

    topic_model['topic_terms'] = lda.print_topics(num_topics=K, num_words=10)

    return topic_model


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
def set_grader(path):
    """
    Set the GRADER variable from the grader at the given path.
    """
    gm = imp.load_source('graderModule', path)

    global GRADER
    GRADER = gm.grader

def run(folderOfData, destFolder):
    ensure_folder_exists(destFolder)

    # Helper function for dumping output
    def dumpOutput(data, filename, sort_keys=True, indent=4):
        filepath = path.join(destFolder, filename)
        with open(filepath, 'w') as f:
            json.dump(data, f, sort_keys=sort_keys, indent=indent, cls=ElenaEncoder)

    # Load solutions
    # Populates all_solutions with Solution objects, one per student solution.
    # correct_output is a dictionary mapping testcase strings to the output
    # (to stdout) of answer.py. After this point, the following fields of
    # Solution objects are filled in:
    #   solnum (unique ID)
    #   testcases (ordered list of testcases as strings)
    #   testcase_to_trace (dict mapping testcase strings to traces)
    #   output (dict mapping testcase strings to stdout contents)
    #   error_vector (list of booleans representing test case successes/failures)
    #   correct (boolean, True if all test cases passesd)
    all_solutions = []
    correct_output = populate_from_pickles(all_solutions, path.join(folderOfData, 'pickleFiles'))

    # Write out the correct output for reference. This should probably be part
    # of the previous function.
    with open(path.join(destFolder, 'correctOutput.json'), 'w') as f:
        json.dump(correct_output, f, indent=2)


    # The next function call does two things:
    # 1) Extracts the sequences of values for all global/local variables in
    # solutions and initializes VariableInstance objects for each variable.
    # 2) Collects correct variables into AbstractVariables.
    # FUTURE WORK: Maintainability: Break this up into more modular pieces?
    #              This might have consequences for performance since it would
    #              require another loop, but maybe that isn't a big problem.

    # After this point, the following additional fields in Solution objects are
    # filled in:
    #   local_vars (list of VariableInstance that appear in this Solution)
    #   abstract_vars (list of AbstractVariables that appear in this Solution)
    #       NOTE: this list is only non-empty if the solution is correct!

    # Populates correct_abstracts with AbstractVariable objects. After this
    # point, the following fields of AbstractVariable objects are filled in:
    #   sequence (dict mapping test case strings to lists of values)
    #   solutions (dict mapping Solution IDs to this variable's local name)
    #   name_ctr (Counter keeping track of the frequency of names applied to
    #             this variable)

    # There is no list for VariableInstances. To loop over all VariableInstances,
    # loop over the local_vars fields of all Solutions. After this point,
    # VariableInstances objects have the following fields filled in:
    #   solnum (unique ID of the solution in which the variable occurs)
    #   sequence (dict mapping testcase strings to lists of values)
    #   local_name (string, name of this variable in the associated solution)
    # If the associated solution is correct, the abstract_variable field is also
    # filled in, with a reference to the AbstractVariable object this variable
    # belongs to.

    # Populates correct_solutions and incorrect_solutions with all correct and
    # incorrect Solutions respectively (in case that wasn't obvious :) )
    # (This should probably be moved to the previous step. It was originally
    # here because output was handled differently, and the code was not
    # restructured when that changed.)

    # skipped_extraction is a list of the IDs of solutions that encounter
    # errors when trying to extract variable sequences.
    correct_abstracts = []
    correct_solutions, incorrect_solutions = [], []
    skipped_extraction = extract_variable_seqs(
        all_solutions,
        correct_solutions,
        incorrect_solutions,
        correct_abstracts)

    # Assign names to the correct AbstractVariables. See docstring.
    find_canon_names(correct_abstracts)

    # Compute lines. Populates all_lines with Line objects. All the fields of
    # Line objects are filled in - see the __init__ method. Fills in the
    # following additional fields in Solution objects:
    #   lines (list of tuples: (Line object, list of local names that fill
    #          in the blanks in this solution, indent in this solution))
    #   canonical_lines (list of Line objects)
    # Also fills in the templates_with_indices field of all VariableInstances
    # and AbstractVariables. See the __init__ method of either class for
    # details.
    # Finally, this is where we resolve name clashes between multiple instances
    # of the same abstract variable in the same (correct) solution. This is
    # sort of a weird place to do it but it works.
    # As usual, skipped_by_renamer is a list of the IDs of solutions that
    # encounter errors during this process.
    all_lines = []
    skipped_by_renamer = compute_all_lines(all_solutions, folderOfData, all_lines)

    # Stack correct solutions. Populates correct_stacks with Stack objects.
    # Correct Solutions belong in the same stack if they have the same set of
    # Line objects, where Line objects are considered equal if their templates
    # match and the values that appear in each blank match.
    correct_stacks = []
    stack_solutions(correct_solutions, correct_stacks)

    # Determine how to name variables in incorrect solutions by matching them
    # to variables in correct solutions. See docstrings for
    # find_all_matching_vars and find_matching_var. Fills in the maps_to field
    # of local variables in incorrect solutions.
    incorrect_variables = []
    var_mappings = find_all_matching_vars(
        incorrect_solutions, correct_abstracts, incorrect_variables)
    dumpOutput(var_mappings, 'var_mappings.json')

    # Turn every incorrect solution into a singleton stack
    incorrect_fake_stacks = fake_stacks(incorrect_solutions)
    all_stacks = correct_stacks + incorrect_fake_stacks
    all_variables = correct_abstracts + incorrect_variables

    # Find the distance (as defined in Solution.distance_metric) between all
    # pairs of stacks.
    # find_sort_metrics_all(all_stacks)

    # Generate the output for json files. format_stack_output controls the
    # contents of solutions.json; format_phrase_output controls the contents
    # of phrases.json. The other json files are only for debugging and not
    # necessary for the view.
    # FUTURE WORK: Features: To display any information about variables in the
    # view, such as what values they take on, any issues with serialization
    # will have to be resolved.
    ordered_phrases = []
    phrase_to_lines = {}
    solutions = format_stack_output(
        all_stacks, all_variables, ordered_phrases, phrase_to_lines, all_lines)
    variables = format_variable_output(all_variables)
    expanded_lines = format_line_output(all_lines)
    formatted_phrases = format_phrase_output(ordered_phrases, phrase_to_lines)

    topic_model = create_LDA_results(solutions,variables)

    dumpOutput(expanded_lines, 'lines.json')
    dumpOutput(solutions, 'solutions.json')
    dumpOutput(formatted_phrases, 'phrases.json')
    dumpOutput(topic_model, 'topic_model.json')

    try:
        dumpOutput(variables, 'variables.json')
    except (ValueError, TypeError):
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
    print "skipped when extracting:", skipped_extraction
    print "skipped when rewriting:", skipped_by_renamer
