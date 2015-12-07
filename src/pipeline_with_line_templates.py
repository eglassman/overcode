### Elena's Rewrite of Stacey's Pipeline Implementation, using Line Templates as an internal representation

import cgi
from collections import Counter
import json
import os
from os import path
import pickle
import pprint
import re

from external import identifier_renamer
from pipeline_util import ensure_folder_exists

import solution_class
import line_class
import variable_instance_class