#!/bin/bash

DOOR_ROOT="/home/pi/door/"

cd /home/pi/door
forever start -l $DOOR_ROOT/forever.log --uid "door" -c "npm start" ./ &> $DOOR_ROOT/init.d.log
