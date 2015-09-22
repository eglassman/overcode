import os
import shutil
import unittest

import pprint

from test.mocks import (
    defaultFinalizerResults,
    defaultMungerResults,
    unfinalizedLoggerResults,
)
from pipeline_defaults_python import make_default_finalizer
from pipeline_defaults_python import extract_var_info_from_trace as defaultMunger
from pipeline_defaults_python import tidy_non_oppia as defaultTidier

from pipeline_preprocessing import preprocess_pipeline_data as preprocess
# folderOfData, testcase, tidier=..., testFnName=..., formatter=..., finalizer=...

def id_finalizer(input_code, output_trace):
    return output_trace

def wrap_finalizer_with_dumper(finalizer, fname):
    def dump_finalizer(input_code, output_trace):
        result = finalizer(input_code, output_trace)

        # with open(fname, 'w') as f:
        #     pickle.dump(result, f)

        pprint.pprint(result)
        return result
    return dump_finalizer

def id_munger(trace):
    return trace


TEST_DIR_PATH = './test/testData'
TEST_FILE_PATH = './test/testMe000.py'

class TestPreprocessor(unittest.TestCase):
    """
    Most of these tests are actually unit tests for the default functions
    that the preprocessor uses rather than the actual preprocessor.
    Close enough.
    """

    def setUp(self):
        os.mkdir(TEST_DIR_PATH)
        shutil.copy(TEST_FILE_PATH, TEST_DIR_PATH)

    def tearDown(self):
        shutil.rmtree(TEST_DIR_PATH)

    def make_testing_finalizer(self, expectedTrace):
        def finalizer(_, actualTrace):
            self.assertEqual(actualTrace, expectedTrace)
            return actualTrace
        return finalizer

    @unittest.skip('Only used for generating test fixtures')
    def test_dumpStuff(self):
        dump_finalizer = wrap_finalizer_with_dumper(
            make_default_finalizer('testMe'),
            './test/results_elena_finalizer.pickle')
        # dump_finalizer = wrap_finalizer_with_dumper(
        #     id_finalizer,
        #     './test/results_identity_finalizer.pickle')
        preprocess(TEST_DIR_PATH,
                   'testMe(1, 2)',
                   finalizer=dump_finalizer,
                   traceMunger=id_munger)


    def test_loggerProducesCorrectTrace(self):
        test_finalizer = self.make_testing_finalizer(unfinalizedLoggerResults)
        preprocess(TEST_DIR_PATH,
                   'testMe(1, 2)',
                   finalizer=test_finalizer,
                   traceMunger=id_munger)

    def test_defaultFinalizer(self):
        finalizer = make_default_finalizer('testMe')
        # arguments are input_code, output_trace
        actualResults = finalizer('', unfinalizedLoggerResults)
        self.assertEqual(actualResults, defaultFinalizerResults)

    def test_defaultMunger(self):
        # The first element of the finalizer results is the trace
        actualResults = defaultMunger(defaultFinalizerResults[0])
        self.assertEqual(actualResults, defaultMungerResults)

    def test_defaultTidier(self):
        tidyDest = os.path.join(TEST_DIR_PATH, 'tidyData')
        os.mkdir(tidyDest)
        defaultTidier('testMe000.py',
                      TEST_DIR_PATH,
                      tidyDest,
                      'testMe')

        with open(os.path.join(tidyDest, 'testMe000.py'), 'r') as f:
            actual = f.read()
        expected = "def testMe(a,b):\n    return a+b\n"
        self.assertEqual(actual, expected)


if __name__ == '__main__':
    unittest.main();
