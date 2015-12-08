###############################################################################
## Line Class
###############################################################################
class Line(object):
    """A line of code, with indent recorded, with blanks for variables, plus information about the variables' local names and abstract identity."""

    #Line(template, local_names, abstract_variables, indent)
    def __init__(self, template, local_names, abstract_variables, indent):
        self.template = template
        self.abstract_variables = abstract_variables
        self.local_names = local_names
        self.indent = indent

    def __eq__(self, other):
        """Two Lines are equal if they have the same template and abstract variables."""
        assert isinstance(other, Line)
        return self.abstract_variables == other.abstract_variables and self.template == other.template

    def render_canonical(self):
        #todo
        pass

    def render(self):
        # Replace all the blanks with '{}' so we can use built-in string formatting
        # to fill in the blanks with the list of ordered names
        return self.template.replace('___', '{}').format(*self.abstract_variables) #todo: print cannon name .canon_name

    def __str__(self):
        # DEBUGGING STR METHOD ONLY
        return self.template + " ||| " + str(self.abstract_variables) + " ||| " + str(self.local_names) + "\n"
    __repr__ = __str__