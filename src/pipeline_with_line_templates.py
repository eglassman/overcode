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

#custom utilities
from external import identifier_renamer #philip's variable renamer
from pipeline_util import ensure_folder_exists #rob's helper

#class definitions
import variable_instance_class
import abstract_variable_class
import line_class
import solution_class
import stack_class

