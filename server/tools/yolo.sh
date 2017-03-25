#!/bin/bash
DARKNET_DIR=$1
FILE_LOCATION=$2
RESULT_LOCATION=$3

cd $DARKNET_DIR
./darknet detect yolo-sort.cfg backup/yolo-sort.weights $FILE_LOCATION 2> /dev/null | grep 'box' | sed -e "s/^box://"

mv predictions.png $RESULT_LOCATION
