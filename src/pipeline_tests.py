from os import path
import json
import shutil
import unittest

from pipeline_preprocessing import preprocess_pipeline_data
import fancy_pipeline as pipeline
from test import comparators

# TEST_DIR_PATH = '/Users/elena/publicCodeRepos/overcode_tests'
TEST_DIR_PATH = '../../overcode_data/6.0001_dotprod'
# Set to True to delete the output from the pipeline after the test.
remove_output = False

class TestPipeline(unittest.TestCase):
    def setUp(self):
        # Run preprocessing if it hasn't been run already
        try:
            fpath = path.join(TEST_DIR_PATH, 'data', 'pickleFiles', '201409170154260000.pickle')
            with open(fpath, 'r') as f:
                pass
        except IOError:
            folderOfData = path.join(TEST_DIR_PATH, 'data')
            testCasePath = path.join(TEST_DIR_PATH, 'testCase.py')
            with open(testCasePath, 'r') as f:
                testCase = f.read()
            preprocess_pipeline_data(folderOfData, testCase, testedFunctionName='dotProduct')

    def tearDown(self):
        if remove_output:
            shutil.rmtree(path.join(TEST_DIR_PATH, 'output'))

    def test_finalResults(self):
        pipeline.run(path.join(TEST_DIR_PATH, 'data'), path.join(TEST_DIR_PATH, 'output'))

        mocksPath = './test/jsonMocks'
        comparators.assertStackMembersEqual(mocksPath, path.join(TEST_DIR_PATH, 'output'))
        comparators.assertPhrasesEqual(mocksPath, path.join(TEST_DIR_PATH, 'output'))
        comparators.assertNoMissingVariables(mocksPath, path.join(TEST_DIR_PATH, 'output'))

if __name__ == '__main__':
    unittest.main()
