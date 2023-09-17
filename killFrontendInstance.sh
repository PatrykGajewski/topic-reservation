#!/bin/bash

processPIDToKill=$(lsof -t -i:3000)

kill -9 "$processPIDToKill"

echo "Succesfully killed process with PID:$processPIDToKill"