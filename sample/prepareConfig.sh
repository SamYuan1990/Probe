#!/bin/bash

sed -i -e "s/    BatchTimeout: .*s/    BatchTimeout: $1s/g"  ./configtx/configtx.yaml
sed -i -e "s/        MaxMessageCount: .*/        MaxMessageCount: $2/g"  ./configtx/configtx.yaml
sed -i -e "s/        AbsoluteMaxBytes: .* MB/        AbsoluteMaxBytes: $3 MB/g"  ./configtx/configtx.yaml
sed -i -e "s/        PreferredMaxBytes: .* KB/        PreferredMaxBytes: $4 KB/g"  ./configtx/configtx.yaml
