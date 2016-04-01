import os
from os import path
import pickle
import pprint
import sys

from external import pg_logger
from pipeline_util import ensure_folder_exists

# Trace info extractor, tidier finalizer
from pipeline_default_functions import extract_var_info_from_trace
from pipeline_default_functions import tidy_one
from pipeline_default_functions import elena_finalizer

# To run on a non-class problem, comment out definitions.py and change testcase_defs
# and import_prefix to empty strings
from affixes import testcase_defs_mitcampus as testcase_defs, import_prefix
# testcase_defs, import_prefix = "", ""
from definitions import *

STOP_ON_ERROR = False

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
            f.write(import_prefix + source + testcase_defs)

def logger_wrapper(source):
    """
    Call pg_logger on the given source with the given finalizer. Only return
    the trace and drop the argument names and return variables on the floor.
    """
    # trace, args, returnVars = pg_logger.exec_script_str_local(
    trace, stdout = pg_logger.exec_script_str_local(
        source,
        False, # raw_input_lst_json,
        False, # cumulative,
        False, # heapPrimitives,
        elena_finalizer)

    return trace, stdout

def do_logger_run(source, testcases):
    """
    Run the logger on the given source

    source: string, python source
    testcases: list of strings, where each element is a well-formed testcase

    returns: list of traces, one for each test case. Traces are in the same
    order as the given list of testcases.
    """
    # TODO: when the sol has errors, printed out from line 1283 in pg_logger
    # look for trace['exception_msg'] (probably in the finalizer) and don't
    # bother rerunning on all the test cases for certain exceptions, e.g.,
    # RuntimeErrors form max recursion depth exceeded
    # Make sure all_traces is the right length if this happens!
    all_traces = []
    all_outputs = []
    for i, test_case in enumerate(testcases):
        # print ".",
        print "\t" + test_case
        source_with_test = source + '\n\n' + test_case
        trace, stdout = logger_wrapper(source_with_test)
        # print "stdout:", stdout
        munged_trace = extract_var_info_from_trace(trace)

        with open('trace_unmunged.txt', 'w') as f:
            pprint.pprint(trace, f)

        all_traces.append(munged_trace)
        all_outputs.append(stdout)
    print

    return all_traces, all_outputs

def do_pickle(sol_id, all_traces, all_outputs, testcases, dest_dir):
    # Not backwards compatible - old version required trace, args, returnVars
    to_pickle = {
        'traces': all_traces,
        'outputs': all_outputs,
        'testcases': testcases
    }

    # Dump out
    pickle_path = path.join(dest_dir, sol_id + '.pickle')

    if sol_id == "answer":
        with open('finalized_trace.txt', 'w') as f:
            pprint.pprint(to_pickle, f)

    try:
        with open(pickle_path, 'w') as f:
            pickle.dump(to_pickle, f)
    except (pickle.PicklingError, TypeError):
        # If something goes wrong, clean up, then pass the exception back up
        # the stack
        os.remove(pickle_path)

        with open('failed_pickle.txt', 'w') as f:
                pprint.pprint(to_pickle, f)

def execute_and_pickle(source_dir, dest_dir, testcases):
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

    for filename in os.listdir(source_dir):
        sol_id = filename.split('.')[0]
        with open(path.join(source_dir, filename), 'r') as f:
            source = f.read()

        # Execute
        print "Running logger on", sol_id
        try:
            all_traces, all_outputs = do_logger_run(source, testcases)
        except:
            if STOP_ON_ERROR: raise
            skipped_running.append(sol_id)
            # We had an error, do not try to pickle and just move on
            continue

        # Pickle results
        try:
            do_pickle(sol_id, all_traces, all_outputs, testcases, dest_dir)
        except pickle.PicklingError:
            if STOP_ON_ERROR: raise
            skipped_pickling.append(sol_id)

    return skipped_running, skipped_pickling

def preprocess_pipeline_data(folder_of_data,
                             testcase_path,
                             tested_function_name):
    tidyDataPath = path.join(folder_of_data, 'tidyData')
    augmentedPath = path.join(folder_of_data, 'augmentedData')
    formatPath = path.join(folder_of_data, 'tidyDataHTML')
    picklePath = path.join(folder_of_data, 'pickleFiles')

    with open(testcase_path, 'r') as f:
        testCases = [line.strip() for line in f] # if line.startswith(tested_function_name)]

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
    # print "running preprocessor"
    # print "folder of data:", folder_of_data, "tidy data path:", tidyDataPath

    skipped_tidy = tidy(folder_of_data, tidyDataPath, tested_function_name)

    augment(tidyDataPath, augmentedPath)

    skipped_running, skipped_pickling = execute_and_pickle(
        augmentedPath, picklePath, testCases)

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
