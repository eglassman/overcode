import os
from os import path
#import pickle
try:
   import cPickle as pickle
except:
   import pickle
import pprint
import sys
import time
import json

t0 = time.clock()

from external import pg_logger
from pipeline_util import ensure_folder_exists

# Trace info extractor, tidier, finalizer
from pipeline_default_functions import extract_var_info_from_trace
from pipeline_default_functions import tidy_one #, tidy_one_json
from pipeline_default_functions import elena_finalizer
from pipeline_default_functions import extract_sequences

###############################################################################
## NOTES
###############################################################################
# The function that does all the work is "preprocess_pipeline_data", at the
# bottom of the file. This file shouldn't be run directly - use run_pipeline.py
# instead.
#
# Comments explaining the flow of execution can be found below. Start with the
# imports below, then look at the "preprocess_pipeline_data" function!
###############################################################################

# These imports control what extra code, if any, is appended/prepended to student
# submissions before running them.
# FUTURE WORK: Usability: change this to be controlled by a config file or
# something similar, rather than requiring code changes.

# If a problem has custom test case definitions, they must be defined as a
# string in affixes.py. The import below changed accordingly and toggled. See
# affixes.py for some examples.
# from affixes import null_testcase_defs as testcase_defs    # simple test cases
from affixes import testcase_defs_gustavo as testcase_defs           # custom test cases

# If a problem involves subclassing (i.e., student submissions can assume that
# a parent class definition will be supplied), the parent class definition
# must be defined in definitions.py, and the correct import should be toggled
# below
from affixes import import_random as import_prefix  # no subclassing
# from affixes import import_prefix                      # subclassing
from definitions import *

# Whether or not to halt execution if an error is encountered in student code
STOP_ON_ERROR = False

def tidy_json(source_dir, json_name, tested_function_name):

    source_json = path.join(source_dir, json_name)
    before_path = path.join(source_dir, 'before.py')
    after_path = path.join(source_dir, 'after.py')

    skipped = []

    print 'opening json now'
    with open(source_json) as data_file:
        solutions = json.load(data_file)

    for id,sol in enumerate(solutions):
        
        for key in sol.keys():
            if key.startswith('py_') or key=='before' or key=='after':
                print "Tidying ",id,key
                #print sol[key]
        
                with open(before_path,'w') as before_file:
                    before_file.write(sol[key])

                try:
                    tidy_one(before_path, after_path, tested_function_name)
                    
                    with open(after_path) as after_file:
                        sol['tidy_'+key] = after_file.read()
                        print id,key, ' tidied'
                        #print sol['tidy_'+key]
                except:
                    if STOP_ON_ERROR: raise
                    skipped.append(str(id)+key)

    print 'writing back out to json now'
    with open(source_json,'w') as data_file:
        json.dump(solutions, data_file, indent=4)

    return skipped


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

def augment_json(source_dir, json_name):
    source_json = path.join(source_dir, json_name)
    before_path = path.join(source_dir, 'before.py')
    after_path = path.join(source_dir, 'after.py')

    print 'opening json now'
    with open(source_json) as data_file:
        solutions = json.load(data_file)

    for id,sol in enumerate(solutions):    
        for key in sol.keys():
            if key.startswith('tidy_'):
                sol['augmented_'+key] = import_prefix + sol[key] + testcase_defs

    print 'writing back out to json now'
    with open(source_json,'w') as data_file:
        json.dump(solutions, data_file, indent=4)

def augment(source_dir, dest_dir):
    """
    Append or prepend any extra code from affixes.py to student submissions.

    source_dir: string, path to folder with data to augment
    dest_dir: string, path to folder to write augmented data to. Does not need
        to already exist.
    """
    ensure_folder_exists(dest_dir)

    for filename in os.listdir(source_dir):
        with open(path.join(source_dir, filename), 'r') as f:
            source = f.read()
        with open(path.join(dest_dir, filename), 'w') as f:
            f.write(import_prefix + source + testcase_defs)

def logger_wrapper(source, output_only):
    """
    Call pg_logger on the given source with the given finalizer. Only return
    the trace and stdout and drop the argument names and return variables on
    the floor.
    """
    # trace, args, returnVars = pg_logger.exec_script_str_local(
    trace, stdout = pg_logger.exec_script_str_local(
        source,
        False, # raw_input_lst_json,
        False, # cumulative,
        False, # heapPrimitives,
        output_only, #don't remember intermediate values
        elena_finalizer)

    try:
        print 'stdout'
        print trace.keys()
        print stdout
        print time.clock() - t0
    except:
        print 'ran into problem'

    return trace, stdout

def do_logger_run(source, testcases, output_only):
    """
    Run the logger on the given source

    source: string, python source
    testcases: list of strings, where each element is a well-formed testcase

    returns: list of traces, one for each test case. Traces are in the same
    order as the given list of testcases.
    """
    # FUTURE WORK: Performance: when the sol has errors, printed out from line
    # 1283 in pg_logger look for trace['exception_msg'] (probably in the finalizer)
    # and don't bother rerunning on all the test cases for certain exceptions, e.g.,
    # RuntimeErrors from max recursion depth exceeded.
    # Make sure all_traces is the right length if this happens!

    print 'running do_logger_run'
    all_traces = []
    all_outputs = []
    for i, test_case in enumerate(testcases):
        # Print each time so the user can follow along with the progress
        print "\t" + test_case

        # append each test case in turn
        source_with_test = source + '\n\n' + test_case
        # Run the logger
        trace, stdout = logger_wrapper(source_with_test, output_only)
        munged_trace = extract_var_info_from_trace(trace)

        # To look at the trace before extracting info, print it out to the
        # console or a file here.
        # pprint.pprint(trace)

        all_traces.append(munged_trace)
        all_outputs.append(stdout)
    print

    return all_traces, all_outputs

def do_pickle(sol_id, all_traces, all_outputs, testcases, dest_dir):
    """
    Pickle the traces, outputs, and testcases. Cleans up after errors.

    Not sure why this is a separate function instead of just part of
    execute_and_pickle.
    """
    to_pickle = {
        'traces': all_traces,
        'outputs': all_outputs,
        'testcases': testcases
    }

    # Dump out
    pickle_path = path.join(dest_dir, sol_id + '.pickle')

    try:
        with open(pickle_path, 'w') as f:
            pickle.dump(to_pickle, f)
    except (pickle.PicklingError, TypeError):
        # If something goes wrong, clean up, then pass the exception back up
        # the stack
        print 'failed to pickle sol', sol_id
        os.remove(pickle_path)
        raise

def execute_json(source_dir, json_name, testCases, output_only, just_preprocessing):
    """
    Wrapper function.
    Runs pg_logger on each item in json file, stores results back in the json file.
    """
    source_json = path.join(source_dir, json_name)
    skipped_running = []

    print 'opening json now'
    with open(source_json) as data_file:
        solutions = json.load(data_file)

    for id,sol in enumerate(solutions):    
        for key in sol.keys():
            if key.startswith('augmented_'):
                source = sol[key]
                
                # Execute
                print "Running logger on", id
                try:
                    all_traces, all_outputs = do_logger_run(source, testCases, output_only)

                    testcase_to_output = {testCases[i]: all_outputs[i] for i in range(len(testCases))}
                    sol['testcase_to_output'] = testcase_to_output
                    if not just_preprocessing:
                        sol[key+'_traces'] = all_traces
                        sol[key+'_outputs'] = all_outputs
                        sol['testcases'] = testCases
                    else:
                        #consolidate
                        testcase_to_trace = {testCases[i]: all_traces[i] for i in range(len(testCases))}
                        sequences = extract_sequences(testcase_to_trace)
                        sol['sequences'] = sequences

                    if id % 100 == 0:
                        print sol.keys()#['all_traces']
                        for key in sol.keys():
                            print key,':'
                            print pprint.pprint(sol[key])
                        #raw_input("Press Enter to continue...")
                except:
                    if STOP_ON_ERROR: raise
                    skipped_running.append(id)
                    print 'skipping ',id
        
    print 'writing back out to json now'            
    with open(source_json,'w') as data_file:
        json.dump(solutions, data_file, indent=4)

    return skipped_running

def execute_and_pickle(source_dir, dest_dir, testcases, output_only):
    """
    Wrapper function.

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
            all_traces, all_outputs = do_logger_run(source, testcases, output_only)
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

def preprocess_pipeline_data(folder_of_data, testcase_path, output_only, tested_function_name, json_path, bool_just_preprocessing):
    # Various file paths
    tidyDataPath = path.join(folder_of_data, 'tidyData')
    augmentedPath = path.join(folder_of_data, 'augmentedData')
    formatPath = path.join(folder_of_data, 'tidyDataHTML')
    picklePath = path.join(folder_of_data, 'pickleFiles')

    # read in the test case
    with open(testcase_path, 'r') as f:
        testCases = [line.strip() for line in f]

    # Tidy data. Reads in raw solutions from folder_of_data, writes tidied
    # solutions to tidyDataPath. skipped_tidy is a list of the IDs (i.e.,
    # filenames) of any solutions that caused the tidier to raise an
    # exception. Errors are usually caused by syntax errors in the solution.
    if json_path:
        skipped_tidy = tidy_json(folder_of_data, json_path, tested_function_name)

        augment_json(folder_of_data, json_path)

        skipped_pickling = []
        skipped_running = execute_json(folder_of_data, json_path, testCases, output_only, bool_just_preprocessing)
    else:
        skipped_tidy = tidy(folder_of_data, tidyDataPath, tested_function_name)

        # Augment data. Reads in tidied solutions from tidyDataPath, writes
        # solutions with extra code to augmentedPath.
        augment(tidyDataPath, augmentedPath)

        # Runs the logger on the augmented data and serializes the results to
        # pickle files, stored in the picklePath directory. skipped_running is
        # a list of the IDs of any solutions that the logger could not run.
        # skipped_pickling is a list of the IDs of any solutions whose program
        # trace etc. could not be serialized.
        skipped_running, skipped_pickling = execute_and_pickle(
            augmentedPath, picklePath, testCases, output_only)

    # Print out any skipped solutions.
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
