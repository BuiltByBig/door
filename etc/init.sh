#!/bin/bash

DOOR_ROOT="/home/pi/door/"

cd $DOOR_ROOT
forever start -l $DOOR_ROOT/forever.log --uid "door" -c "npm start" ./ &> $DOOR_ROOT/init.d.log
