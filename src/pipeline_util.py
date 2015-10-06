import errno
import os

def ensure_folder_exists(folder):
    try:
        os.makedirs(folder)
    except OSError as exc: # Python >2.5
        if exc.errno == errno.EEXIST and os.path.isdir(folder):
            pass
        else: raise
