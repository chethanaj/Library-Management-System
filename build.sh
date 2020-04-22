#!/bin/bash

cd $1
mvn clean install -Dmaven.test.skip=true
sudo docker build --build-arg JAR_FILE=target/*.jar -t lk.chethana/$1:$2 .
