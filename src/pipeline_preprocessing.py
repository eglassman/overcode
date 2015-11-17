import os
from os import path
import pickle
import pprint
import sys

from external import pg_logger
from pipeline_util import ensure_folder_exists

# Tidier, finalizer and formatter
from pipeline_default_functions import extract_var_info_from_trace as defaultTraceMunger
from pipeline_default_functions import tidy_non_oppia as defaultTidier
from pipeline_default_functions import make_default_finalizer
# from pipeline_default_functions import format_as_html as defaultFormatter
defaultFormatter = None

stopOnError = False
# skippedSolutions = []

def tidy(tidyFn, dataSrc, tidyDest, testedFunctionName):
    ensure_folder_exists(tidyDest)

    skipped = []
    print "Tidying data"
    for filename in os.listdir(dataSrc):
        if not filename.endswith('.py'):
            continue

        solNum = filename.split('.')[0]
        print solNum

        try:
            tidyFn(filename, dataSrc, tidyDest, testedFunctionName)
        except:
            if stopOnError: raise
            skipped.append(solNum)
    return skipped

def format(formatFn, dataSrc, formatDest):
    ensure_folder_exists(formatDest)
    skipped = []

    print "Formatting data"
    for filename in os.listdir(dataSrc):
        solNum = filename.split('.')[0]
        print solNum

        try:
            formatFn(filename, dataSrc, formatDest)
        except:
            if stopOnError: raise
            skipped.append(solNum)
    return skipped

def add_test_case(testCase, dataSrc, testCaseDest):
    ensure_folder_exists(testCaseDest)
    for filename in os.listdir(dataSrc):
        with open(path.join(dataSrc, filename), 'r') as f_in:
            with open(path.join(testCaseDest, filename), 'w') as f_out:
                f_out.write(f_in.read() + '\n\n' + testCase)


def run_logger(dataSrc, testCases, pickleDest, finalizer, traceMunger):
    ensure_folder_exists(pickleDest)
    skipped = []

    print "Running logger"
    for filename in os.listdir(dataSrc):
        solNum = filename.split('.')[0]
        print solNum

        with open(path.join(dataSrc, filename), 'r') as f:
            source = f.read()

        toPickle = {}
        toPickle['testCases'] = testCases
        toPickle['traces'] = []
        toPickle['args'] = []
        toPickle['returnVars'] = []

        # loggerOutput = pg_logger.exec_script_str_local(
        for testCase in testCases:
            trace, args, returnVars = pg_logger.exec_script_str_local(
                source + '\n\n' + testCase,
                False, # raw_input_lst_json,
                False, # cumulative,
                False, # heapPrimitives,
                finalizer)
            toPickle['traces'].append(traceMunger(trace))
            toPickle['args'].append(args)
            toPickle['returnVars'].append(returnVars)

        # toPickle = dict(zip(('trace', 'args', 'returnVars'), loggerOutput))
        # pprint.pprint(toPickle['trace'])
        # toPickle['trace'] = traceMunger(toPickle['trace'])

        # Flatten single-element lists into singletons for backwards compatability
        if len(toPickle['traces']) == 1:
            toPickle['trace'] = toPickle['traces'][0]
            del toPickle['traces']
            toPickle['args'] = toPickle['args'][0]
            toPickle['returnVars'] = toPickle['returnVars'][0]

        pickleFilePath = path.join(pickleDest, solNum + '.pickle')
        try:
            with open(pickleFilePath, 'w') as f:
                pickle.dump(toPickle, f)
        except pickle.PicklingError:
            if stopOnError: raise
            os.remove(pickleFilePath)
            skipped.append(solNum)
    return skipped

def preprocess_pipeline_data(folderOfData,
                             testCaseSrc,
                             tidier=defaultTidier,
                             testedFunctionName='test',
                             formatter=defaultFormatter,
                             finalizer=None,
                             traceMunger=defaultTraceMunger):
    tidyDataPath = path.join(folderOfData, 'tidyData')
    formatPath = path.join(folderOfData, 'tidyDataHTML')
    testCaseDataPath = path.join(folderOfData, 'tidyDataWithTestCase')
    picklePath = path.join(folderOfData, 'pickleFiles')

    if finalizer == None:
        finalizer = make_default_finalizer(testedFunctionName)

    ensure_folder_exists(testCaseDataPath)
    with open(testCaseSrc, 'r') as f:
        testCases = [line.strip() for line in f if line.startswith(testedFunctionName)]
        # rawTestCases = f.read().split('\n')
    print "testCases:", testCases
    if testCases == []:
        raise ValueError("No test cases matching the given function name")

    skipped_tidy = []
    skipped_format = []
    skipped_logger = []
    if tidier:
        skipped_tidy = tidy(tidier, folderOfData, tidyDataPath, testedFunctionName)
    if formatter:
        skipped_format = format(formatter, tidyDataPath, formatPath)


    # if testCases:
    #     add_test_case(testCases, tidyDataPath, testCaseDataPath)
    skipped_logger = run_logger(tidyDataPath, testCases, picklePath, finalizer=finalizer, traceMunger=traceMunger)

    print "Solutions skipped:", len(skipped_tidy) + len(skipped_format) + len(skipped_logger)
    if skipped_tidy:
        print "SKIPPED BY TIDIER:"
        pprint.pprint(skipped_tidy, indent=2)
    if skipped_format:
        print "SKIPPED BY FORMATTER:"
        pprint.pprint(skipped_format, indent=2)
    if skipped_logger:
        print "SKIPPED BY LOGGER:"
        pprint.pprint(skipped_logger, indent=2)
