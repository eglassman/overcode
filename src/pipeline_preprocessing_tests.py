import os
import shutil
import unittest

import pprint
import json

from pipeline_preprocessing import preprocess_pipeline_data as preprocess
# folderOfData, testcase, tidier=..., testFnName=..., formatter=..., finalizer=...

def id_finalizer(input_code, output_trace):
    # pprint.pprint(output_trace)
    return output_trace

def dump_finalizer(input_code, output_trace):
    # pprint.pprint(output_trace)
    with open('./test/trace_from_id_finalizer.json', 'w') as f:
        json.dump(output_trace, f, encoding='ascii')
    return output_trace

def id_munger(trace):
    return trace

TEST_DIR_PATH = './test/testData'
TEST_FILE_PATH = './test/testMe000.py'

class TestPreprocessor(unittest.TestCase):
    def setUp(self):
        os.mkdir(TEST_DIR_PATH)
        shutil.copy(TEST_FILE_PATH, TEST_DIR_PATH)

    def tearDown(self):
        shutil.rmtree(TEST_DIR_PATH)

    def make_testing_finalizer(self, expectedTrace):
        def finalizer(input_code, output_trace):
            # Hack: objects that have been serialized, like the expected
            # trace, are not always equal to the original object. So
            # serialize and deserialize the actual trace as well so that
            # they can be compared. This assumes that serializing and
            # deserializing always work the same, which is probably a bad
            # assumption.
            # TODO: Fix this
            actual_trace = json.loads(json.dumps(output_trace))

            self.assertEqual(actual_trace, expectedTrace)
            return output_trace
        return finalizer

    def test_loggerProducesCorrectTrace(self):
        with open('./test/trace_from_id_finalizer.json', 'r') as f:
            expectedTrace = json.load(f, encoding='ascii')
        test_finalizer = self.make_testing_finalizer(expectedTrace)

        preprocess(TEST_DIR_PATH,
                   'testMe(1, 2)',
                   finalizer=test_finalizer,
                   traceMunger=id_munger)

if __name__ == '__main__':
    # preprocess('./test/testData', 'testMe(1,2)', finalizer=id_finalizer, traceMunger=id_munger)
    unittest.main();
