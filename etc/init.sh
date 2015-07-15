#!/bin/bash

export HOME="/home/pi"
DOOR_ROOT="$HOME/door"
source ~/.nvm/nvm.sh
cd $DOOR_ROOT
nvm use
forever start -a -l $DOOR_ROOT/forever.log --uid "door" -c "npm start" ./ &> $DOOR_ROOT/init.d.log
