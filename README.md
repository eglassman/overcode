# overcode
OverCode's public repo (in development). See http://people.csail.mit.edu/elg/overcode for papers, posters, and talks.

To run preprocessing tests, cd to /src and run:
```
python -m unittest [-v] pipeline_preprocessing_tests
```
Add -v flag for more wordiness when running tests

The tests for the pipeline proper run on the first 50 solutions to 6.0001 dotProduct.
Create a directory containing a file called `testCase.py` that has the test case in it
(in this case, something like `dotProduct([1, 2, 3], [4, 5, 6])`) and a subfolder
called 'data' containing those 50 solutions. In `pipeline_tests.py`, change
TEST_DIR_PATH to point to this folder and run the file. The raw data can be found
in the private overcode repo, under rawData/6.0001/dotProduct/correct

# Description of Overcode Pipeline (as of late March)
## Interesting Dependencies
Philip Guo's variable renamer and python execution logger
## Interesting Data Structures
We implemented a "setlist" to help us organize information. It's a set, stored as a list, where order represents the order in which items were added.
## Interesting Objects
### Variable Objects
Variable objects represent a specific variable within a specific program.
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
