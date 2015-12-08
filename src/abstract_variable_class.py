###############################################################################
## AbstractVariable Class
###############################################################################
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