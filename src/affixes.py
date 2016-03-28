import_prefix = "from definitions import *\n\n"

testcase_defs = r"""

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


