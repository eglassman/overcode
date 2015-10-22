import json
from os import path

def _do_compare(path1, path2, fname, extraction_fn):
    with open(path.join(path1, fname + '.json'), 'r') as f:
        data1 = json.load(f)
    with open(path.join(path2, fname + '.json'), 'r') as f:
        data2 = json.load(f)

    sets1 = set(map(extraction_fn, data1))
    sets2 = set(map(extraction_fn, data2))
    return (sets1 - sets2, sets2 - sets1)


def compare_solutions(path1, path2):
    def extract_members(sol):
        return frozenset(sol['members'])
    return _do_compare(path1, path2, 'solutions', extract_members)

def assertStackMembersEqual(path1, path2):
    in1not2, in2not1 = compare_solutions(path1, path2)
    # Both sets should be empty
    assert not in1not2, "Path1 contains extra stacks"
    assert not in2not1, "Path2 contains extra stacks"


def compare_variables(path1, path2):
    def make_hashable(seq):
        if isinstance(seq, list):
            return tuple(make_hashable(el) for el in seq)
        else:
            return seq

    def extract_seq_and_name(var):
        return (make_hashable(var['sequence']), var['varName'])

    return _do_compare(path1, path2, 'variables', extract_seq_and_name)

def assertNoMissingVariables(old, new):
    in1not2, in2not1 = compare_variables(old, new)
    # We don't care if the new one has more
    assert not in1not2, "Missing variables found"

def assertVariablesEqual(old, new):
    in1not2, in2not1 = compare_variables(old, new)
    # Both sets should be empty
    assert not in1not2, "Path1 contains extra variables"
    assert not in2not1, "Path2 contains extra variables"


def compare_phrases(path1, path2):
    def extract_code_and_indent(phrase):
        return (phrase['code'], phrase['indent'])
    return _do_compare(path1, path2, 'phrases', extract_code_and_indent)

def assertPhrasesEqual(path1, path2):
    in1not2, in2not1 = compare_phrases(path1, path2)
    # Both sets should be empty
    assert not in1not2, "Path1 contains extra phrases"
    assert not in2not1, "Path2 contains extra phrases"


def pretty_print(path1, path2, fn):
    in1not2, in2not1 = fn(path1, path2)
    print "******"
    print "In 1 not 2:"
    pprint.pprint(map(list, list(in1not2)))
    print "------"
    print "In 2 not 1:"
    pprint.pprint(map(list, list(in2not1)))
    print "******"

if __name__ == '__main__':
    import sys
    import pprint
    print "Solutions"
    pretty_print(sys.argv[1], sys.argv[2], compare_solutions)
    print "Variables"
    pretty_print(sys.argv[1], sys.argv[2], compare_variables)
    print "Phrases"
    pretty_print(sys.argv[1], sys.argv[2], compare_phrases)
