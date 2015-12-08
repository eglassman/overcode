###############################################################################
## Solution Class
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
        self.lines = []
        #self.canonicalPYcode = []
        #self.canonicalPYcodeIndents = []

    def canonical(self):
        """
        Print canonicalized solution

        Fix the problem with multiple copies of a single AbstractVariable within
        a single solution.

        """
        #if there aren't multiple copies of a single abstract variable
        if len(sol.abstract_vars) == len(set(sol.abstract_vars)): 
            for line in self.lines:
                print line.indent + line.render_canonical() #print normally

        assert len(sol.abstract_vars) > len(set(sol.abstract_vars))
        print 'Fixing clash in', sol.solnum

        # Multiple instances of a single abstract variable
        copy_of_lines = []
        for var in sol.abstract_vars:
            indices = [i for i, v in enumerate(sol.abstract_vars) if v == var]
            if len(indices) == 1:
                continue
            for ind in indices:
                abs_var = sol.abstract_vars[ind]
                local_var = sol.local_vars[ind]

                for line in self.lines:
                    copy_of_lines.append(line_modified)

        #         if not abs_var.canon_name == local_var.local_name:
        #             # If canon and local names are both i, don't rename to i_i__
        #             new_name = abs_var.canon_name + '_' + local_var.local_name + '__'
        #             local_var.rename_to = new_name

    def getDict(self):
        return self.__dict__

    def __str__(self):
        #abbreviated print out:
        #return "Solution(" + str(self.solnum) + ")" #+ " with local_vars: " + self.local_vars + " and abstract_vars"

        #long print out
        # output = 'solnum: ' + self.solnum + '/n'
        # output += 'trace: ' + self.

        #debugging print out
        return str(self.__dict__)
    __repr__ = __str__