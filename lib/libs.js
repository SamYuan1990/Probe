const process = require('child_process');
const libcommands = require('./commands');
const fileIO = require('./fileIO');

function prepareCommands(CmdInfo, TurnInfo) {
    const tapeCommand = libcommands.PrepareTape(CmdInfo, TurnInfo);
    const prepareCommand = libcommands.prepareEnv(CmdInfo, TurnInfo);
    const startupCommand = libcommands.prepareStartup(CmdInfo, TurnInfo);
    const CCDeployCommand = libcommands.prepareCCDeploy(CmdInfo, TurnInfo);
    const sleepCommand = libcommands.prepareSleep(CmdInfo, TurnInfo);
    const tapeDownCommand = libcommands.PrepareTapeTearDown(CmdInfo, TurnInfo);
    const tearDownCommand = libcommands.PrepareTearDown(CmdInfo, TurnInfo);
    const commands = [
        prepareCommand,
        startupCommand,
        CCDeployCommand,
        sleepCommand,
        tapeCommand,
        tapeDownCommand,
        tearDownCommand,
        sleepCommand,
    ];
    return commands;
}

exports.Run = function Run(CmdInfo, BatchTimeout, MaxMessageCount, AbsoluteMaxBytes, PreferredMaxBytes) {
    let status = 0;
    BatchTimeout.forEach(BatchTimeoutElement => {
        MaxMessageCount.forEach(MaxMessageCountElement => {
            AbsoluteMaxBytes.forEach(AbsoluteMaxBytesElement => {
                PreferredMaxBytes.forEach(PreferredMaxBytesElement => {
                    const TurnInfo = {
                        Chaincode:CmdInfo.Chaincode,
                        BatchTimeout:BatchTimeoutElement,
                        MaxMessageCount:MaxMessageCountElement,
                        AbsoluteMaxBytes:AbsoluteMaxBytesElement,
                        PreferredMaxBytes:PreferredMaxBytesElement,
                    };
                    const commands = prepareCommands(CmdInfo, TurnInfo);
                    commands.forEach(command => {
                        if (!command.tps) {
                            status = this.executeCommand(command);
                            if (status !== 0) {
                                return status;
                            }
                        } else {
                            const TPS = this.executeCommand(command);
                            if (TPS < 0) {
                                console.log('error in testing');
                                return TPS;
                            } else {
                                fileIO.appendRS(TurnInfo.Chaincode + ',' +
                TurnInfo.BatchTimeout + ',' +
                TurnInfo.MaxMessageCount + ',' +
                TurnInfo.AbsoluteMaxBytes + ',' +
                TurnInfo.PreferredMaxBytes + ',' +
                TPS + ',');
                            }
                        }
                    });
                });
            });
        });
    });
    return status;
};

exports.handleStatus = function handleStatus(rs) {
    if (rs.status !== 0) {
        console.error(rs);
        console.error(rs.stderr.toString('utf-8'));
        return -1;
    }
    return 0;
};

exports.executeCommand = function executeCommand(command) {
    console.log(command.info);
    if (command.DryRun) {
        console.log(command);
        return 0;
    }
    const rs = process.spawnSync(command.command, command.args, command.config);
    if (command.tps) {
        if (rs.status !== 0) {
            return this.handleStatus(rs);
        }
        return this.TapeTpsFilter(rs);
    } else {
        return this.handleStatus(rs);
    }
};

exports.TapeTpsFilter = function TapeTpsFilter(rs) {
    let str = rs.output.toString('utf-8', 0);
    str = str.substring(str.indexOf('tps:'));
    str = str.substring(0, str.indexOf('\n'));
    str = str.substring(4);
    return str;
};