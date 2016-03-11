# Import the student submission by file path (injected by the pipeline)
import imp
if {which_test} == 0:
    student_mod = imp.load_source('studentMod', '{student_sub_path}')
else:
    import sys
    student_mod = sys.modules['studentMod']

# Import the grader by name (injected by the pipeline)
# import {grader_name} as grader_mod
# from {grader_name} import grader

# Run the grader's tests on the student's code
{function_name} = getattr(student_mod, '{function_name}')
print {function_invocation}
# grader.tests()[{which_test}](student_mod)
# for test in grader_mod.grader.tests():
#     print "which test is:", {which_test}
#     test(student_mod)
