#!/usr/bin/env bash

docker build -t app-with-secrets --secret id=npmrc,src=./dummy-secrets/.npmrc .
