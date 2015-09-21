import os
import pickle
import shutil
import unittest


from pipeline_defaults_python import make_default_finalizer
from pipeline_preprocessing import preprocess_pipeline_data as preprocess
# folderOfData, testcase, tidier=..., testFnName=..., formatter=..., finalizer=...

def id_finalizer(input_code, output_trace):
    return output_trace

def wrap_finalizer_with_dumper(finalizer, fname):
    def dump_finalizer(input_code, output_trace):
        result = finalizer(input_code, output_trace)

        with open(fname, 'w') as f:
            pickle.dump(result, f)

        return result
    return dump_finalizer

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
        with open('./test/results_identity_finalizer.pickle', 'r') as f:
            expectedTrace = pickle.load(f)
        test_finalizer = self.make_testing_finalizer(expectedTrace)

        preprocess(TEST_DIR_PATH,
                   'testMe(1, 2)',
                   finalizer=test_finalizer,
                   traceMunger=id_munger)

    def test_defaultFinalizer(self):
        with open('./test/results_identity_finalizer.pickle', 'r') as f:
            traceToFinalize = pickle.load(f)
        with open('./test/results_elena_finalizer.pickle', 'r') as f:
            expected = pickle.load(f)

        finalizer = make_default_finalizer('testMe')
        # arguments are input_code, output_trace
        actual = finalizer('', traceToFinalize)

        self.assertEqual(actual, expected)

if __name__ == '__main__':
    # preprocess('./test/testData', 'testMe(1,2)', finalizer=id_finalizer, traceMunger=id_munger)
    unittest.main();
