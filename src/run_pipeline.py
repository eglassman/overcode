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
    help='Run the preprocessor. Must specify a function name with -n or ' +
         '--funcname as well.')
parser.add_argument('-n', '--funcname', default='test', metavar='NAME',
    help='The name of the function that is being tested. Required for tidying ' +
         'student code in the preprocessor.')

# pipeline & arguments
parser.add_argument('-p', '--run-pipeline', action='store_true',
    help='Run the analysis pipeline. Will not work if the preprocessor has ' +
         'never been run. Must specify a path to a grader with -g or ' +
         '--grader-path as well.')
parser.add_argument('-g', '--grader-path',
    help='Path to an MITx grader, including the grade_*.py part. Required ' +
         'for checking correctness of student code in the pipeline.')

parser.add_argument('-o', '--run-old', action='store_true',
    help='Run the old pipeline. Legacy, not maintained.')

args = parser.parse_args()

# The data subdirectory
datadir = path.join(args.basedir, 'data')

testcasePath = path.join(args.basedir, 'testCase.py')

# preprocess
if args.run_pre:
    pipeline_preprocessing.preprocess_pipeline_data(
        datadir,
        testcasePath,
        args.funcname
    )

if args.run_pipeline or args.run_old:

    if args.run_pipeline:
        outputPath = path.join(args.basedir, 'output')
        pipeline.set_grader(args.grader_path)
        pipeline.run(datadir, outputPath)
    else:
        # The old, original pipeline. Here there be dragons.
        outputPath = path.join(args.basedir, 'output_old')
        pipeline_old.run(datadir, outputPath)
