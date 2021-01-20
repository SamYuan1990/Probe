# Probe
[![Build Status](https://dev.azure.com/yy19902439/yy19902439/_apis/build/status/SamYuan1990.Probe?branchName=main)](https://dev.azure.com/yy19902439/yy19902439/_build/latest?definitionId=8&branchName=main)

[中文](README_ZH.MD)

## What is Probe
![probe define](probe.png)
[Probe](https://www.bilibili.com/video/BV1dV411y7oZ) is a web GUI application with for Hyperledger Fabric mantianer, user, research to find the best block config logic for specific chaincode and fabric network.

- Probe provides loop test control for given block parameter arrays.
- Probe provides sample chaincode for some test cases.
- Probe provides TPS result review via GUI.

## Current output from Probe
- [HowToConfigFabricParameters](doc/HowToConfigFabricParameters.md)
- [如何通过Probe配置调整Fabric参数](doc/HowToConfigFabricParameters_ZH.md)

## Why Probe
As discussed with [TWGC performance work group](https://github.com/Hyperledger-TWGC/fabric-performance-wiki), we found out that different block parameters, networks, chaincode language and chaincode logic having influence final TPS.
To answer, the best parameter for specific fabric network and fabric chaincode, I create this project.

### For Hyperledger Fabric user
You are able to have better understanding with performance for specific chaincode logic by:
1. Perpare probe for your test env.
2. Start probe with parameters.
3. Once ompleted, you will get the TPS rates with block parameters in GUI as above.

### For Hyperledger Fabric researcher and mantainer
You are able to know better with how your changes impacts Fabric TPS in over all view.
1. Completed your changes, and dokerize your Fabric.
2. Start probe with parameters.
3. Once completed, you will well known how your changes impacts Fabric TPS.

## Probe is not
- Real time time monitor, for real time tps monitor, pls use Prometheus. (But Probe has demo for it with test network [here](https://www.bilibili.com/video/BV1x54y1x78Z))
- Auto test framework for Fabric performance, as in probe, we will invoke as byfn or minifab for your network up/down/cleanup.
- Performance test tool for Fabric, for this we using tape.
- GUI for tape, tape focus on once off time performance testing.

## Smaple guide with Fabric Sample

1. install this project `npm install`
2. install fabric sample `curl -vsS https://raw.githubusercontent.com/hyperledger/fabric/master/scripts/bootstrap.sh | bash`
3. get tape `docker pull guoger/tape`
4. apply the bridge file to adjust block parameters for test network `cp sample/prepareConfig.sh fabric-samples/test-network`
5. npm start
6. access localhost:3000, submit form with placeholder
7. access localhost:3000/result/BatchTimeout
8. access localhost:3000/result/MaxMessageCount
9. access localhost:3000/result/AbsoluteMaxBytes
10. access localhost:3000/result/PreferredMaxBytes

## Version Plan
version | define| feature
---|---|---
0.0.2 | UI refactor | UI enhancement to support args
0.0.3 | back end refactor | may support other type fabric network starter, may adding caliper support
1.0.0 | fix up bugs after 0.0.3 | 

# How to contribute

If your want to contribute Probe with new feature, bug fixing please create a new issue, of course with PR is best.

Also welcome for documentatoin, learning course, etc.

For development, please complete `Smaple guide with Fabric Sample` above.

For Frontend, please use `npm run build`.

For backend, please develop `--DryRun` as mock for unit test and adding real cases in CI