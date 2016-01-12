from os import path
import json
import shutil
import unittest

from pipeline_preprocessing import preprocess_pipeline_data
import pipeline
from test import comparators

# TEST_DIR_PATH = '/Users/elena/publicCodeRepos/overcode_tests'
TEST_DIR_PATH = '../../overcode_data/official_test_data'
# Set to True to delete the output from the pipeline after the test.
remove_output = False
always_preprocess = True

class TestPipeline(unittest.TestCase):
    def setUp(self):
        # Run preprocessing if it hasn't been run already
        try:
            fpath = path.join(TEST_DIR_PATH, 'data', 'pickleFiles', '201409170154260000.pickle')
            with open(fpath, 'r') as f:
                pass
        except IOError:
            pass
        else:
            # Already preprocessed, but if we want to preprocess again anyway,
            # then do not return.
            if not always_preprocess:
                return
        folderOfData = path.join(TEST_DIR_PATH, 'data')
        testCasePath = path.join(TEST_DIR_PATH, 'testCase.py')
        preprocess_pipeline_data(folderOfData, testCasePath, 'dotProduct')

    def tearDown(self):
        if remove_output:
            shutil.rmtree(path.join(TEST_DIR_PATH, 'output'))

    def test_finalResults(self):
        output_path = path.join(TEST_DIR_PATH, 'output')
        pipeline.run(path.join(TEST_DIR_PATH, 'data'), output_path)

        mocksPath = './test/jsonMocks'
        comparators.assertStackMembersEqual(mocksPath, output_path)
        # The rendering of phrases is inconsistent, so do not compare them for now
        # comparators.assertPhrasesEqual(mocksPath, output_path)
        # TODO: un-hardcode this testcase
        comparators.assertVariablesEqualUnderTestcase(
            mocksPath, output_path, 'dotProduct([1, 2, 3], [4, 5, 6])')

if __name__ == '__main__':
    unittest.main()
