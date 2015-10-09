from os import path
import json
import shutil
import unittest

from pipeline_preprocessing import preprocess_pipeline_data
import pipeline

TEST_DIR_PATH = '/Users/elena/publicCodeRepos/overcode_tests'
# TEST_DIR_PATH = '../../overcode_data/6.0001_dotprod'
# Set to True to delete the output from the pipeline after the test.
remove_output = False

class TestPipeline(unittest.TestCase):
    def setUp(self):
        # Run preprocessing if it hasn't been run already
        try:
            fpath = path.join(TEST_DIR_PATH, 'data', 'pickleFiles', '2014170154260000.pickle')
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
        mocksPath = './test/jsonMocks'
        with open(path.join(mocksPath, 'phrases.json'), 'r') as f:
            expectedPhrases = json.load(f)
        with open(path.join(mocksPath, 'solutions.json'), 'r') as f:
            expectedSolutions = json.load(f)
        with open(path.join(mocksPath, 'variables.json'), 'r') as f:
            expectedVariables = json.load(f)

        # LOL
        pipeline.run()

        with open(path.join(TEST_DIR_PATH, 'output', 'phrases.json'), 'r') as f:
            actualPhrases = json.load(f)
        with open(path.join(TEST_DIR_PATH, 'output', 'solutions.json'), 'r') as f:
            actualSolutions = json.load(f)
        with open(path.join(TEST_DIR_PATH, 'output', 'variables.json'), 'r') as f:
            actualVariables = json.load(f)

        self.assertEqual(expectedPhrases, actualPhrases)
        self.assertEqual(expectedSolutions, actualSolutions)
        self.assertEqual(expectedVariables, actualVariables)

if __name__ == '__main__':
    unittest.main()
