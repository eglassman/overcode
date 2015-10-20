import json

def compare(path1, path2):
    with open(path1, 'r') as f:
        data1 = json.load(f)
    with open(path2, 'r') as f:
        data2 = json.load(f)

    def extract_members(sol):
        return frozenset(sol['members'])

    sets1 = set(map(extract_members, data1))
    sets2 = set(map(extract_members, data2))
    return (sets1 - sets2, sets2 - sets1)

def assertStackMembersEqual(path1, path2):
    in1not2, in2not1 = compare(path1, path2)
    # Both sets should be empty
    assert not in1not2
    assert not in2not1

def pretty_print(path1, path2):
    in1not2, in2not1 = compare(path1, path2)
    print "In 1 not 2:"
    pprint.pprint(map(list, list(in1not2)))
    print "******"
    print "In 2 not 1:"
    pprint.pprint(map(list, list(in2not1)))

if __name__ == '__main__':
    import sys
    import pprint
    pretty_print(sys.argv[1], sys.argv[2])
