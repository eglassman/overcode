# A fake gradelib used for making testCase.py files for OverCode, based on the
# MITx gradelib.

import random

rand = random.Random(1)

def my_str(thing):
    """Stringify non-strings and add extra quotes to strings."""
    if isinstance(thing, str):
        return "'" + thing + "'"
    return str(thing)

# stubs for functions in the real gradelib to prevent NameErrors
def required_substring(string, error_msg=None):
    pass
def prohibited_substring(string, error_msg=None):
    pass
def required_keyword(string, error_msg=None):
    pass
def prohibited_keyword(string, error_msg=None):
    pass
def input_check_or(error_msg, *args):
    pass
def one_of_required_keywords(strings, error_msg=None):
    pass
def substring_occurs(string, at_least=None, at_most=None, exactly=None, error_msg=None, ignore_spacing=False):
    pass
def substring_occurs_if_condstring(string, condstring, at_least=None, at_most=None, exactly=None, error_msg=None):
    pass
def token_occurs(string, at_least=None, at_most=None, exactly=None, error_msg=None):
    pass
def count_non_comment_lines(at_least=None, at_most=None, exactly=None, error_msg=None):
    pass
def must_define_function(fn_name, error_msg=None):
    pass
def prohibited_function_definition(fn_name, error_msg=None):
    pass
prohibited_operator = prohibited_keyword
required_operator = required_keyword

# Fake student function invocation - is actually a class in the real gradelib
def InvokeStudentFunctionTest(fn_name, args, environment=None, output_writer=None, short_desc=None, detailed_desc=None,compare=None):
    return { 'args': args, 'fn_name': fn_name }

def invoke_student_function(fn_name, args, environment=None, output_writer=None):
    print "here"
    return { 'args': args, 'fn_name': fn_name }

def Test(test_fn, short_description, detailed_description='', compare=None):
    print "calling test"
    return test_fn

# Fake grader
class Grader(object):
    def __init__(self):
        self.fn_name = None
        self.args = []

    def add_input_check(self, check):
        pass

    def add_test(self, test):
        if self.fn_name is None:
            self.fn_name = test['fn_name']
        elif self.fn_name != test['fn_name']:
            raise ValueError('Can only make a testcase for one function at a time')

        self.args.append(test['args'])

    def write_out(self, output_path):
        """Write all previously added testcases to the file specified by
        output_path in a format that can be run directly."""

        testcases = []
        for arg_set in self.args:
            arg_string = ", ".join(my_str(arg) for arg in arg_set)
            testcases.append(self.fn_name + "(" + arg_string + ")")

        with open(output_path, 'w') as f:
            f.write("\n".join(testcases) + "\n")
