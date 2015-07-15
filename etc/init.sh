#!/bin/bash

DOOR_ROOT="/home/pi/door"

source ~/.nvm/nvm.sh
cd $DOOR_ROOT
nvm use
forever start -a -l $DOOR_ROOT/forever.log --uid "door" -c "npm start" ./ &> $DOOR_ROOT/init.d.log
