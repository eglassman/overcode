import argparse
import json
from os import path
import pprint

import pipeline_preprocessing
import pipeline_old
import pipeline

###############################################################################
## NOTES
###############################################################################
# From the command line, run 'python run_pipeline.py -h' or
# 'python run_pipeline.py --help' for a description of how to run the pipeline
# and/or preprocessor.
###############################################################################


# Add possible options to the command line interface
parser = argparse.ArgumentParser()
parser.add_argument('basedir', metavar='TARGET_DIR',
    help='Path to a directory containing a data subdirectory and a testCase.py file')

# preprocessor & arguments
parser.add_argument('-P', '--run-pre', action='store_true',
    help='Run the preprocessor.')
parser.add_argument('-n', '--funcname', default='test', metavar='NAME',
    help='The name of the function that is being tested. Calls to the named ' +
         'function will be removed from student code during the tidying step ' +
         'in the preprocessor.')
parser.add_argument('-j', '--json',
    help='The name of the JSON file that contains the python files and tests.')

# pipeline & arguments
parser.add_argument('-p', '--run-pipeline', action='store_true',
    help='Run the analysis pipeline. Will not work if the preprocessor has ' +
         'never been run.')
parser.add_argument('-g', '--grader-path',
    help='Path to an MITx grader, including the grade_*.py part. Used to ' +
         'check correctness of student code in the pipeline.')
parser.add_argument('-d', '--distances', action='store_true',
    help='Include to calculate pairwise distances between all stacks.')
parser.add_argument('-t', '--output-only', action='store_true',
    help='Include to only calculate output during pre-processing pipeline.')

parser.add_argument('-o', '--run-old', action='store_true',
    help='Run the old pipeline. Legacy, not maintained.')

args = parser.parse_args()

# The data subdirectory
datadir = path.join(args.basedir, 'data')

testcasePath = path.join(args.basedir, 'testCase.py')

if args.json:
    jsonPath = path.join(args.basedir, args.json)
    print jsonPath
else:
    jsonPath = False

print datadir
print testcasePath


#import sys
#sys.exit(1)

# preprocess
if args.run_pre:
    if args.output_only: print 'only output traced'
    pipeline_preprocessing.preprocess_pipeline_data(
        datadir,
        testcasePath,
        args.output_only,
        args.funcname,
        jsonPath
    )

if args.run_pipeline or args.run_old:

    if args.run_pipeline:
        if args.json:
            outputPath = jsonPath
        else:
            outputPath = path.join(args.basedir, 'output')
        if args.grader_path:
            pipeline.set_grader(args.grader_path)
        pipeline.run(datadir, outputPath, args.distances)
    else:
        # The old, original pipeline. Here there be dragons.
        outputPath = path.join(args.basedir, 'output_old')
        pipeline_old.run(datadir, outputPath)
