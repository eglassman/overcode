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
Solutions contain information about how they are written and how they behave.
#### Input-Output Behavior
Solutions know what test cases were run on them, in what order (`testcases`), and what output they produced. Solutions also know whether those test cases passed or failed to produce acceptable output.
#### Internal Dynamics
Solutions have traces of their internal behavior in response to each test case.
