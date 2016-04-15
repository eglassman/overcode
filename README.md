# overcode
OverCode's public repo (in development). See http://people.csail.mit.edu/elg/overcode for papers, posters, and talks.

# Description of Overcode Pipeline (as of late March)
## Interesting Dependencies
Philip Guo's variable renamer and python execution logger
## Interesting Data Structures
We implemented a "setlist" to help us organize information. It's a set, stored as a list, where order represents the order in which items were added.

## Interesting Objects

### Variable Objects
Variable objects represent a specific variable within a specific program.

### Abstract Variable
An abstract variable, distinguished (for now) from other abstract variables by its sequence of values. Stores the histogram of names given to it in student solutions, and which student solutions those are.

### Line Objects
Line objects contain a line of code (without any indent specified) with blanks for variables. The blanks have corresponding Abstract Variables, based on the whole solution and the whole collection of solutions this line is in. The blanks also have a (sequence or set?) of values plugged into them during the solution's execution, and these values are stored.

### Solution Objects
Solution objects contain information about how they are written and how they behave. They also store a unique id (`solnum`).

#### Input-Output Behavior
Solution objects store what test cases were run on them, in what order (`testcases`), and what output they produced (`output`). 

#### Correctness
Solution objects store whether those test cases passed or failed to produce acceptable output (`error_vector`), and whether they passed *all* test cases (`correct`).

#### Internal Dynamics
Solution objects store traces of their internal behavior in response to each test case (`testcase_to_trace`). Based on these traces, we derive:

*Variable View*

Solution objects store the behavior of all local variables logged during execution and which of those variables correspond to Abstract Variable Objects.

*Line View*

Solution objects store lines as tuples of templates (lines with blanks where the variables would be), local names for those variable blanks, sets of values that those blanks took on during execution, and the line's indent in the program.

## Interesting Heuristics

In the original OverCode work, we clustered canonicalized solutions so teachers could get a sense of the common and uncommon solutions. In this expanded OverCode work, we support the arduous grading processes in introductory python courses like 6.0001. We canonicalize incorrect solutions as well as correct solutions, and sort solutions by similarity heuristics, rather than cluster size.

### Recommendation heuristic

We're interested in helping teachers "bring more context with them" when they're jumping from solution to solution during exhaustive grading.
