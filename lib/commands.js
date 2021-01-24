const path = require('path');

function newCommand(CmdInfo, TurnInfo) {
    const command = {
        DryRun: false,
        tps: false,
    };
    if (CmdInfo.DryRun) {
        command.DryRun = true;
    }
    command.config = {
        cwd:path.resolve(CmdInfo.Path)
    };
    return command;
}

exports.PrepareTape = function PrepareTape(CmdInfo, TurnInfo) {
    const command = newCommand(CmdInfo, TurnInfo);
    command.tps = true;
    command.command = 'docker';
    command.args = ['run',
        '--name',
        'tape',
        '-e',
        'TAPE_LOGLEVEL=debug',
        '--network',
        'host',
        '-v',
        path.resolve('./') + ':/config',
        'guoger/tape',
        'tape',
        '-c',
        '/config/config.yaml',
        '-n',
        CmdInfo.tapeCount];
    command.info = 'tape start';
    return command;
};

exports.prepareEnv = function prepareEnv(CmdInfo, TurnInfo) {
    const  command = newCommand(CmdInfo, TurnInfo);
    command.command = CmdInfo.PrepareCLI;
    command.args = [
        TurnInfo.BatchTimeout,
        TurnInfo.MaxMessageCount,
        TurnInfo.AbsoluteMaxBytes,
        TurnInfo.PreferredMaxBytes,
    ];
    command.info = 'prepare genesis block config ' + JSON.stringify(TurnInfo);
    return command;
};

exports.prepareStartup = function prepareStartup(CmdInfo, TurnInfo) {
    const command = newCommand(CmdInfo, TurnInfo);
    command.command = CmdInfo.StartCLI;
    command.args = [
        'up', 'createChannel', '-i', '2.2'
    ];
    command.info = 'network up';
    return command;
};

exports.prepareCCDeploy = function prepareCCDeploy(CmdInfo, TurnInfo) {
    const command = newCommand(CmdInfo, TurnInfo);
    command.command = CmdInfo.CCDeployCLI;
    command.args = [
        'deployCC', '-d', TurnInfo.BatchTimeout, '-ccn', 'basic', '-ccp', '../asset-transfer-basic/chaincode-go/', '-ccl', 'go'
    ];
    command.config = {
        cwd:path.resolve(CmdInfo.Path)
    };
    command.info = 'deployCC';
    return command;
};

exports.prepareSleep = function prepareSleep(CmdInfo, TurnInfo) {
    const command = newCommand(CmdInfo, TurnInfo);
    command.command = 'sleep';
    command.args = [
        CmdInfo.CoolDown
    ];
    command.config = {
        cwd:path.resolve(CmdInfo.Path)
    };
    command.info = 'cool down';
    return command;
};

exports.PrepareTapeTearDown = function PrepareTapeTearDown(CmdInfo, TurnInfo) {
    const command = newCommand(CmdInfo, TurnInfo);
    command.command = 'docker';
    command.args = [
        'rm', 'tape'
    ];
    command.config = {
        cwd:path.resolve(CmdInfo.Path)
    };
    command.info = 'tape down';
    return command;
};

exports.PrepareTearDown = function PrepareTearDown(CmdInfo, TurnInfo) {
    const command = newCommand(CmdInfo, TurnInfo);
    command.command = CmdInfo.ShutDownCLI;
    command.args = [
        'down'
    ];
    command.config = {
        cwd:path.resolve(CmdInfo.Path)
    };
    command.info = 'network down';
    return command;
};

exports.PrepareMonitorUP = function PrepareMonitorUP(CmdInfo, TurnInfo) {
    const command = newCommand(CmdInfo, TurnInfo);
    command.command = 'docker';
    command.args = [
        'network', 'connect', 'net_test', 'prometheus'
    ];
    command.config = {
        cwd:path.resolve(CmdInfo.Path)
    };
    command.info = 'monitor up';
    return command;
};

exports.PrepareMonitorDown = function PrepareMonitorDown(CmdInfo, TurnInfo) {
    const command = newCommand(CmdInfo, TurnInfo);
    command.command = 'docker';
    command.args = [
        'network', 'disconnect', 'net_test', 'prometheus'
    ];
    command.config = {
        cwd:path.resolve(CmdInfo.Path)
    };
    command.info = 'monitor down';
    return command;
};

exports.newVersionCommand = function newVersionCommand(cmd, thePath, dryRun,
    BatchTimeout, MaxMessageCountElement, AbsoluteMaxBytes, PreferredMaxBytes) {
    const command = {
        DryRun: false,
        tps: false,
    };
    if (dryRun) {
        command.DryRun = true;
    }
    command.config = {
        cwd : path.resolve(thePath)
    };
    command.args = [];
    command.command = cmd.args[0];
    if (cmd.cmdType === 'Shell') {
        for (let i = 1; i < cmd.args.length; i++) {
            command.args[i - 1] = cmd.args[i];
        }
    }
    if (cmd.cmdType === 'Tape') {
        command.tps = true;
        let vmount = false;
        for (let i = 1; i < cmd.args.length; i++) {
            command.args[i - 1] = cmd.args[i];
            if (vmount) {
                const arr = cmd.args[i].split(':');
                command.args[i - 1] = path.resolve(arr[0]) + ':' + arr[1];
                vmount = false;
            }
            if (cmd.args[i] === '-v') {
                vmount = true;
            }
        }
    }
    if (cmd.cmdType === 'PrePare') {
        command.args = [BatchTimeout, MaxMessageCountElement, AbsoluteMaxBytes, PreferredMaxBytes];
    }
    // console.log(JSON.stringify(command));
    return command;
};