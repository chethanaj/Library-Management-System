#!/bin/bash

cd library-UI


ng build
sudo docker build -t lk.chethana/library-ui:$1 .
