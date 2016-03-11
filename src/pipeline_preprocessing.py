import importlib
import inspect
import os
from os import path
import pickle
import pprint
import shutil
import sys

from external import pg_logger
from pipeline_util import ensure_folder_exists

# Trace info extractor, tidier finalizer
from pipeline_default_functions import extract_var_info_from_trace
from pipeline_default_functions import tidy_one
from pipeline_default_functions import elena_finalizer

from affixes import prefix, postfix

#####################################################

from definitions import *

#####################################################

STOP_ON_ERROR = False

# AUGMENT_PREFIX = "from definitions import *\n"
AUGMENT_PREFIX = ''

def tidy(source_dir, dest_dir, tested_function_name):
    """
    Go through every .py file in the source_dir directory and call tidy_one on each.
    Write out the results to a file of the same name in the dest_dir directory.

    source_dir: string, path to folder with data to tidy
    dest_dir: string, path to folder to write tidy data to. Does not need
        to already exist.
    tested_function_name: the name of the function which will be tested. Used
        when tidying to remove debugging function calls.

    If STOP_ON_ERROR is set and an error is encountered while tidying, raises
    that error (and returns nothing).

    returns: list of solution ids (filenames without .py) that could not be tidied
    """
    ensure_folder_exists(dest_dir)

    skipped = []
    for filename in os.listdir(source_dir):
        # Skip non-python files
        if not filename.endswith('.py'):
            continue

        sol_id = filename.split('.')[0]
        print "Tidying", sol_id

        source_path = path.join(source_dir, filename)
        dest_path = path.join(dest_dir, filename)
        try:
            tidy_one(source_path, dest_path, tested_function_name)
        except:
            if STOP_ON_ERROR: raise
            skipped.append(sol_id)
    return skipped

def augment(source_dir, dest_dir):
    ensure_folder_exists(dest_dir)

    for filename in os.listdir(source_dir):
        with open(path.join(source_dir, filename), 'r') as f:
            source = f.read()
        with open(path.join(dest_dir, filename), 'w') as f:
            f.write(AUGMENT_PREFIX + source)

def logger_wrapper(source):
    """
    Call pg_logger on the given source with the given finalizer. Only return
    the trace and drop the argument names and return variables on the floor.
    """
    trace, args, returnVars = pg_logger.exec_script_str_local(
        source,
        False, # raw_input_lst_json,
        False, # cumulative,
        False, # heapPrimitives,
        elena_finalizer)

    return trace

# def do_logger_run(source, testcases):
#     """
#     Run the logger on the given source

#     source: string, python source
#     testcases: list of strings, where each element is a well-formed testcase

#     returns: list of traces, one for each test case. Traces are in the same
#     order as the given list of testcases.
#     """
#     # TODO: when the sol has errors, printed out from line 1283 in pg_logger
#     # look for trace['exception_msg'] (probably in the finalizer) and don't
#     # bother rerunning on all the test cases for certain exceptions, e.g.,
#     # RuntimeErrors form max recursion depth exceeded
#     # Make sure all_traces is the right length if this happens!
#     all_traces = []
#     for i, test_case in enumerate(testcases):
#         print ".",
#         source_with_test = prefix + source + postfix + '\n\n' + test_case
#         trace = logger_wrapper(source_with_test)
#         munged_trace = extract_var_info_from_trace(trace)

#         with open('trace_unmunged.txt', 'w') as f:
#             pprint.pprint(trace, f)


#         all_traces.append(munged_trace)
#     print

#     return all_traces

def do_logger_run(sol_runner_template, format_args_shared, grader_module):
    results = {}
    for (i, test) in enumerate(grader_module.grader.tests()):
        format_args = format_args_shared.copy()
        format_args.update({
            'which_test': i,
            'function_invocation': test.get_writable_version(),
            'function_name': test.fn_name
        })
        source = sol_runner_template.format(**format_args)

        print source

        # print "source:", source
        # logger_wrapper(source)
        # print "*********"
        # print "*********\n"
        # print type(test)
        # print inspect.getsource(test._test_fn)
        # print "*********\n"
        # print test.get_writable_version()


        results[test.short_description] = logger_wrapper(source)
    return results

    # source = sol_runner_template.format(**format_args_shared)
    # return logger_wrapper(source)


def do_pickle(sol_id, testcases_to_traces, dest_dir):
    # Not backwards compatible - old version required trace, args, returnVars
    to_pickle = {
        'testcases_to_traces': testcases_to_traces
    }

    # Dump out
    pickle_path = path.join(dest_dir, sol_id + '.pickle')

    if sol_id == "answer":
        with open('finalized_trace.txt', 'w') as f:
            pprint.pprint(to_pickle, f)

    try:
        with open(pickle_path, 'w') as f:
            pickle.dump(to_pickle, f)
    except pickle.PicklingError:
        # If something goes wrong, clean up, then pass the exception back up
        # the stack
        os.remove(pickle_path)

        with open('failed_pickle.txt', 'w') as f:
                pprint.pprint(to_pickle, f);
        raise

def execute_and_pickle(source_dir, dest_dir, grader_path):
    """
    Run pg_logger on each file in source_dir for each test case and store the
    results in pickle files in dest_dir.

    source_dir: string, path to a directory of source files to run
    dest_dir: string, path to a directory to put pickle files. Does not need to
        already exist
    testcases: list of strings, where each string is a well-formed test case
        for the source files in question

    If STOP_ON_ERROR is set and an error is encountered while logging or
        pickling, raises that error (and returns nothing).

    returns: (skipped_running, skipped_pickling) - two lists of solution ids
        (filename without .py) that encountered errors while executing or
        while pickling, respectively. A failure while pickling means that the
        solution executed correctly but the results could not be stored.
    """
    ensure_folder_exists(dest_dir)
    skipped_running, skipped_pickling = [], []

    # copy the grader from the original path to this directory
    current_dir = path.dirname(path.abspath(__file__))
    shutil.copy(grader_path, current_dir)

    # copy the solution runner into the data folder
    shutil.copy('./solution_runner_template.py', source_dir)

    grader_name = path.basename(grader_path).rstrip('.py')
    grader_module = importlib.import_module(grader_name)
    try:
        with open(path.join(source_dir, 'solution_runner_template.py'), 'r') as f:
            sol_runner_template = f.read()

        for filename in os.listdir(source_dir):
            if not filename.endswith('.py'):
                continue

            sol_id = filename.split('.')[0]

            if sol_id == 'solution_runner_template':
                continue

            # with open(path.join(source_dir, filename), 'r') as f:
            #     source = f.read()
            submission_path = path.join(source_dir, filename)
            # tmp = sol_runner_template.replace('__student_sub_path__', submission_path)
            # source = tmp.replace('__grader_name__', grader_name)
            format_args_shared = {
                'student_sub_path': submission_path,
                'grader_name': grader_name
            }
            # source = sol_runner_template.format(
            #     student_sub_path=submission_path,
            #     grader_name=grader_name
            # )
            # print source
            # testcases=['pass']

            # Execute
            print "Running logger on", sol_id
            try:
                # all_traces = do_logger_run(source, testcases)
                all_traces = do_logger_run(sol_runner_template, format_args_shared, grader_module)
                # trace = logger_wrapper(source)
            except:
                if STOP_ON_ERROR: raise
                raise
                skipped_running.append(sol_id)
                # We had an error, do not try to pickle and just move on
                continue

            # Pickle results
            try:
                do_pickle(sol_id, all_traces, dest_dir)
            except pickle.PicklingError:
                if STOP_ON_ERROR: raise
                skipped_pickling.append(sol_id)

        return skipped_running, skipped_pickling
    finally:
        try:
            # clean up the files we copied
            grader_copy_path = path.join(current_dir, grader_name + '.py')
            os.remove(grader_copy_path)
            os.remove(grader_copy_path + 'c') # remove the .pyc file also
            sol_runner_copy_path = path.join(source_dir, 'solution_runner_template.py')
            os.remove(sol_runner_copy_path)
            os.remove(sol_runner_copy_path + 'c')
        except OSError:
            pass

def preprocess_pipeline_data(folder_of_data,
                             grader_path,
                             tested_function_name):
    tidyDataPath = path.join(folder_of_data, 'tidyData')
    augmentedPath = path.join(folder_of_data, 'augmentedData')
    formatPath = path.join(folder_of_data, 'tidyDataHTML')
    picklePath = path.join(folder_of_data, 'pickleFiles')

    # tested_function_names = ['test1', 'test2_xx']

    # testCases = []
    # with open(testcase_path, 'r') as f:
    #     for line in f:
    #         testcase = line.strip()
    #         function_name = line.split('(')[0]
    #         # print "function name:", function_name,"\n"
    #         if function_name in tested_function_names:
    #             testCases.append(testcase)
        # testCases = [line.strip() for line in f if line.startswith(tested_function_name)]

    # if testCases == []:
    #     raise ValueError("No test cases matching the given function name")
    print "running preprocessor"
    print "folder of data:", folder_of_data, "tidy data path:", tidyDataPath

    skipped_tidy = tidy(folder_of_data, tidyDataPath, tested_function_name)

    if AUGMENT_PREFIX:
        augment(tidyDataPath, augmentedPath)
        executable_path = augmentedPath
    else:
        executable_path = tidyDataPath

    # finalizer = make_default_finalizer(tested_function_name)

    skipped_running, skipped_pickling = execute_and_pickle(
        executable_path, picklePath, grader_path)

    print "Solutions skipped:", len(skipped_tidy) + len(skipped_running) + len(skipped_pickling)
    if skipped_tidy:
        print "SKIPPED WHEN TIDYING:"
        pprint.pprint(skipped_tidy, indent=2)
    if skipped_running:
        print "SKIPPED WHEN EXECUTING:"
        pprint.pprint(skipped_running, indent=2)
    if skipped_pickling:
        print "SKIPPED WHEN PICKLING:"
        pprint.pprint(skipped_pickling, indent=2)
