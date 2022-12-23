#!/bin/bash
DIRECTORY=/home/ubuntu/workspace/docs
sudo killall node
cd $DIRECTORY
npm install
npm run build
npm run serve -- --build --host 0.0.0.0 &