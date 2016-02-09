import argparse
import json
from os import path
import pprint

import pipeline_preprocessing
import pipeline_old
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
parser.add_argument('-o', '--run-old',
    help='Run the old pipeline with the given key')

args = parser.parse_args()

defaultTestcasePath = path.join(args.basedir, 'testCase.py')
if args.testcase:
    if args.testcaseIsStr:
        with open(defaultTestcasePath, 'w') as f:
            f.write(args.testcase + '\n')
        testcasePath = defaultTestcasePath
    else:
        testcasePath = args.testcase
else:
    testcasePath = defaultTestcasePath

datadir = path.join(args.basedir, 'data')

if args.run_pre:
    pipeline_preprocessing.preprocess_pipeline_data(
        datadir,
        testcasePath,
        args.funcname
    )

with open(path.join(args.basedir, 'correctOutput.py'), 'r') as f:
    raw_correct_output = f.read()
if pprint.isreadable(raw_correct_output):
    correctOutput = eval(raw_correct_output)
else:
    raise ValueError("No readable correct output found")

if args.run_pipeline or args.run_old:
    if args.run_old:
        outputPath = path.join(args.basedir, 'output_old')
        pipeline_old.run(datadir, outputPath)
        key = args.run_old
    else:
        outputPath = path.join(args.basedir, 'output')
        pipeline.run(datadir, outputPath, correctOutput)
        key = args.run_pipeline

    # write config
    # configPath = '../ui/config.json'
    # with open(configPath, 'r') as f:
    #     conf = json.load(f)

    # unqualifiedBasedir = path.basename(args.basedir.rstrip('/'))
    # conf['base_dirs'][key] = unqualifiedBasedir

    # with open(configPath, 'w') as f:
    #     json.dump(conf, f, indent=4)
