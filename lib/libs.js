const process = require('child_process');
const libcommands = require('./commands');
const fileIO = require('./fileIO');
const log4js = require('log4js');
const logger = log4js.getLogger('app');

exports.handleStatus = function handleStatus(rs) {
    if (rs.status !== 0) {
        if (rs.stderr) {
            logger.error(rs.stderr.toString('utf-8'));
            console.log(rs.stderr.toString('utf-8'));
        }
        if (rs.output) {
            logger.error(rs.output.toString('utf-8'));
            console.log(rs.output.toString('utf-8'));
        }
        if (!rs.stderr && !rs.output) {
            logger.error(JSON.stringify(rs));
        }
        return -1;
    }
    return 0;
};

exports.executeCommand = function executeCommand(command) {
    logger.info(command.info);
    if (command.DryRun) {
        logger.info(command);
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
    logger.info(rs.output.toString('utf-8'));
    let str = rs.output.toString('utf-8', 0);
    str = str.substring(str.indexOf('tps:'));
    str = str.substring(0, str.indexOf('\n'));
    str = str.substring(4);
    return str;
};

exports.RunNew = function RunNew(BatchTimeout, MaxMessageCount, AbsoluteMaxBytes, PreferredMaxBytes, dryRun, cmdPath, cmds) {
    let status = 0;
    logger.info(dryRun);
    logger.info(cmdPath);
    BatchTimeout.forEach(BatchTimeoutElement => {
        MaxMessageCount.forEach(MaxMessageCountElement => {
            AbsoluteMaxBytes.forEach(AbsoluteMaxBytesElement => {
                PreferredMaxBytes.forEach(PreferredMaxBytesElement => {
                    cmds.forEach(cmd => {
                        logger.info(cmd);
                        logger.info(BatchTimeoutElement);
                        logger.info(MaxMessageCountElement);
                        logger.info(AbsoluteMaxBytesElement);
                        logger.info(PreferredMaxBytesElement);
                        const command = libcommands.newVersionCommand(cmd, cmdPath, dryRun,
                            BatchTimeoutElement, MaxMessageCountElement, AbsoluteMaxBytesElement, PreferredMaxBytesElement);
                        console.log(command);
                        if (!command.tps) {
                            status = this.executeCommand(command);
                            if (status !== 0) {
                                return status;
                            }
                        } else {
                            const TPS = this.executeCommand(command);
                            if (TPS < 0) {
                                logger.error('error in tps testing');
                                return TPS;
                            } else {
                                fileIO.appendRS('sample' + ',' +
                                BatchTimeoutElement + ',' +
                                MaxMessageCountElement + ',' +
                                AbsoluteMaxBytesElement + ',' +
                                PreferredMaxBytesElement + ',' +
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