#!/usr/bin/python
import argparse
import json
from os import path

import pipeline_preprocessing
import pipeline

parser = argparse.ArgumentParser()
parser.add_argument('basedir', help='Path to the base directory')
parser.add_argument('-t', '--testcase',
    help='Testcase, as a file path (default) or a string (with the -s option). ' +
         'If not included, assumes the test case path is <basedir>/testCase.py')
parser.add_argument('-n', '--funcname', default='test',
    help='The name of the tested function')
parser.add_argument('-s', action='store_true', dest='testcaseIsStr',
    help='Indicates that the testcase was given directly as a string.')
parser.add_argument('-p', '--run-pipeline',
    help='Run the full pipeline with the given key')
parser.add_argument('-P', '--run-pre', action='store_true',
    help='Flag: run the preprocessor')

args = parser.parse_args()

if args.testcase and args.testcaseIsStr:
    testcase = args.testcase
else:
    if args.testcase:
        testcasePath = args.testcase
    else:
        testcasePath = path.join(args.basedir, 'testCase.py')

    with open(testcasePath, 'r') as f:
        testcase = f.read()

datadir = path.join(args.basedir, 'data')

if args.run_pre:
    pipeline_preprocessing.preprocess_pipeline_data(
        datadir,
        testcase,
        testedFunctionName=args.funcname
    )
if args.run_pipeline:
    outputPath = path.join(args.basedir, 'output')
    pipeline.run(datadir, outputPath)

    # write config
    configPath = '../ui/config.json'
    with open(configPath, 'r') as f:
        conf = json.load(f)

    key = args.run_pipeline
    unqualifiedBasedir = path.basename(args.basedir.rstrip('/'))
    conf['base_dirs'][key] = unqualifiedBasedir

    with open(configPath, 'w') as f:
        json.dump(conf, f, indent=4)
