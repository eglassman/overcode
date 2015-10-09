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

stopOnError = True
skippedSolutions = []

def tidy(tidyFn, dataSrc, tidyDest, testedFunctionName):
    ensure_folder_exists(tidyDest)
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
            skippedSolutions.append(solNum)

def format(formatFn, dataSrc, formatDest):
    ensure_folder_exists(formatDest)
    print "Formatting data"
    for filename in os.listdir(dataSrc):
        solNum = filename.split('.')[0]
        print solNum

        try:
            formatFn(filename, dataSrc, formatDest)
        except:
            if stopOnError: raise
            skippedSolutions.append(solNum)

def add_test_case(testCase, dataSrc, testCaseDest):
    ensure_folder_exists(testCaseDest)
    for filename in os.listdir(dataSrc):
        with open(path.join(dataSrc, filename), 'r') as f_in:
            with open(path.join(testCaseDest, filename), 'w') as f_out:
                f_out.write(f_in.read() + '\n\n' + testCase)


def run_logger(dataSrc, pickleDest, finalizer, traceMunger):
    print "Running logger"
    ensure_folder_exists(pickleDest)
    for filename in os.listdir(dataSrc):
        solNum = filename.split('.')[0]
        print solNum

        with open(path.join(dataSrc, filename), 'r') as f:
            raw_input_lst_json = False
            cumulative = False
            heapPrimitives = False

            # trace, args, returnVars = pg_logger.exec_script_str_local(
            loggerOutput = pg_logger.exec_script_str_local(
                f.read(),
                raw_input_lst_json,
                cumulative,
                heapPrimitives,
                finalizer)

        toPickle = dict(zip(('trace', 'args', 'returnVars'), loggerOutput))
        # pprint.pprint(toPickle['trace'])
        toPickle['trace'] = traceMunger(toPickle['trace'])

        with open(path.join(pickleDest, solNum + '.pickle'), 'w') as f:
            pickle.dump(toPickle, f)

def preprocess_pipeline_data(folderOfData,
                             testCase,
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

    if tidier: tidy(tidier, folderOfData, tidyDataPath, testedFunctionName)
    if formatter: format(formatter, tidyDataPath, formatPath)
    if testCase: add_test_case(testCase, tidyDataPath, testCaseDataPath)
    run_logger(testCaseDataPath, picklePath, finalizer=finalizer, traceMunger=traceMunger)

    print "Solutions skipped:", len(skippedSolutions)
    pprint.pprint(skippedSolutions, indent=2)
