const path = require('path');

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
        command.cmdType = 'Tape';
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
    if (cmd.cmdType === 'Caliper') {
        command.tps = true;
        command.cmdType = 'Caliper';
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