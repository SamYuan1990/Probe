#!/bin/bash

kill -9 $(lsof -i:3000 | awk '{print $2}' | tail -1)
