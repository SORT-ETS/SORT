#!/bin/sh
while inotifywait -e close_write /usr/src/ipengine/images/image.png; do /usr/src/ipengine/app /usr/src/ipengine/images/image.png; done
