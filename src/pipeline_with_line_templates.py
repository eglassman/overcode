### Elena's Rewrite of Stacey's Pipeline Implementation, using Line Templates as an internal representation

#standard utilities
import cgi
from collections import Counter
import json
import os
from os import path
import pickle
import pprint
import re
import types

#custom utilities
from external import identifier_renamer #philip's variable renamer
from pipeline_util import ensure_folder_exists #rob's helper

#class definitions
import line_class
from solution_class import Solution
import stack_class

#import functions
from variable_sequence_extraction import extract_and_collect_var_seqs

###############################################################################
## Dump output
###############################################################################

#from: http://stackoverflow.com/questions/8230315/python-sets-are-not-json-serializable
#and http://stackoverflow.com/questions/624926/how-to-detect-whether-a-python-variable-is-a-function
class ElenaEncoder(json.JSONEncoder):
    def default(self, obj):
       if isinstance(obj, set):
          return {'type':'set', 'list':list(obj)}
       if isinstance(obj, types.FunctionType):
          return {'type':'function'}
       return json.JSONEncoder.default(self, obj)

###############################################################################
## Load preprocessed data
###############################################################################
def populate_from_pickles(all_solutions, pickleSrc):
    """
    Load program traces, args and return variables from pickle files as
    created by the pipeline preprocessor. Create a Solution instance for
    each pickle file and add them to all_solutions.

    all_solutions: list to add solutions to
    pickleSrc: string, path to directory containing pickle files
    
    mutates all_solutions
    """

    print "Loading data"
    for filename in os.listdir(pickleSrc):
        solnum = filename.split('.')[0]
        # print solnum

        with open(path.join(pickleSrc, filename), 'r') as f:
            unpickled = pickle.load(f)

        sol = Solution(solnum,
                       unpickled['trace'],
                       unpickled['args'],
                       unpickled['returnVars'])

        all_solutions.append(sol)


###############################################################################
## Run the pipeline!
###############################################################################
def run(folderOfData, destFolder):
    ensure_folder_exists(destFolder)
    def dumpOutput(data, filename, sort_keys=True, indent=4):
        filepath = path.join(destFolder, filename)
        with open(filepath, 'w') as f:
            json.dump(data, f, sort_keys=sort_keys, indent=indent, cls=ElenaEncoder)

    # Load solutions
    all_solutions = []
    populate_from_pickles(all_solutions, path.join(folderOfData, 'pickleFiles'))
    #dumpOutput(all_solutions,'all_solutions.json')
    for sol in all_solutions:
        pprint.pprint(sol.getDict())

    # Collect variables into AbstractVariables
    all_abstracts = []
    skipped_extract_sequences = extract_and_collect_var_seqs(all_solutions, all_abstracts)
    #print all_abstracts
    for absvar in all_abstracts:
        pprint.pprint(absvar.getDict())
