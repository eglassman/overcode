import contextlib
import inspect
import random
import re
import sys
import tokenize
from StringIO import StringIO

# the run library should overwrite this with a particular random seed for the test.
rand = random.Random(1)


class EndTest(Exception):
    """An exception raised in a test to end the test."""
    def __init__(self, message=None):
        Exception.__init__(self, message)


class Test(object):
    """
    A simple class to wrap a test function and its descriptions.

    A test function takes the submission module (the module object
    resulting from running the student's code), and prints text.
    The text output will be compared to the official answer's output
    from the test function to decide if the answer is right.

    """
    def __init__(self, test_fn, short_description, detailed_description='', compare=None):
        """
        test_fn: function that takes a submission module and prints something to stdout.
        short_description: short description of the test.
        detailed_description: (optional) longer description.
        """
        self._test_fn = test_fn
        self.short_description = short_description
        self.detailed_description = detailed_description
        if compare:
            self.compare_results = compare

    def __call__(self, *args):
        return self._test_fn(*args)

    def compare_results(self, expected, actual):
        """
        Called to compare the results from the official answer to the student's
        results. Return True for pass, False for fail.

        Note: This runs outside the sandbox.
        """
        return expected == actual


class Grader(object):
    def __init__(self):
        """
        Create an empty grader.

        Has the fix_line_endings preprocessor installed by default.
        """
        # list of Test objects:
        #   test(submission_module) -> ???
        #   test.short_description : string, should fit on one short line in browser
        #   test.detailed_description : string, can be '' if no more description is needed.
        self._tests = []

        # list of functions: submission_text -> error text or None
        self._input_checks = []

        # list of functions: submission_text -> processed_submission_text.  Run
        # in the specified order.  (foldl)
        self._preprocessors = [fix_line_endings]

        # how many EndTest's did we raise and not catch? So we can make sure the student 
        # didn't catch them.
        self._end_tests = 0

    ### Grader interface #############################################################
    def input_errors(self, submission_str):
        """
        submission: string

        returns: list of problems / errors that prevent code from being run.  If no errors, [].

        MUST NOT RUN the submission.  Only allowed to do safe checks, like substr, etc.
        """
        return filter(None, [check(submission_str) for check in self._input_checks])

    def preprocess(self, submission_str):
        """
        submission: string

        returns: string to actually evaluate.

        MUST NOT RUN the submission.  Just add extra stuff, e.g. add a preamble.
        """
        s = submission_str
        for f in self._preprocessors:
            s = f(s)

        return s

    def tests(self):
        return self._tests

    def end_test(self, message):
        """
        End the test with a message to the student.
        """
        self._end_tests += 1
        print _("*** Error: {0}").format(message)
        raise EndTest()

    def caught_end_test(self):
        self._end_tests -= 1

    def uncaught_end_tests(self):
        """
        How many EndTest exceptions were raised but not caught?
        """
        return self._end_tests

    ### Grader setup ###############################################################

    def add_preprocessor(self, fn):
        """
        Append preprocessor function to the preprocessors list.  It runs after
        all the existing preprocessors.
        """
        self._preprocessors.append(fn)

    def add_test(self, test):
        """
        Append test object to the tests list.

         test is an annotated callable (e.g. a Test object):
           test(submission_module) -> anything, printing output to be compared to staff solution
           test.short_description : string, should fit on one short line in browser
           test.detailed_description : string, can be '' if no more description is needed.
        """
        self._tests.append(test)

    def add_tests_from_class(self, test_class):
        """
        Add a number of tests, one for each method in a test class. Like this:

            class Tests(object):
                def test_pop_from_empty(self, submission_module):
                    '''q = Queue()
                       q.remove()'''
                    q = submission_module.Queue()
                    try:
                        q.remove()
                        print "It should have raised ValueError!"
                    except ValueError:
                        print "It did raise ValueError!"
                def compare_results(self, expected, actual):
                      # optional ,if you want a custom grader

            grader.add_tests_from_class(Tests)

        Each method becomes a Test. The name of the test is the short description
        (_ are replaced by spaces); any docstring will be the long description.
        """
        t = test_class()
        if hasattr(t, "compare_results"):
            compare = t.compare_results
        else:
            compare = None
        for name, value in inspect.getmembers(t, inspect.ismethod):
            if name.startswith("test_"):
                sd = 'Test: ' + name[5:].replace('_', ' ')
                self.add_test(Test(value, sd, value.__doc__, compare))


    def add_input_check(self, check):
        """
        Add an input check function to the grader.

        check is a function: student submission string -> complaint str, or None if ok.
                        MUST NOT run the submission.
        """
        self._input_checks.append(check)


## Preprocessors ##########################################################

def wrap_in_string(code):
    """
    For testing code that's not wrapped in a function (e.g. only for the first few problems),
    wrap it in a string, so that tests can exec it multiple times.

    See also exec_wrapped_code() below.
    """
    # repr() takes care of escaping things properly.
    s = "submission_code = " + repr(code)
    #print "wrapped '" + code + "': '" + s + "'"
    
    return s

def fix_line_endings(code):
    """
    Remove carriage returns.
    """
    return code.replace('\r','')

## Input checks ###########################################################

def required_substring(string, error_msg=None):
    """
    Returns a function that checks that string is present in the code, returning
    error_msg if it isn't there.  If error_msg is None, returns a default error message.
    """
    def check(code):
        if code.find(string) == -1:
            return error_msg or _("Your code should contain '{0}'.").format(string)
        return None

    return check

def prohibited_substring(string, error_msg=None):
    """
    Returns a function that checks that string is not present in the code, returning
    error_msg if it is present.  If error_msg is None, returns a default error message.
    """
    def check(code):
        if code.find(string) != -1:
            return error_msg or _("Your code should not contain '{0}'.").format(string)
        return None

    return check

# Aliases that might become more intelligent in the future.
def _tokens(code):
    """A wrapper around tokenize.generate_tokens.""" 
    # Protect against pathological inputs: http://bugs.python.org/issue16152
    code = code.rstrip() + "\n"
    if isinstance(code, unicode):
        code = code.encode('utf8')
    code = "# coding: utf8\n" + code
    toks = tokenize.generate_tokens(StringIO(code).readline)
    return toks

def _count_tokens(code, string):
    """Return a count of how many times `string` appears as a keyword in `code."""
    count = 0

    try:
        for ttyp, ttok, __, __, __ in _tokens(code):
            if ttyp in (tokenize.COMMENT, tokenize.STRING):
                continue
            if ttok == string:
                count += 1
    except:
        # The input code was bad in some way. It will fail later on.
        pass
    return count

def prohibited_keyword(string, error_msg=None):
    def check(code):
        if _count_tokens(code, string) > 0:
            return error_msg or _('Your code cannot make use of the "{0}" keyword.').format(string)
        return None

    return check

def required_keyword(string, error_msg=None):
    def check(code):
        if _count_tokens(code, string) == 0:
            return error_msg or _('Your code must make use of the "{0}" keyword.').format(string)
        return None

    return check

def input_check_or(error_msg, *args):
    def check(code):
        for check in args:
            if check(code) is None:
                return None
        return error_msg
    return check

def one_of_required_keywords(strings, error_msg=None):
    '''
    strings is a list of strings
    returns True if one of the strings is present, False if none are.
    '''
    def check(code):
        for string in strings:
            if _count_tokens(code, string) > 0:
                return None

        return error_msg or _('Your code must make use of at least one of the following keywords: {0}.').format(strings)

    return check

prohibited_operator = prohibited_keyword
required_operator = required_keyword

def substring_occurs(string, at_least=None, at_most=None, exactly=None, error_msg=None, ignore_spacing=False):
    """
    Returns an input check function that checks that `string` occurs at least
    `at_least` times, and/or not more than `at_most` times, or exactly `exactly`
    times.
    """
    def check(code):
        if ignore_spacing:
            occurs = code.replace(' ','').count(string.replace(' ', ''))
        else:
            occurs = code.count(string)
        return _check_occurs(string, occurs, at_least, at_most, exactly, error_msg)

    return check

def substring_occurs_if_condstring(string, condstring, at_least=None, at_most=None, exactly=None, error_msg=None):
    """
    Returns an input check function that checks that `string` occurs at least
    `at_least` times, and/or not more than `at_most` times, or exactly `exactly`
    times, if `condstring` occurs at least once in the string.
    """
    def check(code):
        condoccurs = code.count(condstring)
        if condoccurs:
            occurs = code.count(string)
            return _check_occurs(string, occurs, at_least, at_most, exactly, error_msg)

        return None

    return check

def token_occurs(string, at_least=None, at_most=None, exactly=None, error_msg=None):
    """
    Returns an input check function that checks that `string` occurs at least
    `at_least` times, and/or not more than `at_most` times, or exactly `exactly`
    times.  Only occurrences outside of strings and comments are counted.
    """
    def check(code):
        occurs = _count_tokens(code, string)
        return _check_occurs(string, occurs, at_least, at_most, exactly, error_msg)
    return check

def count_non_comment_lines(at_least=None, at_most=None, exactly=None, error_msg=None):
    """
    Returns an input check function that checks that the number of non-comment,
    non-blank source lines conforms to the rules in the arguments.
    """
    def check(code):
        linenums = set()
        for ttyp, ttok, (srow, __), __, __ in _tokens(code):
            if ttyp in (tokenize.COMMENT, tokenize.STRING):
                # Comments and strings don't count toward line count. If a string
                # is the only thing on a line, then it's probably a docstring, so
                # don't count it.
                continue
            if not ttok.strip():
                # Tokens that are only whitespace don't count.
                continue
            linenums.add(srow)
        num = len(linenums)
        return _check_occurs(None, num, at_least, at_most, exactly, error_msg)
    return check

def _check_occurs(text, occurs, at_least=None, at_most=None, exactly=None, error_msg=None):
    if exactly is not None:
        if occurs != exactly:
            return error_msg or _("Your code has {0!r} {1} times, must be exactly {2}.").format(text, occurs, exactly)
    if at_least is not None:
        if occurs < at_least:
            return error_msg or _("Your code has {0!r} {1} times, must be at least {2}.").format(text, occurs, at_least)
    if at_most is not None:
        if occurs > at_most:
            return error_msg or _("Your code has {0!r} {1} times, can't be more than {2}.").format(text, occurs, at_most)
    return None

def must_define_function(fn_name, error_msg=None):
    """
    Returns a function that checks if a function named `fn_name` is defined. If not,
    returns `error_msg`, or a default message.
    """
    def check(code):
        if not re.search(r"\bdef\s+%s\b" % fn_name, code):
            return error_msg or _("Your code must define a function named '{0}'.").format(fn_name)
        return None

    return check

def prohibited_function_definition(fn_name, error_msg=None):
    """
    Returns a function that checks if a function named `fn_name` is defined. If so,
    returns `error_msg`, or a default message.
    """
    def check(code):
        if re.search(r"\bdef\s+%s\b" % fn_name, code):
            return error_msg or _("Your code should NOT define a function named '{0}'.").format(fn_name)
        return None

    return check

def must_define_class(class_name, error_msg=None):
    """
    Returns a function that checks if a class named `class_name` is defined. If not,
    returns `error_msg`, or a default message.
    """
    def check(code):
#        if not re.search(r"\bclass\s+%s\b" % class_name, code):
        if 'class ' + class_name not in code:
            return error_msg or _("Your code must define a class named '{0}'. Be sure you only have one space between the keyword 'class' and the class name.").format(class_name)
        return None

    return check

def prohibited_class_method(class_name, method_name, error_msg=None):
    """
    Returns a function that checks if a class named `class_name` contains a method
    titled `method_name`. If so, returns `error_msg`, or a default message.
    """
    def check(code):
        inClass = False
        lines = code.split('\n')
        # Remove comments from lines
        lines = [line[:line.find('#')] for line in lines]
        for line in lines:
            if line.replace(' ','') == '': continue

            if 'class ' + class_name in line:
                inClass = True
            elif inClass and re.search(r"\bdef\s+%s\b" % method_name, line):
                return error_msg or _("The class named '{0}' should not define a method named {1}.").format(class_name, method_name)
            elif inClass and 'class ' in line:
                if class_name not in line or '('+class_name+')' in line.replace(' ', ''):
                    inClass = False
        return None
    return check

def required_class_method(class_name, method_name, error_msg=None):
    """
    Returns a function that checks if a class named `class_name` contains a method
    titled `method_name`. If not, returns `error_msg`, or a default message.
    """
    def check(code):
        inClass = False
        inDocstring = False
        lines = code.split('\n')
        # Remove comments from lines
        lines = [line[:line.find('#')] for line in lines]
        for line in lines:
            if line.replace(' ','') == '': continue

#            if "'''" in line or '"""' in line: # TODO Sarina: does this work? debug it, L11/handClass
#                inDocstring = not inDocstring
#            elif inDocstring: continue
            if 'class ' + class_name in line:
                inClass = True
            elif inClass and re.search(r"\bdef\s+%s\b" % method_name, line):
                return None
            elif inClass and 'class ' in line and class_name not in line:
                inClass = False
        return error_msg or _("The class named '{0}' should define a method named {1}.").format(class_name, method_name)
    return check


## test functions #################################

@contextlib.contextmanager
def capture_stdout():
    old_stdout = sys.stdout
    sys.stdout = stdout = StringIO()
    yield stdout
    sys.stdout = old_stdout

def exec_wrapped_code(environment=None, post_process=None):
    """
    Exec the submission code, with the given environment.
    `post_process` is a function that takes a string, the original stdout of
    the code, and returns a new string, the transformed stdout, suitable for
    comparison.
    """
    if environment is None:
        environment = {}
    def test_fn(submission_module):
        with capture_stdout() as stdout:
            exec submission_module.submission_code in environment
        stdout_text = stdout.getvalue()
        if post_process:
            stdout_text = post_process(stdout_text)
        print stdout_text

    return test_fn


def exec_code_and_inspect_values(environment=None, vars_to_inspect=None, post_process=None):
    """
    Exec the submission code, with the given environment.
    `vars_to_inspect` is a list of variables to inspect the values of (they will
    be inspected by printing to stdout). Does not otherwise inspect student output.
    `post_process` is a function that takes a string, the original stdout of
    the code, and returns a new string, the transformed stdout, suitable for
    comparison.
    """
    if environment is None:
        environment = {}
    def test_fn(submission_module):
        with capture_stdout() as stdout:
            exec submission_module.submission_code in environment

        for var in vars_to_inspect:
            print var

    return test_fn
    

def trace_wrapped_code(inspector, error_msg):
    def test_fn(submission_module):
        inspector.set_source(submission_module.submission_code)
        with inspector:
            for report in inspector.inspect_dispatch():
                if not report:
                    print error_msg
    return test_fn

def invoke_student_function(fn_name, args, environment=None, output_writer=None):
    """
    Run the student's function named `fn_name` with the args `args`, and prints
    the result. `output_writer` is a function that takes the result of the student's
    function, and produces a string to print.  It defaults to `repr`, but for example,
    floats should be formatted to a particular number of decimal places to prevent
    rounding issues.
    """
    output_writer = output_writer or repr
    def doit(submission_module):
        for name, value in (environment or {}).iteritems():
            setattr(submission_module, name, value)
        fn = getattr(submission_module, fn_name)
        print output_writer(fn(*args))
    return doit

class InvokeStudentFunctionTest(Test):
    """
    A Test that invokes a student function.
    """
    def __init__(self, fn_name, args, environment=None, output_writer=None, short_desc=None, detailed_desc=None,compare=None):
        self.fn_name, self.args = fn_name, args

        test_fn = invoke_student_function(fn_name, args, environment, output_writer)
        if short_desc is None:
            short_desc = "Test: %s(%s)" % (fn_name, ", ".join(repr(a) for a in args))
        Test.__init__(self, test_fn, short_desc, detailed_desc, compare)

    def get_writable_version(self):
        def my_str(s):
            if isinstance(s, str):
                return "'%s'" % s
            return str(s)
        return "{0}({1})".format(self.fn_name, ','.join(map(my_str, self.args)))

def round_float_writer(n):
    """Returns an output_writer function that rounds its argument to `n` places."""
    def _round_float_output_writer(f):
        return "%.*f" % (n, f)
    return _round_float_output_writer
