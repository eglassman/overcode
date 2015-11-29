import cgi
from collections import Counter
import json
import os
from os import path
import pickle
import pprint
import re

from external import identifier_renamer
from pipeline_util import ensure_folder_exists


###############################################################################
## Classes
###############################################################################
class Solution(object):
    """Information about a single solution."""

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

class Line(object):
    """A line of code with blanks for variables."""

    @staticmethod
    def split_template_into_lines(src, mappings):
        line_objects = []
        raw_lines = src.split('\n')

        for raw_line in raw_lines:
            stripped_line = raw_line.strip()
            if stripped_line == '':
                continue
            indent = len(raw_line) - len(stripped_line)

            blanks = re.findall(r'___\d___', stripped_line)
            variables, names = zip(*[mappings[blank] for blank in blanks])

            template = re.sub(r'___\d___', '___', stripped_line)
            line_objects.append(Line(template, variables, names, indent))
        return line_objects

    def __init__(self, template, variables, names, indent):
        self.template = template
        self.variables = variables
        self.names = names
        self.indent = indent

    def render(self):
        # Replace all the blanks with '{}' so we can use built-in string formatting
        # to fill in the blanks with the list of ordered names
        return self.template.replace('___', '{}').format(*self.names)

    def __str__(self):
        # DEBUGGING STR METHOD ONLY
        return self.template + " ||| " + str(self.names) + "\n"
    __repr__ = __str__

class VariableInstance(object):
    """A single variable within a solution."""

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
        same_output = self.representative.output == sol.output
        lines_match = set(self.representative.canonicalPYcode) == set(sol.canonicalPYcode)
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
def populate_from_pickles(all_solutions, pickleSrc, formattedSrc=None, formattedExtn='.py.html'):
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
        if abstract.is_unique:
            uniques.append(abstract)
            continue
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

    # Unique variables just get double underscores if they clash
    for unique in uniques:
        name = unique.most_common_name()
        if name in name_dict:
            unique.canon_name = name + '__'
        else:
            unique.canon_name = name


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

def extract_sequences_single_sol(sol, all_abstracts):
    """
    For each local variable in a single solution, extract its sequence of
    values, create a VariableInstance, and assign that VariableInstance to
    an AbstractVariable.

    sol: instance of Solution
    all_abstracts: list of AbstractVariable instances. Can be empty.
    raises ExtractionException if there is no __return__ value in the
           solution trace

    mutates sol and all_abstracts
    """

    if '__return__' not in sol.trace:
        raise ExtractionException('Solution did not run to completion')

    # The second-to-last step seems to always have the return value.
    # Steps in the trace are of the form (step, value), so take just
    # the value
    sol.output = sol.trace['__return__'][-2][1]

    for localVarName, localVarData in sol.trace.iteritems():
        if localVarName.startswith('__'):
            continue
        sequence = extract_single_sequence(localVarData)
        if (len(sequence) == 1 and
            type(sequence[0]) is str and
            sequence[0].startswith('__')):
            # Just a function definition
            continue

        # Create a new VariableInstance, add it to the solution's local vars,
        # assign it to an abstract variable, and add that to the solution's
        # abstract vars.
        var = VariableInstance(sequence, sol.solnum, localVarName)
        sol.local_vars.append(var)
        add_to_abstracts(var, all_abstracts)
        sol.abstract_vars.append(var.abstract_var)

def extract_and_collect_var_seqs(all_solutions, all_abstracts):
    """
    Extract and collect variable information from all solutions.

    all_solutions: list of Solution instances
    all_abstracts: list of existing AbstractVariable instances
    returns: list, solution numbers skipped

    mutates all_abstracts and elements of all_solutions
    """
    skipped = []
    for sol in all_solutions[:]:
        try:
            print "Collecting variables in", sol.solnum
            extract_sequences_single_sol(sol, all_abstracts)
        except ExtractionException:
            # Since we are iterating through a copy, this will not cause problems
            all_solutions.remove(sol)
            skipped.append(sol.solnum)

    return skipped

###############################################################################
## Rewrite solutions
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

def make_lines(sol, tidy_path, canon_path, phrase_counter, tab_counters):
    with open(tidy_path, 'U') as f:
        renamed_src = f.read()

    mappings = {}
    ctr = 0
    for lvar in sol.local_vars:
        placeholder = '___' + str(ctr) + '___'
        try:
            renamed_src = identifier_renamer.rename_identifier(
                renamed_src, lvar.local_name, placeholder)
        except:
            raise RenamerException('Failed to rename ' + str(sol.solnum))

        ctr += 1

        if lvar.rename_to:
            shared_name = lvar.rename_to
        else:
            shared_name = lvar.abstract_var.canon_name
        mappings[placeholder] = (lvar.abstract_var, shared_name)

    lines = Line.split_template_into_lines(renamed_src, mappings)
    print [l.render() for l in lines]

def rewrite_source(sol, tidy_path, canon_path, phrase_counter, tab_counters):
    """
    Rename local variables within a single solution to their canon equivalents,
    or a modified version if there is a clash. Also stores the canonical python
    code in the Solution.

    sol: instance of Solution
    tidy_path: string, path to directory containing tidied source for sol
    canon_path: string, path to directory to write the canonicalized source to
    phrase_counter: Counter for canonical lines of code
    tab_counters: dict of Counters for indentation
    raises RenamerException if a problem occurs when renaming

    mutates sol, phrase_counter, and tab_counters
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

    # Store canonical code in the Solution
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
    """
    Rename variables across all solutions, write out the canonicalized code,
    and keep track of phrases.

    all_solutions: list of Solution instances
    phrase_counter: Counter for canonical lines of code
    tab_counters: dict of Counters for indentation
    folderOfData: base directory containing data and output folders
    returns: list, solution numbers skipped

    mutates phrase_counter and tab_counters, and elements of all_solutions
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
            # rewrite_source(sol, tidy_path, canon_path, phrase_counter, tab_counters)
            make_lines(sol, tidy_path, canon_path, phrase_counter, tab_counters)
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
    """
    Make dictionaries in the expected output format by collecting
    info from the Stacks.

    all_stacks: list of Stack instances
    solutions, phrases, variables: lists to add results to

    mutates solutions, phrases, and variables
    """

    for stack in all_stacks:
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
        solution['number'] = rep.solnum
        solution['output'] = rep.output
        solution['members'] = stack.members
        solution['count'] = stack.count
        solution['phraseIDs'] = list(solution['phraseIDs'])
        solution['variableIDs'] = list(solution['variableIDs'])
        solutions.append(solution)

def reformat_phrases(phrases, tab_counters):
    """
    Put the phrases list into the expected output format.
    """

    # TODO: feature spans?
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
    """
    Put the variables list into the expected output format.
    """

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

    # Collect variables into AbstractVariables
    all_abstracts = []
    skipped_extract_sequences = extract_and_collect_var_seqs(
        all_solutions, all_abstracts)
    find_canon_names(all_abstracts)

    # Canonicalize source and collect phrases
    phrase_counter = Counter()
    tab_counters = {}
    skipped_rewrite = rewrite_all_solutions(
        all_solutions, phrase_counter, tab_counters, folderOfData)

    # Stack solutions
    all_stacks = []
    stack_solutions(all_solutions, all_stacks)

    # Get output
    solutions = []
    phrases = []
    variables = []
    create_output(all_stacks, solutions, phrases, variables)
    reformat_phrases(phrases, tab_counters)
    reformat_variables(variables)

    dumpOutput(solutions, 'solutions.json')
    dumpOutput(phrases, 'phrases.json')
    dumpOutput(variables, 'variables.json')

    print "skipped when extracting:", skipped_extract_sequences
    print "skipped when rewriting:", skipped_rewrite
