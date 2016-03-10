import argparse
import json
from os import path
import pprint

import pipeline_preprocessing
import pipeline_old
import pipeline

parser = argparse.ArgumentParser()
parser.add_argument('basedir', help='Path to the base directory')
parser.add_argument('grader_path', help='Path to the grader for this problem')
parser.add_argument('-n', '--funcname', default='test',
    help='The name of the tested function')
parser.add_argument('-p', '--run-pipeline', action='store_true',
    help='Run the full pipeline with the given key')
parser.add_argument('-P', '--run-pre', action='store_true',
    help='Flag: run the preprocessor. Must specify a function name with -n as well.')
parser.add_argument('-o', '--run-old', action='store_true',
    help='Run the old pipeline with the given key')

args = parser.parse_args()

datadir = path.join(args.basedir, 'data')

# preprocess
# testcasePath = path.join(args.basedir, 'testCase.py')
if args.run_pre:
    pipeline_preprocessing.preprocess_pipeline_data(
        datadir,
        args.grader_path,
        args.funcname
    )

if args.run_pipeline or args.run_old:
    # # read correct output
    # with open(path.join(args.basedir, 'correctOutput.py'), 'r') as f:
    #     raw_correct_output = f.read()
    # if pprint.isreadable(raw_correct_output):
    #     correctOutput = eval(raw_correct_output)
    # else:
    #     raise ValueError("No readable correct output found")

    if args.run_pipeline:
        outputPath = path.join(args.basedir, 'output')
        # pipeline.run(datadir, outputPath, correctOutput)
        pipeline.run(datadir, outputPath)
    else:
        # The old, original pipeline. Here there be dragons.
        outputPath = path.join(args.basedir, 'output_old')
        pipeline_old.run(datadir, outputPath)
