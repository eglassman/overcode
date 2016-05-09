# Extra pieces of code that will be appended or prepended to student
# submissions. For simple test cases (just calls to a student function), use
# null_testcase_defs. For problems not involving classes, use the
# null_import_prefix.

null_import_prefix = ""
null_testcase_defs = ""

import_prefix = "from definitions import *\n\n"

##### applyF_filterG
testcase_defs_applyF_filterG = r"""
def test_0():
    '''
    Example test case from the exam
    '''
    def f(i):
        return i + 2
    def g(i):
        return i > 5
    L = [0, -10, 5, 6, -4]
    print applyF_filterG(L,f,g)
    print L

def test_1():
    '''
    Is the list mutated?
    '''
    def f(i):
        return i + 1
    def g(i):
        return i < 3
    L = [1,2,3]
    L_copy = L[:]
    applyF_filterG(L,f,g)
    print L != L_copy

def test_2():
    '''
    Test if function can handle a constant f
    '''
    def f(i):
        return 0
    def g(i):
        return i < 5
    L = [1,1,2,3,4,6]
    print applyF_filterG(L,f,g)
    print L

def test_3():
    '''
    Test a weird, convoluted function that maps elements to each other
    '''
    def f(i):
        if i == 0:
            return 3
        elif i == 1:
            return 2
        elif i == 2:
            return 1
        elif i == 3:
            return 0
        else:
            raise ValueError

    def g(i):
        return i < 2

    L = [0,1,2,3,1,2,3,3,1,3,1,3,0,2,1,3]
    print applyF_filterG(L,f,g)
    print L

def test_4():
    '''
    Test if the max of the list successfully changes after filtering
    '''
    def f(i):
        return i + 5
    def g(i):
        return i < 10
    L = [1,2,3,4,5,6,7,8,9]
    print "Previous max:", max(L)
    applyF_filterG(L,f,g)
    print "New max:", max(L)

def test_5():
    '''
    Test empty list as input
    '''
    def f(i):
        return i + 2
    def g(i):
        return i < 10
    L = []
    print applyF_filterG(L,f,g)
    print L

def test_6():
    '''
    Test empty list as output
    '''
    def f(i):
        return i + 5
    def g(i):
        return i > 100
    L = [1,2,3,-1,-2,-3]
    print applyF_filterG(L,f,g)
    print L

def test_7():
    '''
    Style Guide check.
    Does the student use "== False"?
    '''
    def f(i):
        return i + 4
    def g(i):
        return None # ha!
    L = [10,20,10,5]
    print applyF_filterG(L,f,g)
    print L

def test_8():
    '''
    Test the identity function
    '''
    def f(i):
        return i
    def g(i):
        return i < 3
    L = [1,2,3]
    print applyF_filterG(L,f,g)
    print L

def test_9():
    '''
    Try different mathematical operations
    '''
    def f(i):
        i = i / 2
        i = i ** 2
        return i
    def g(i):
        return i ** 2 < 81
    L = [6, 5, 7]
    print applyF_filterG(L,f,g)
    print L

"""

#### mitcampus
testcase_defs_mitcampus = r"""
def test_0():
    '''
    c = MITCampus(Location(1,2))
    print c.add_tent(Location(1,2))
    print c.add_tent(Location(0,0))
    print c.add_tent(Location(2,3))
    print c.add_tent(Location(2,3))
    print c.get_tents()
    '''
    c = MITCampus(Location(1,2))
    print c.add_tent(Location(1,2))
    print c.add_tent(Location(0,0))
    print c.add_tent(Location(2,3))
    print c.add_tent(Location(2,3))
    print c.get_tents()
def test_1():
    '''
    init campus with default tent loc
    c = MITCampus(Location(-1,-2))
    print sorted(c.get_tents())
    '''
    c = MITCampus(Location(-1,-2))
    print sorted(c.get_tents())
def test_2():
    '''
    init campus with a non-default tent loc
    c = MITCampus(Location(1,2),Location(10,20))
    print sorted(c.get_tents())
    '''
    c = MITCampus(Location(1,2),Location(10,20))
    print sorted(c.get_tents())
def test_3():
    '''
    init campus with non-default tent loc, then try adding multiple tents
    to that loc
    c = MITCampus(Location(1,2),Location(-1,-2))
    print c.add_tent(Location(1,2)) # this should actually work!
    print c.add_tent(Location(-1,-2))
    print c.add_tent(Location(-1,-2))
    print c.add_tent(Location(-1,-2))
    print c.add_tent(Location(-1,-2))
    print sorted(c.get_tents())
    '''
    c = MITCampus(Location(1,2),Location(-1,-2))
    print c.add_tent(Location(1,2)) # this should actually work!
    print c.add_tent(Location(-1,-2))
    print c.add_tent(Location(-1,-2))
    print c.add_tent(Location(-1,-2))
    print c.add_tent(Location(-1,-2))
    print sorted(c.get_tents())
def test_4():
    '''
    check if tents are sorted correctly (no two y coords are equal)
    c = MITCampus(Location(1,2), Location(0,1))
    print c.add_tent(Location(1,2))
    print c.add_tent(Location(2,3))
    print c.add_tent(Location(-1,-2))
    print c.add_tent(Location(-2,-3))
    print sorted(c.get_tents())
    '''
    c = MITCampus(Location(1,2), Location(0,1))
    print c.add_tent(Location(1,2))
    print c.add_tent(Location(2,3))
    print c.add_tent(Location(-1,-2))
    print c.add_tent(Location(-2,-3))
    print sorted(c.get_tents())

def test_5():
    '''
    check if tents are sorted correctly (at least two equal y coords)
    c = MITCampus(Location(1,2), Location(0,1))
    c.add_tent(Location(-1,2))
    c.add_tent(Location(1,-10))
    c.add_tent(Location(1,10))
    c.add_tent(Location(1,20))
    c.add_tent(Location(1,40))
    print sorted(c.get_tents())
    print check_if_x_sorted(c.get_tents())
    '''
    def extract_x_coord(loc_string):
        x_coord_str = loc_string[1:loc_string.index(',')]
        return float(x_coord_str)
    def check_if_x_sorted(output_list):
        for i in range(len(output_list)):
            if i == len(output_list)-1:
                #we're done. (this prevents an IndexError)
                return True
            if extract_x_coord(output_list[i]) > extract_x_coord(output_list[i+1]):
                return False
    c = MITCampus(Location(1,2), Location(0,1))
    c.add_tent(Location(-1,2))
    c.add_tent(Location(1,-10))
    c.add_tent(Location(1,10))
    c.add_tent(Location(1,20))
    c.add_tent(Location(1,40))
    print sorted(c.get_tents())
    print check_if_x_sorted(c.get_tents())
    
def test_6():
    '''
    check if add_tent allows adding a tent closer than 0.5
    c = MITCampus(Location(1,2), Location(3,1))
    print c.add_tent(Location(2.5,1))
    c = MITCampus(Location(1,2), Location(3,1))
    print c.add_tent(Location(2.49,1))
    c = MITCampus(Location(1,2), Location(3,1))
    print c.add_tent(Location(2.51,1))
    '''
    c = MITCampus(Location(1,2), Location(3,1))
    print c.add_tent(Location(2.5,1))

    c = MITCampus(Location(1,2), Location(3,1))
    print c.add_tent(Location(2.49,1))

    c = MITCampus(Location(1,2), Location(3,1))
    print c.add_tent(Location(2.51,1))

def test_7():
    '''
    check if add_tent allows adding a tent closer than 0.5
    again, but what disallows placement is the SECOND tent this time
    c = MITCampus(Location(1,2), Location(3,1))
    c.add_tent(Location(1,1))
    print c.add_tent(Location(1.5,1))
    c = MITCampus(Location(1,2), Location(3,1))
    c.add_tent(Location(1,1))
    print c.add_tent(Location(1.49,1))
    c = MITCampus(Location(1,2), Location(3,1))
    c.add_tent(Location(1,1))
    print c.add_tent(Location(1.51,1))
    '''
    c = MITCampus(Location(1,2), Location(3,1))
    c.add_tent(Location(1,1))
    print c.add_tent(Location(1.5,1))

    c = MITCampus(Location(1,2), Location(3,1))
    c.add_tent(Location(1,1))
    print c.add_tent(Location(1.49,1))

    c = MITCampus(Location(1,2), Location(3,1))
    c.add_tent(Location(1,1))
    print c.add_tent(Location(1.51,1))

def test_8():
    '''
    two equidistant tents from desired new tent_loc
    c = MITCampus(Location(1,2), Location(1,0))
    c.add_tent(Location(0,1))
    print c.add_tent(Location(0,0))
    '''
    c = MITCampus(Location(1,2), Location(1,0))
    c.add_tent(Location(0,1))
    print c.add_tent(Location(0,0))

def test_9():
    '''
    a new tent on top of the initial tent
    c = MITCampus(Location(1,2), Location(0,0))
    print c.add_tent(Location(0,0))
    '''
    c = MITCampus(Location(1,2), Location(0,0))
    print c.add_tent(Location(0,0))

def test_10():
    '''
    a new tent on top of a later-added tent
    c = MITCampus(Location(1,2), Location(0,0))
    c.add_tent(Location(10,10))
    print c.add_tent(Location(10,10))
    '''
    c = MITCampus(Location(1,2), Location(0,0))
    c.add_tent(Location(10,10))
    print c.add_tent(Location(10,10))

def test_11():
    '''
    does the "center" location count as a tent?
    try adding a tent there...
    c = MITCampus(Location(1,2), Location(0,0))
    print c.add_tent(Location(1,2))
    '''
    c = MITCampus(Location(1,2), Location(0,0))
    print c.add_tent(Location(1,2))

def test_12():
    '''
    Basic remove_tent test
    c = MITCampus(Location(1,2), Location(0,0))
    c.add_tent(Location(1,1))
    try:
        c.remove_tent(Location(1,1))
    except ValueError:
        print "ValueError received."
    else:
        print "Done!"
    '''
    c = MITCampus(Location(1,2), Location(0,0))
    c.add_tent(Location(1,1))
    try:
        c.remove_tent(Location(1,1))
    except ValueError:
        print "ValueError received."
    else:
        print "Done!"

def test_13():
    '''
    Test if remove_tent correctly throws ValueError
    c = MITCampus(Location(1,2), Location(0,0))
    try:
        c.remove_tent(Location(1,1))
    except ValueError:
        print "ValueError received."
    else:
        print "Done!"
    '''
    c = MITCampus(Location(1,2), Location(0,0))
    try:
        c.remove_tent(Location(1,1))
    except ValueError:
        print "ValueError received."
    else:
        print "Done!"

def test_14():
    '''
    can we remove the default tent?
    c = MITCampus(Location(1,2))
    try:
        c.remove_tent(Location(0,0))
    except ValueError:
        print "ValueError received."
    else:
        print "Done!"
    '''
    c = MITCampus(Location(1,2))
    try:
        c.remove_tent(Location(0,0))
    except ValueError:
        print "ValueError received."
    else:
        print "Done!"

def test_15():
    '''
    can we remove a non-default tent?
    c = MITCampus(Location(1,2), Location(10,10))
    try:
        c.remove_tent(Location(10,10))
    except ValueError:
        print "ValueError received."
    else:
        print "Done!"
    '''
    c = MITCampus(Location(1,2), Location(10,10))
    try:
        c.remove_tent(Location(10,10))
    except ValueError:
        print "ValueError received."
    else:
        print "Done!"

def test_16():
    '''
    can we remove the default tent when it is actually not there?
    c = MITCampus(Location(1,2), Location(10,10))
    try:
        c.remove_tent(Location(0,0))
    except ValueError:
        print "ValueError received."
    else:
        print "Done!"
    '''
    c = MITCampus(Location(1,2), Location(10,10))
    try:
        c.remove_tent(Location(0,0))
    except ValueError:
        print "ValueError received."
    else:
        print "Done!"
"""

##### deepreverse
testcase_defs_deepreverse = r"""
def run_code(L):
    deep_reverse(L)
    print L
"""


testcase_defs_newField = r"""
def test_init_1():
    a = NewField()
    print a

def test_getDrunks_1():
    a = NewField()
    d = sorted(a.getDrunks())
    for i in d:
        print i

def test_getDrunks_2():
    a = NewField()
    a.addDrunk(Drunk('a'), Location(0,0))
    d = sorted(a.getDrunks())
    for i in d:
        print i

def test_getDrunks_3():
    a = NewField()
    a.addDrunk(Drunk('a'), Location(0,0))
    a.addDrunk(Drunk('b'), Location(1,0))
    a.addDrunk(SoberDrunk('c'), Location(1,1))
    d = sorted(a.getDrunks())
    for i in d:
        print i

def test_moveDrunk_1():
    numDrunks = 1
    fld = NewField()
    origin = Location(0.0, 0.0)
    for i in range(numDrunks):
        d = SoberDrunk('Drunk' + str(i))
        fld.addDrunk(d, origin)
        d.setSteps([(1,1)])
    for step in range(len(d.steps)):
        for d in fld.getDrunks():
            fld.moveDrunk(d)
    distances = []
    for d in fld.getDrunks():
        distances.append(int(origin.distFrom(fld.getLoc(d))))
    print sorted(distances)

def test_moveDrunk_2():
    numDrunks = 1
    fld = NewField()
    origin = Location(0.0, 0.0)
    for i in range(numDrunks):
        d = SoberDrunk('Drunk' + str(i))
        fld.addDrunk(d, origin)
        d.setSteps([(1,0),(1,0),(1,0),(1,0)])
    for step in range(len(d.steps)):
        for d in fld.getDrunks():
            fld.moveDrunk(d)
    distances = []
    for d in fld.getDrunks():
        distances.append(int(origin.distFrom(fld.getLoc(d))))
    print sorted(distances)

def test_moveDrunk_3():
    numDrunks = 3
    fld = NewField()
    origin = Location(0.0, 0.0)
    d1 = SoberDrunk('Drunk1')
    fld.addDrunk(d1, origin)
    d1.setSteps([(1,0),(1,0),(1,0),(1,0)])
    d2 = SoberDrunk('Drunk2')
    fld.addDrunk(d2, origin)
    d2.setSteps([(1,0),(1,0),(1,0),(1,0)])
    for i in range(4):
        fld.moveDrunk(d1)
    for i in range(4):
        fld.moveDrunk(d2)
    distances = []
    for d in fld.getDrunks():
        distances.append(int(origin.distFrom(fld.getLoc(d))))
    print sorted(distances)

def test_moveDrunk_3():
    numDrunks = 3
    fld = NewField()
    origin = Location(0.0, 0.0)
    d1 = SoberDrunk('Drunk1')
    fld.addDrunk(d1, origin)
    d1.setSteps([(1,0),(1,0),(1,0),(1,0),(1,0),(1,0)])
    d2 = SoberDrunk('Drunk2')
    fld.addDrunk(d2, origin)
    d2.setSteps([(1,0),(1,0),(1,0),(1,0)])
    for i in range(4):
        fld.moveDrunk(d1)
    for i in range(4):
        fld.moveDrunk(d2)
    for i in range(2):
        fld.moveDrunk(d1)
    distances = []
    for d in fld.getDrunks():
        distances.append(int(origin.distFrom(fld.getLoc(d))))
    print sorted(distances)

def test_moveDrunk_4():
    numDrunks = 3
    fld = NewField()
    origin = Location(0.0, 0.0)
    d1 = SoberDrunk('Drunk1')
    fld.addDrunk(d1, origin)
    d1.setSteps([(1,0),(1,0),(1,0),(1,0),(1,0),(1,0)])
    d2 = SoberDrunk('Drunk2')
    fld.addDrunk(d2, origin)
    d2.setSteps([(1,0),(1,0),(1,0),(1,0)])
    d3 = SoberDrunk('Drunk3')
    fld.addDrunk(d3, origin)
    d3.setSteps([(1,0),(1,0),(1,0),(1,0),(1,0)])
    for i in range(4):
        fld.moveDrunk(d1)
    for i in range(4):
        fld.moveDrunk(d2)
    for i in range(2):
        fld.moveDrunk(d1)
    for i in range(5):
        fld.moveDrunk(d3)
    distances = []
    for d in fld.getDrunks():
        distances.append(int(origin.distFrom(fld.getLoc(d))))
    print sorted(distances)

def test_moveDrunk_5():
    numDrunks = 3
    fld = NewField()
    origin = Location(0.0, 0.0)
    d1 = SoberDrunk('Drunk1')
    fld.addDrunk(d1, origin)
    d1.setSteps([(1,0),(1,0),(1,0),(1,0),(1,0),(-1,0),(-1,0),(-1,0),(-1,0)])
    d2 = SoberDrunk('Drunk2')
    fld.addDrunk(d2, origin)
    d2.setSteps([(1,0),(1,0),(1,0),(1,0)])
    for i in range(4):
        fld.moveDrunk(d1)
    for i in range(4):
        fld.moveDrunk(d2)
    for i in range(5):
        fld.moveDrunk(d1)
    distances = []
    for d in fld.getDrunks():
        distances.append(int(origin.distFrom(fld.getLoc(d))))
    print sorted(distances)

def test_moveDrunk_6():
    numDrunks = 3
    fld = NewField()
    origin = Location(0.0, 0.0)
    d1 = SoberDrunk('Drunk1')
    fld.addDrunk(d1, origin)
    d1.setSteps([(1,0),(1,0)])
    d2 = SoberDrunk('Drunk2')
    fld.addDrunk(d2, origin)
    d2.setSteps([(1,0),(1,0),(1,0),(1,0),(1,0)])
    d3 = SoberDrunk('Drunk3')
    fld.addDrunk(d3, origin)
    d3.setSteps([(1,0),(1,0),(1,0),(1,0)])
    for i in range(2):
        fld.moveDrunk(d1)
    for i in range(5):
        fld.moveDrunk(d2)
    for i in range(4):
        fld.moveDrunk(d3)
    distances = []
    for d in fld.getDrunks():
        distances.append(int(origin.distFrom(fld.getLoc(d))))
    print sorted(distances)

def test_moveDrunk_7():
    numDrunks = 3
    fld = NewField()
    origin = Location(0.0, 0.0)
    d1 = SoberDrunk('Drunk1')
    fld.addDrunk(d1, origin)
    d1.setSteps([(1,0),(1,0),(1,0),(1,0),(-1,0)])
    d2 = SoberDrunk('Drunk2')
    fld.addDrunk(d2, origin)
    d2.setSteps([(1,0),(1,0),(1,0),(1,0),(1,0),(-1,0),(-1,0)])
    d3 = SoberDrunk('Drunk3')
    fld.addDrunk(d3, origin)
    d3.setSteps([(1,0),(1,0),(1,0),(1,0),(-1,0)])
    for i in range(2):
        fld.moveDrunk(d1)
    for i in range(5):
        fld.moveDrunk(d2)
    for i in range(4):
        fld.moveDrunk(d3)
    for i in range(2):
        fld.moveDrunk(d1)
    for i in range(1):
        fld.moveDrunk(d2)
    for i in range(1):
        fld.moveDrunk(d1)
        fld.moveDrunk(d2)
        fld.moveDrunk(d3)
    distances = []
    for d in fld.getDrunks():
        distances.append(int(origin.distFrom(fld.getLoc(d))))
    print sorted(distances)

def test_moveDrunk_8():
    numDrunks = 3
    fld = NewField()
    origin = Location(0.0, 0.0)
    d1 = SoberDrunk('Drunk1')
    fld.addDrunk(d1, origin)
    d1.setSteps([(1,0),(1,0),(1,0),(1,0),(1,0)])
    d2 = SoberDrunk('Drunk2')
    fld.addDrunk(d2, origin)
    d2.setSteps([(0,1),(0,1),(0,1),(0,1),])
    for i in range(4):
        fld.moveDrunk(d1)
    for i in range(4):
        fld.moveDrunk(d2)
    for i in range(1):
        fld.moveDrunk(d1)
    distances = []
    for d in fld.getDrunks():
        distances.append(int(origin.distFrom(fld.getLoc(d))))
    print sorted(distances)

def test_moveDrunk_9():
    numDrunks = 3
    fld = NewField()
    origin = Location(0.0, 0.0)
    d1 = SoberDrunk('Drunk1')
    fld.addDrunk(d1, origin)
    d1.setSteps([(1,0),(1,0),(1,0),(1,0),(0,1),(0,1),(0,1),(0,1),(0,1),(1,0)])
    d2 = SoberDrunk('Drunk2')
    fld.addDrunk(d2, origin)
    d2.setSteps([(0,1),(0,1),(0,1),(0,1),(1,0),(1,0),(1,0),(1,0)])
    for i in range(8):
        fld.moveDrunk(d1)
    for i in range(8):
        fld.moveDrunk(d2)
    for i in range(2):
        fld.moveDrunk(d1)
    distances = []
    for d in fld.getDrunks():
        distances.append(origin.distFrom(fld.getLoc(d)))
    print sorted(distances)

def test_moveDrunk_10():
    numDrunks = 3
    fld = NewField()
    origin = Location(0.0, 0.0)
    d1 = SoberDrunk('Drunk1')
    fld.addDrunk(d1, origin)
    d1.setSteps([(1,0),(1,0),(1,0),(1,0),(1,0)])
    d2 = SoberDrunk('Drunk2')
    fld.addDrunk(d2, origin)
    d2.setSteps([(1,0),(1,0),(1,0),(1,0)])
    for i in range(2):
        fld.moveDrunk(d1)
    for i in range(2):
        fld.moveDrunk(d2)
    for i in range(2):
        fld.moveDrunk(d1)
    for i in range(2):
        fld.moveDrunk(d2)
    for i in range(1):
        fld.moveDrunk(d1)
    distances = []
    for d in fld.getDrunks():
        distances.append(int(origin.distFrom(fld.getLoc(d))))
    print sorted(distances)
"""
