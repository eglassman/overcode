#!/bin/sh
DATA_DIR="/Users/staceyterman/overcode_data"
ln -sF $DATA_DIR
python -m SimpleHTTPServer 8000
