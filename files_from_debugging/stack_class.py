###############################################################################
## Stack Class
###############################################################################
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
        lines_match = set(self.representative.lines) == set(sol.lines)
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