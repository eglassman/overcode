#!/bin/sh
DATA_DIR="/Users/staceyterman/overcode_data"
ln -sF $DATA_DIR overcode_data
python -m SimpleHTTPServer 8000
