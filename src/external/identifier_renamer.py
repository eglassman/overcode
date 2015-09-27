# This file exports a single function:
#
#   rename_identifier(src_code, id_name, new_id_name)
#
# src_code    -- string representing source code of a syntactically-correct
#                Python program (will give SyntaxError if not parseable)
# id_name     -- identifier to rename
# new_id_name -- the string to rename it to. it's the caller's
#                responsibility to confirm that this is a legal
#                Python identifier
#
# returns a new string similar to  src_code except with ALL OCCURRENCES
# of id_name renamed to new_id_name

__all__ = ['rename_identifier', 'rename_identifier_JSON_version']


import ast
import ast_extents
from collections import defaultdict
import json

class FindIdentifierVisitor(ast.NodeVisitor):
    def __init__(self, id_name):
        self.id_name = id_name
        # each element is a (line number, column number) pair,
        # with line numbers starting at 1
        self.locs = []

    def visit_Name(self, node):
        #print 'Name:', node.id, node.lineno, node.start_col
        if node.id == self.id_name:
            self.locs.append((node.lineno, node.start_col))


def rename_identifier(src_code, id_name, new_id_name):
    obj = ast_extents.CodeAst(src_code)

    new_codelines = obj.code_lines[:] # COPY the original list

    v = FindIdentifierVisitor(id_name)
    v.visit(obj.ast_root)

    lines = src_code

    #print 'id =', id_name

    # transform one line at a time, but remember that each replacement
    # can change subsequent indices by bloating them up (or shrinking)
    orig_len = len(id_name)
    new_len = len(new_id_name)
    delta_len = new_len - orig_len

    #print 'delta_len =', delta_len

    # Key: line number
    # Value: list of column numbers
    line_col_occurrences = defaultdict(list)

    for line, col in v.locs:
        line_col_occurrences[line].append(col)

    # sort columns so that we always traverse from left to right.
    # otherwise our index adjustment procedure won't work.
    for v in line_col_occurrences.values():
        v.sort()

    # Key: line number
    # Value: column index delta
    line_col_index_deltas = defaultdict(int)

    for line in sorted(line_col_occurrences.keys()):
        #print
        #print 'LINE:', line, line_col_occurrences[line]
        for col in line_col_occurrences[line]:
            adjusted_col = col + line_col_index_deltas[line]

            orig_line = new_codelines[line]
            new_line = orig_line[:adjusted_col] + new_id_name + orig_line[adjusted_col+orig_len:]

            new_codelines[line] = new_line # MUTATES obj.code_lines

            #print line, col, adjusted_col, '\t', new_line
            line_col_index_deltas[line] += delta_len

    assert new_codelines[0] == '' # sentinel
    new_codelines.pop(0) # pop it off
    return '\n'.join(new_codelines)


# alternative experimental approach -- use the JSON format to do the renaming
def rename_identifier_JSON_version(src_code, id_name, new_id_name):
    obj = ast_extents.CodeAst(src_code)
    obj_json = obj.to_renderable_json(ignore_id=True)

    obj_dict = json.loads(obj_json)

    #print obj_json
    #print '---'

    outbuf = []

    def render(o):
        if type(o) is dict:
            try:
                c = o["contents"]
                for elt in c:
                    if type(elt) is dict:
                        render(elt)
                    else:
                        assert type(elt) is unicode
                        outbuf.append(elt)
            except KeyError:
                v = o["value"]
                assert type(v) is unicode

                # renamer:
                if o["type"] == 'Name' and v == id_name:
                    outbuf.append(new_id_name)
                else:
                    outbuf.append(v)

    render(obj_dict)

    return ''.join(outbuf)


TEST_PROGRAM = '''
# This nasty program contains
# 24 total identifiers, with 13 occurrences of 'i'
i=10
for i in range(len(x)):
    print foo(i, i(_i(i(_i(i)))), i**2, 3+i)
    print bar(i)
    print(_i, __i,i,ii,iii, 'i', "i", """i""") # i's in strings not renamed
i += i**i

# let's rename every 'i' to 'elena'
# i i i i i i i i should not be renamed!
'''

import sys
if __name__ == "__main__":
    code_str = open(sys.argv[1], 'U').read() #opening with universal newline format-thingy
    print rename_identifier(code_str, 'lett', 'elena')

    # experimental JSON version
    #print rename_identifier_JSON_version(code_str, 'i', 'elena')

