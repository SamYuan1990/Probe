#!/bin/bash

sed -i -e "s/    \"timeout\": \".*s\"/    \"timeout\": \"$1s\"/g"  updatedchannel.json
sed -i -e "s/        \"max_message_count\": .*,/        \"max_message_count\": $2,/g"  updatedchannel.json
sed -i -e "s/        \"absolute_max_bytes\": .*,/        \"absolute_max_bytes\": $3,/g"  updatedchannel.json
sed -i -e "s/       \"preferred_max_bytes\": .*/       \"preferred_max_bytes\": $4/g"  updatedchannel.json
