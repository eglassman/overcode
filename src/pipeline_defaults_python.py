from os import path
import StringIO
import subprocess

import pythonTidy
import remove_comments


testedfuncname = "dotProduct"

def tidy_non_oppia(filename, sourceDir, destDir):
    tidy_up_buffer = StringIO.StringIO()
    pythonTidy.tidy_up(path.join(sourceDir, filename), tidy_up_buffer)
    new_src = remove_comments.minify(tidy_up_buffer.getvalue())

    lines = new_src.split('\n')
    with open(path.join(destDir, filename), 'w') as f:
        for line in lines:
            if line.strip() == '#!/usr/bin/python':
                continue
            if line.strip() == '# -*- coding: utf-8 -*-':
                continue
            if line.strip() == 'None':
                continue
            # Get rid of calls which don't return anything and were
            # presumably for debugging
            if line.split('(')[0] == testedfuncname:
                print 'removing: ', line
                continue
            # Get rid of print statements with no indent
            if line.startswith('print'):
                print 'removing: ', line
                continue

            f.write(line+'\n')


def tidy_oppia(filename, sourceDir, destDir):
    tidy_up_buffer = StringIO.StringIO()
    pythonTidy.tidy_up(path.join(sourceDir, filename), tidy_up_buffer)
    new_src = remove_comments.minify(tidy_up_buffer.getvalue())

    lines = new_src.split('\n')
    with open(path.join(destDir, filename), 'w') as f:
        # Include a function definition as the first line
        f.write('def ' + testedfuncname + '():\n')
        for line in lines:
            if line.strip() == '#!/usr/bin/python':
                continue
            if line.strip() == '# -*- coding: utf-8 -*-':
                continue
            if line.strip() == 'None':
                continue
            # Get rid of calls which don't return anything and were
            # presumably for debugging
            if line.split('(')[0] == testedfuncname:
                print 'removing: ', line
                continue
            # Do not remove print statements since oppia solutions print
            # their results instead of returning them

            # the given solution becomes the body of a function, so indent each line
            f.write("    "+line+'\n')


def format_as_html(filename, sourceDir, destDir):
    sourcePath = path.join(sourceDir, filename)
    destPath = path.join(destDir, filename + '.html')

    subprocess.call("pygmentize -O style=colorful,linenos=1 -o %s %s" % (destPath, sourcePath), shell=True)

    # Format html code
    with open(destPath, 'r') as f:
        htmlCode = f.read()
    with open(destPath, 'w') as f:
        f.write(htmlCode.replace("\"","'").replace("\n","<br>"))

