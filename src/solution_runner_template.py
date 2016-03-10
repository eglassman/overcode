# Import the student submission by file path (injected by the pipeline)
import imp
student_mod = imp.load_source('studentMod', '__student_sub_path__')

# Import the grader by name (injected by the pipeline)
import __grader_name__ as grader_mod

# Run the grader's tests on the student's code
for test in grader_mod.grader.tests():
    test(student_mod)
