# Probe
[![Build Status](https://dev.azure.com/yy19902439/yy19902439/_apis/build/status/SamYuan1990.Probe?branchName=main)](https://dev.azure.com/yy19902439/yy19902439/_build/latest?definitionId=8&branchName=main)

## Probe是什么
![probe define](probe.png)
[Probe](https://www.bilibili.com/video/BV1dV411y7oZ)是一个面向Hyperledger Fabric维护者，用户，研究者的web UI的应用程序，我们可以用它来观察Fabric出块参数对于Fabric网络TPS的影线。

- 提供循环测试控制。
- 提供基于test-network的配置案例。
- 提供可视化的tps结果对比图。

## 当前基于Probe的研究结果
- [HowToConfigFabricParameters](doc/HowToConfigFabricParameters.md)
- [如何通过Probe配置调整Fabric参数](doc/HowToConfigFabricParameters_ZH.md)

## 为什么使用Probe
Probe是在[TWGC performance work group](https://github.com/Hyperledger-TWGC/fabric-performance-wiki)的交流中中，我们对于“如何配置出块参数来达到最大tps？”这一问题的回答而创立并实现的项目。

### 对于Hyperledger Fabric使用者而言
可以通过如下步骤，更好的了解对于指定智能合约，如何达到最大tps。
1. 准备环境
1. 启动Probe
1. 观察TPS结果

### 对于Hyperledger Fabric研究人员和维护者
可以通过如下步骤，更好的了解你的改动如何影响了Hyperledger Fabric的性能。
1. 完成你的代码，打包Fabric
1. 启动Probe
1. 观察结果

## Probe不做什么
- 实时监控，如需要，请参考配置Prometheus(但是[Probe提供基于test-network的配置案例](https://www.bilibili.com/video/BV1x54y1x78Z))
- 完整的自动测试框架，对于部署方式，目前依赖于test-network
- 性能测试工具，对于性能测试本身，目前依赖与Tape
- Tape的GUI版本

## 快速上手
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

## 维护和升级计划
version | define| feature
---|---|---
0.0.2 | back end refactor | may support other type fabric network starter, may adding caliper support
1.0.0 | fix up bugs after 0.0.2 | 