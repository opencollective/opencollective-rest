#!/bin/bash

if [ "$NODE_ENV" = "circleci" ]; then
  echo "> Starting api server"
  cd ~/api
  PG_DATABASE=opencollective_dvl npm start &
  API_PID=$!
  cd -
  echo "> Starting rest server"
  npm start &
  REST_PID=$!
fi

echo ""
echo "Waiting 5sec (give some time for servers to be up and running)"
sleep 5
echo ""

echo ""
echo "> Starting server jest tests"
jest test/server/*
RETURN_CODE=$?
if [ $RETURN_CODE -ne 0 ]; then
  echo "Error with jest tests, exiting"
  exit 1;
fi

if [ "$NODE_ENV" = "circleci" ]; then
  echo "Killing all node processes"
  kill $API_PID;
  kill $REST_PID;
  echo "Exiting with code $RETURN_CODE"
  exit $RETURN_CODE
fi
