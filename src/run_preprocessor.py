#!/usr/bin/python
import argparse
from os import path

import pipeline_preprocessing
import pipeline

parser = argparse.ArgumentParser()
parser.add_argument('datadir', help='Path to the directory containing the data')
parser.add_argument('testcase',
    help='Testcase, as a file path (default) or a string (with the -s option)')
parser.add_argument('funcname', help='The name of the tested function')
parser.add_argument('-s', action='store_true', dest='testcaseIsStr',
    help='Indicates that the testcase was given directly as a string.')
parser.add_argument('-p', '--run-pipeline', action='store_true',
    help='Run the full pipeline as well')

args = parser.parse_args()
if args.testcaseIsStr:
    testcase = args.testcase
else:
    with open(args.testcase, 'r') as f:
        testcase = f.read()

pipeline_preprocessing.preprocess_pipeline_data(
    args.datadir,
    testcase,
    testedFunctionName=args.funcname
)

if args.run_pipeline:
    outputPath = path.normpath(path.join(args.datadir, '../output'))
    pipeline.run(args.datadir, outputPath)
