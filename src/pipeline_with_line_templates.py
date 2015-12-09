### Elena's Rewrite of Stacey's Pipeline Implementation, using Line Templates as an internal representation

#Notes to self
#run python run_pipeline.py ../../overcode_data/6.0001_dotprod/ -p any-string-will-do
#python run_pipeline.py ../../overcode_data/6.0001_dotprod/ -P -n dotProduct -p example1 if you need to regenerate the pickle files

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
from line_class import Line
from solution_class import Solution
from stack_class import Stack

#import functions
from variable_sequence_extraction import extract_and_collect_var_seqs

###############################################################################
## Dump output
###############################################################################

def add_to_setlist(elem,setlist):
    #print 'adding elem, setlist', elem, setlist
    if setlist==[]:
        setlist.append(elem)
    else:
        for listelem in setlist:
            #print 'comparing ',elem, listelem
            if elem == listelem:
                #print 'match'
                return
        setlist.append(elem)
            

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
## Process collection of abstract variables
###############################################################################

def find_canon_names(all_abstracts):
    """
    Assign canon names to all AbstractVariables by appending a modifier to
    the most common name if it collides with another name, or appending a
    double underscore if a variable is unique.

    all_abstracts: list of AbstractVariable instances

    mutates the elements of all_abstracts
    """

    # name -> (count, AbstractVariable)
    name_dict = {}
    uniques = []

    # Create a map from names to a list of (number of solutions using
    # that name, associated AbstractVariable instance) pairs
    for abstract in all_abstracts:
        if abstract.is_unique:
            uniques.append(abstract)
            continue
        name = abstract.most_common_name()
        count = len(abstract.solutions)
        if name not in name_dict:
            name_dict[name] = [(count, abstract)]
        else:
            name_dict[name].append((count, abstract))

    # For each name, assign modifiers if necessary in order of popularity
    for name in name_dict:
        # Sorting tuples uses the first element by default, no need to specify
        name_dict[name].sort(reverse=True)
        for i in range(len(name_dict[name])):
            count, abstract = name_dict[name][i]
            append = '' if i == 0 else '___' + str(i + 1)
            abstract.canon_name = name + append

    # Unique variables just get double underscores if they clash
    for unique in uniques:
        name = unique.most_common_name()
        if name in name_dict:
            unique.canon_name = name + '__'
        else:
            unique.canon_name = name

###############################################################################
## Process collection of lines
###############################################################################

class RenamerException(Exception):
    """A problem occurred while calling identifier_renamer."""

def compute_lines(sol, tidy_path, all_lines):
    with open(tidy_path, 'U') as f:
        renamed_src = f.read()

    #This code renames all variables as placeholders, and saves a mapping
    #from placeholder to original name and abstract variable object
    mappings = {}
    ctr = 0
    for lvar in sol.local_vars:
        placeholder = '___' + str(ctr) + '___'
        try:
            renamed_src = identifier_renamer.rename_identifier(
                renamed_src, lvar.local_name, placeholder)
        except:
            raise RenamerException('Failed to rename ' + str(sol.solnum))

        ctr += 1

        mappings[placeholder] = (lvar.local_name, lvar.abstract_var)
    #print mappings

    #This code breaks solutions down into line objects
    raw_lines = renamed_src.split('\n')
    for raw_line in raw_lines:
        stripped_line = raw_line.strip()

        #ignore empty lines
        if stripped_line == '':
            continue
        indent = len(raw_line) - len(stripped_line)

        blanks = re.findall(r'___\d___', stripped_line)
        #print 'blanks',blanks
        local_names, abstract_variables = zip(*[mappings[blank] for blank in blanks])
        #print local_names, abstract_variables

        template = re.sub(r'___\d___', '___', stripped_line)
        
        this_line_as_general_line = Line(template, abstract_variables, indent);
        this_line_in_solution = (this_line_as_general_line, local_names);
        
        sol.lines.append( this_line_in_solution );

        #print 'adding ',this_line_as_general_line,' to all_lines'
        add_to_setlist(this_line_as_general_line,all_lines)

    
    #print [l for l in sol.lines]
    #print all_lines

def compute_all_lines(all_solutions,folderOfData,all_lines):
    skipped = []
    for sol in all_solutions:
        tidy_path = path.join(folderOfData, 'tidyData', sol.solnum + '.py')
        try:
            print "Computing lines for", sol.solnum
            compute_lines(sol, tidy_path,all_lines)
            print 'length of lines ',len(all_lines)
        except RenamerException:
            skipped.append(sol.solnum)

    return skipped

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
    # for sol in all_solutions:
    #     pprint.pprint(sol.getDict())

    # Collect variables into AbstractVariables
    all_abstracts = []
    skipped_extract_sequences = extract_and_collect_var_seqs(all_solutions, all_abstracts)
    #print all_abstracts
    #for absvar in all_abstracts:
    #    pprint.pprint(absvar.getDict())

    find_canon_names(all_abstracts)
    # for absvar in all_abstracts:
    #     pprint.pprint(absvar.getDict())

    all_lines = []
    skipped_by_renamer = compute_all_lines(all_solutions,folderOfData,all_lines)

    for line in all_lines:
        pprint.pprint(line.getDict())

    all_templates = []
    for line in all_lines:
        add_to_setlist(line.template,all_templates)

    template_dict = {}
    for template in all_templates:
        #print template
        hand_made_counter = {};
        for sol in all_solutions:
            for line in sol.lines:
                line_object = line[0]
                if line_object.template==template:
                    #print sol.solnum,line
                    in_hand_made_counter = False
                    for line_key, count in hand_made_counter.iteritems():
                        if line_key == line_object:
                            hand_made_counter[line_key]+=1
                            in_hand_made_counter = True
                    if not(in_hand_made_counter):
                        hand_made_counter[line_object] = 1
                    #template_dict[template][line[0]] += 1

        template_dict[template] = hand_made_counter


    # for sol in all_solutions:
    #     pprint.pprint(sol.getDict())
    #pprint.pprint(all_solutions[0].getDict())
    print 'template_dict'
    #pprint.pprint(template_dict)
    for template,count_dict in template_dict.iteritems():
        print ''
        print 'template'
        print template
        print ':'
        print pprint.pprint(count_dict)

    
