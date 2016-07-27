###############################################################################
## Variable sequence extraction
###############################################################################

from variable_instance_class import VariableInstance
from abstract_variable_class import AbstractVariable

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