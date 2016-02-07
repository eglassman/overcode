import importlib
import os
from os import path
import shutil
import sys

def make_testcases(grader_path, output_dir):
    """Generate a testCase.py file in the directory output_dir that OverCode
    can use, based on the tests in the grader at grader_path."""

    # TODO: this should probably create a temporary directory and copy
    # things into it rather than using the current directory
    current_dir_path = path.dirname(path.abspath(__file__))
    output_path = path.join(output_dir, 'testCase.py')
    grader_name = path.basename(grader_path).rstrip('.py')
    try:
        shutil.copy(grader_path, current_dir_path)

        module = importlib.import_module(grader_name)
        module.grader.write_out(output_path)

    finally:
        try:
            os.remove(path.join(current_dir_path, grader_name + '.py'))
            os.remove(path.join(current_dir_path, grader_name + '.pyc'))
        except OSError:
            pass

if __name__ == '__main__':
    grader_path = sys.argv[1]
    output_dir = sys.argv[2]
    make_testcases(grader_path, output_dir)

