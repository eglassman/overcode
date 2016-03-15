import csv
import os
import pprint
import sys

# exam schema: "username", "time", "grade", "attempts", "answer"
def extract_solutions_from_file(filename, output_base):
    max_id = 0
    username_to_id = {}
    num_correct = 0
    num_incorrect = 0
    total_num_lines = 0
    total_num_attempts = 0

    with open(filename, 'rb') as f:
        reader = csv.reader(f)
        for (i, row) in enumerate(reader):
            if i == 0:
                # header row
                continue

            # print row
            # print
            try:
                username, time, grade, attempts, student_response = row
            except ValueError:
                print "bad row:",i, row
                raise

            if grade == "1.0":
                num_correct += 1
            else:
                num_incorrect += 1

            if username in username_to_id:
                student_id = username_to_id[username]
            else:
                student_id = 'student_' + str(max_id)
                username_to_id[username] = student_id
                max_id += 1

            try:
                attempts = int(attempts)
            except ValueError:
                attempts = 1 # not sure why sometimes there's a row without this
            total_num_attempts += attempts
            total_num_lines += len(student_response.split('\n'))

            extra_info = ("# student id: %s\n" % student_id +
                "# attempts: %s\n" % attempts +
                "# auto-assigned grade: %s\n\n" % grade)
            with open(os.path.join(output_base, 's%s.py' % str(i-1)), 'w') as sol_file:
                sol_file.write(extra_info + student_response)

    print "Incorrect solutions/Total solutions:", str(num_incorrect) + '/' + str(num_incorrect + num_correct)
    print "Number of unique students:", len(username_to_id)
    print "Average number of attempts:", float(total_num_attempts) / len(username_to_id)
    print "Average number of lines:", float(total_num_lines) / (num_incorrect + num_correct)

    with open('mapping.txt', 'w') as f:
        pprint.pprint(username_to_id, f)

if __name__ == '__main__':
    output_base = os.path.join(sys.argv[2], "data")

    try:
        os.makedirs(output_base)
    except OSError:
        pass

    extract_solutions_from_file(sys.argv[1], output_base)
