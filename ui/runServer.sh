#!/bin/sh
DATA_DIR="/Users/elena/publicCodeRepos/overcode_data"
ln -sF $DATA_DIR
python -m SimpleHTTPServer 8000
