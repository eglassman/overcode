import errno
import os

def ensure_folder_exists(folder):
    try:
        os.makedirs(folder)
    except OSError as exc: # Python >2.5
        if exc.errno == errno.EEXIST and os.path.isdir(folder):
            pass
        else: raise

def make_hashable(seq):
    if isinstance(seq, (list,tuple)):
        return tuple(make_hashable(el) for el in seq)
    elif isinstance(seq, dict):
        return make_hashable(seq.items())
    elif isinstance(seq, set):
        return make_hashable(frozenset(seq))
    else:
        return seq
