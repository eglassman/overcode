# overcode
OverCode's public repo (in development). See http://people.csail.mit.edu/elg/overcode for papers, posters, and talks.

## Description of Overcode Pipeline (as of late March)
### Interesting Dependencies
Philip Guo's variable renamer and python execution logger
### Interesting Data Structures
We implemented a "setlist" to help us organize information. It's a set, stored as a list, where order represents the order in which items were added.

### Interesting Objects

#### Variable Objects
Variable objects represent a specific variable within a specific program.

#### Abstract Variable
An abstract variable, distinguished (for now) from other abstract variables by its sequence of values. Stores the histogram of names given to it in student solutions, and which student solutions those are.

### Line Objects
Line objects contain a line of code (without any indent specified) with blanks for variables. The blanks have corresponding Abstract Variables, based on the whole solution and the whole collection of solutions this line is in. The blanks also have a (sequence or set?) of values plugged into them during the solution's execution, and these values are stored.

#### Solution Objects
Solution objects contain information about how they are written and how they behave. They also store a unique id (`solnum`).

##### Input-Output Behavior
Solution objects store what test cases were run on them, in what order (`testcases`), and what output they produced (`output`). 

##### Correctness
Solution objects store whether those test cases passed or failed to produce acceptable output (`error_vector`), and whether they passed *all* test cases (`correct`).

##### Internal Dynamics
Solution objects store traces of their internal behavior in response to each test case (`testcase_to_trace`). Based on these traces, we derive:

*Variable View*

Solution objects store the behavior of all local variables logged during execution and which of those variables correspond to Abstract Variable Objects.

*Line View*

Solution objects store lines as tuples of templates (lines with blanks where the variables would be), local names for those variable blanks, sets of values that those blanks took on during execution, and the line's indent in the program.

### Interesting Heuristics

In the original OverCode work, we clustered canonicalized solutions so teachers could get a sense of the common and uncommon solutions. In this expanded OverCode work, we support the arduous grading processes in introductory python courses like 6.0001. We canonicalize incorrect solutions as well as correct solutions, and sort solutions by similarity heuristics, rather than cluster size.

#### Recommendation heuristic

We're interested in helping teachers "bring more context with them" when they're jumping from solution to solution during exhaustive grading.

## Running the pipeline

Use the `src/run_pipeline.py` script from the command line to interact with the various parts of the OverCode pipeline. Run `python run_pipeline.py -h` for a description of the available arguments.

### Preprocessor
The preprocessor actually executes student solutions using Philip guo's execution logger. From within the src directory, run the preprocessor with `python run_pipeline.py path/to/target/directory -P -n name_of_function`. Instead of `-P`, `--run-pre` will work as well. If `name_of_function` is supplied, any calls to that function within a submission will be removed when the code is tidied. The given target directory must contain two things:

* A subdirectory called "data", containing one Python file per student submission, and an official correct solution named `answer.py`.

* A `testCase.py` file, where each line of the file is a single test case, i.e., a Python function call. Test cases are often just single calls to a student-defined function, but can also be more complicated functions. See Notes on Test Cases below.

The `extract_solutions_final.py` script, located in `src/testcase_making`, will turn a CSV of student submissions into a directory of Python files as expected by the preprocessor. Run it with `python extract_solutions_final.py path/to/CSV path/to/output/directory`. This script creates a directory called "data" within the specified output directory and fills it with (anonymized) student submissions. It also writes a file called `mapping.txt` in `src/testcase_making` which contains the mapping between student usernames and anonymized identifiers.

The CSV parsing script may complain about bad rows. If that happens, it probably means there is an unescaped double quote (") within a student submission. To fix it, find the problematic quotation mark (the script prints out each row as it parses it, so just search within the CSV for a nearby row), and replace it with a single quote (') or an escaped double quote (\") instead.

The `answer.py` file must be manually copied into the data folder.

#### Notes on Test Cases

**Test cases must print their output!** Otherwise, the pipeline won't be able to compare the results of student submissions to the correct answer. This usually means that each line of `testCase.py` is simply a print statement followed by a function call, like this:

    print student_defined_function('foo')
    print student_defined_function('bar')

However, test cases can also be more complicated. The output of each test is simply compared to the output of the supplied correct answer, so tests can be anything. To use more complicated tests, first add a variable to  `src/affixes.py` containing the literal source of the test definitions (or any other extra code) as a string. There are already some examples defined in `affixes.py`, but here's a simple pair of test cases:

```python
testcase_definitions_example = r"""
def test_0():
    # checks that my_list isn't mutated
    my_list = []
    student_defined_function(my_list)
    print my_list  # should be []

def test_1():
    # checks return value
    print student_defined_function([])
"""
```

Next, change the `import` statement in `src/pipeline_preprocessing.py` to import the newly defined test case definitions (see the comments within the code). Finally, define a `testCase.py` file as usual. It should simply call the extra functions, like this:

    test_0()
    test_1()

### Output of the preprocessor

Todo.
