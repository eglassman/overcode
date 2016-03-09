prefix = """from definitions import *\n
"""


prefix_xx = r"""
#Study code, already posted as Lecture 13 code
class Location(object):
     def __init__(self, x, y):
         self.x = x
         self.y = y

     def move(self, deltaX, deltaY):
         return Location(self.x + deltaX, self.y + deltaY)

     def getX(self):
         return self.x

     def getY(self):
         return self.y

     def distFrom(self, other):
         ox = other.x
         oy = other.y
         xDist = self.x - ox
         yDist = self.y - oy
         return (xDist**2 + yDist**2)**0.5

     def __str__(self):
         return '<' + str(self.x) + ', ' + str(self.y) + '>'

class Drunk(object):
     def __init__(self, name):
         self.name = name
     def __str__(self):
         return 'This drunk is named ' + self.name

class UsualDrunk(Drunk):
     def takeStep(self):
         stepChoices =\
             [(0.0,1.0), (0.0,-1.0), (1.0, 0.0), (-1.0, 0.0)]
         return random.choice(stepChoices)

class ColdDrunk(Drunk):
     def takeStep(self):
         stepChoices = [(0,0.9), (0,1.1), (1, 0), (-1, 0)]
         return random.choice(stepChoices)

class Field(object):
     def __init__(self):
         self.drunks = {}

     def addDrunk(self, drunk, loc):
         if drunk in self.drunks:
             raise ValueError('Duplicate drunk')
         else:
             self.drunks[drunk] = loc

     def moveDrunk(self, drunk):
         if not drunk in self.drunks:
             raise ValueError('Drunk not in field')
         xDist, yDist = drunk.takeStep()
         currentLocation = self.drunks[drunk]
         #use move method of Location to get new location
         self.drunks[drunk] = currentLocation.move(xDist, yDist)

     def getLoc(self, drunk):
         if not drunk in self.drunks:
             raise ValueError('Drunk not in field')
         return self.drunks[drunk]

class OddField(Field):
     def moveDrunk(self, drunk):
         if not drunk in self.drunks:
             raise ValueError('Drunk not in field')
         xDist, yDist = drunk.takeStep()
         currentLocation = self.drunks[drunk]
         #use move method of Location to get new location
         self.drunks[drunk] = currentLocation.move(xDist, yDist)
         locSums = self.drunks[drunk].getX() + self.drunks[drunk].getY()
         if locSums%5 < 1:
             self.drunks[drunk] = Location(0, 0)

def walk(f, d, numSteps):
     start = f.getLoc(d)
     for s in range(numSteps):
         f.moveDrunk(d)
     return(start.distFrom(f.getLoc(d)))

# This class is hidden from students.  
# Used to make auto grading work by making
# the walk non-random.  Not available during quiz.
class SoberDrunk(Drunk):
     def setSteps(self, steps):
         self.steps = steps
         self.indx = 0
     def takeStep(self):
         self.indx += 1
         return self.steps[self.indx - 1]

"""

postfix = ''

postfix_xx = r"""

# print sys.modules[__name__]
#_m = sys.modules[__name__]
# print _m.NewField
#print dir(sys.modules[NewField.__module__])
pprint.pprint(sys.modules)

def test1():
    a = NewField()
    return str(a)

def test2_xx():
    a = NewField()
    a.addDrunk(Drunk('a'), Location(0,0))
    ds = map(lambda d: str(d), sorted(a.getDrunks()))
    return ds

def test2_yy():
    a = NewField()
    a.addDrunk(Drunk('a'), Location(0,0))
    d = sorted(a.getDrunks())
    return d
"""
