import importlib
import os
from os import path
import pprint
import shutil
import sys

def make_testcases_and_correct_output(grader_path_orig, output_dir):
    """Generate a testCase.py file in the directory output_dir that OverCode
    can use, based on the tests in the grader at grader_path_orig."""

    # TODO: this should probably create a temporary directory and copy
    # things into it rather than using the current directory
    current_dir = path.dirname(path.abspath(__file__))
    grader_dir = path.dirname(grader_path_orig)

    # answer_path_orig = path.join(grader_dir, 'answer.py')
    grader_name = path.basename(grader_path_orig).rstrip('.py')

    grader_copy_path = path.join(current_dir, grader_name + '.py')
    # answer_copy_path = path.join(current_dir, 'answer.py')

    # testcase_path = path.join(output_dir, 'testCase.py')
    # correct_output_path = path.join(output_dir, 'correctOutput.py')

    try:
        shutil.copy(grader_path_orig, current_dir)

        # Write out the testCase.py
        module = importlib.import_module(grader_name)
        pprint.pprint(map(lambda t: inspect.getargspec(t._test_fn), module.grader.tests()))
        # module.grader.write_out(testcase_path)

        # Evaluate and write the correct answer if there is an answer.py
        # if os.path.isfile(answer_path_orig):
        #     shutil.copy(answer_path_orig, current_dir)

        #     correct_output = {}
        #     with open(testcase_path, 'r') as f:
        #         testcases = f.read().split('\n')[:-1]

        #     # We know the answer is named answer.py
        #     # This gives a SyntaxWarning, which is sketchy, but it works.
        #     # For more on this warning, see this blog post:
        #     # http://akaptur.com/blog/2014/06/11/of-syntax-warnings-and-symbol-tables/
        #     # This is really not very safe. Calling things in a subprocess
        #     # would be much better, but I trust both the answer.py files and
        #     # the testcases not to be sketchy, so I don't bother
        #     from answer import *
        #     for t in testcases:
        #         correct_output[t] = eval(t)

        #     with open(correct_output_path, 'w') as f:
        #         pprint.pprint(correct_output, f)

    finally:
        try:
            os.remove(grader_copy_path)
            # os.remove(answer_copy_path)
            os.remove(grader_copy_path + 'c') # remove the .pyc files
            # os.remove(answer_copy_path + 'c')
        except OSError:
            pass

if __name__ == '__main__':
    grader_path = sys.argv[1]
    output_dir = sys.argv[2]
    make_testcases_and_correct_output(grader_path, output_dir)

