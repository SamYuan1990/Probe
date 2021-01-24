const commands = require('../lib/commands');
const expect = require('chai').expect;

describe('# commands', function () {

    context('new api', function () {
        const BatchTimeout = 0;
        const MaxMessageCountElement = 0;
        const AbsoluteMaxBytes = 1;
        const PreferredMaxBytes = 2;
        const dryRun = false;

        it('works for dry run', function(done) {
            const cmd = JSON.parse('{"order":0,"cmdType":"PrePare","args":["./prepareConfig.sh"]}');
            const target = commands.newVersionCommand(cmd, '', true,
                BatchTimeout, MaxMessageCountElement, AbsoluteMaxBytes, PreferredMaxBytes);
            expect(target.DryRun).to.be.true;
            expect(target.tps).to.be.false;
            done();
        });

        it('works for PrePare', function (done) {
            const cmd = JSON.parse('{"order":0,"cmdType":"PrePare","args":["./prepareConfig.sh"]}');
            const target = commands.newVersionCommand(cmd, './Path', dryRun,
                BatchTimeout, MaxMessageCountElement, AbsoluteMaxBytes, PreferredMaxBytes);
            expect(target.DryRun).to.be.false;
            expect(target.tps).to.be.false;
            expect(target.command).to.be.equal('./prepareConfig.sh');
            expect(target.args[0]).to.be.equal(BatchTimeout);
            expect(target.args[1]).to.be.equal(MaxMessageCountElement);
            expect(target.args[2]).to.be.equal(AbsoluteMaxBytes);
            expect(target.args[3]).to.be.equal(PreferredMaxBytes);
            done();
        });
        // {"order":1,"cmdType":"Shell","args":["./network.sh","up","createChannel","-i","2.2"]},

        it('works for Shell', function (done) {
            const cmd = JSON.parse('{"order":0,"cmdType":"Shell","args":["./prepareConfig.sh", "123"]}');
            const target = commands.newVersionCommand(cmd, './Path', dryRun,
                BatchTimeout, MaxMessageCountElement, AbsoluteMaxBytes, PreferredMaxBytes);
            expect(target.DryRun).to.be.false;
            expect(target.tps).to.be.false;
            expect(target.command).to.be.equal('./prepareConfig.sh');
            expect(target.args[0]).to.be.equal('123');
            done();
        });
        // {"order":4,"cmdType":"Tape","args":["docker","run","--name","tape","-e","TAPE_LOGLEVEL=debug","--network","host","-v","./:/config",
        // "guoger/tape","tape","-c","/config/config.yaml","-n","500"]}
        it('works for Tape', function (done) {
            const cmd = JSON.parse('{"order":0,"cmdType":"Tape","args":["tape", "-v", "./:/config"]}');
            const target = commands.newVersionCommand(cmd, './Path', dryRun,
                BatchTimeout, MaxMessageCountElement, AbsoluteMaxBytes, PreferredMaxBytes);
            expect(target.DryRun).to.be.false;
            expect(target.tps).to.be.true;
            expect(target.command).to.be.equal('tape');
            expect(target.args[0]).to.be.equal('-v');
            expect(target.args[1].length > './:/config'.length).to.be.equal(true);
            done();
        });

    });

    context('PrepareTape', function() {
        it('dry Run', function(done) {
            const CmdInfo = {
                DryRun: true,
                Path: './',
            };
            const TurnInfo = {};
            const cmd = commands.PrepareTape(CmdInfo, TurnInfo);
            expect(true).to.be.equals(cmd.DryRun);
            done();
        });

        it('normal', function(done) {
            const CmdInfo = {
                DryRun: false,
                Path: './',
                tapeCount: 5000,
            };
            const TurnInfo = {};
            const cmd = commands.PrepareTape(CmdInfo, TurnInfo);
            expect(true).to.be.equals(cmd.tps);
            expect('docker').to.be.equals(cmd.command);
            expect('tape start').to.be.equals(cmd.info);
            expect(CmdInfo.tapeCount).to.be.equals(cmd.args[14]);
            done();
        });
    });

    context('prepareEnv', function() {
        it('dry Run', function(done) {
            const CmdInfo = {
                DryRun: true,
                Path: './',
            };
            const TurnInfo = {};
            const cmd = commands.prepareEnv(CmdInfo, TurnInfo);
            expect(true).to.be.equals(cmd.DryRun);
            done();
        });

        it('normal', function(done) {
            const CmdInfo = {
                PrepareCLI: 'echo',
                Path: './',
            };
            const TurnInfo = {
                BatchTimeout: 1,
                MaxMessageCount: 2,
                AbsoluteMaxBytes: 3,
                PreferredMaxBytes: 4,
            };
            const cmd = commands.prepareEnv(CmdInfo, TurnInfo);
            expect('echo').to.be.equals(cmd.command);
            expect('prepare genesis block config ' + JSON.stringify(TurnInfo)).to.be.equals(cmd.info);
            expect(TurnInfo.BatchTimeout).to.be.equals(cmd.args[0]);
            expect(TurnInfo.MaxMessageCount).to.be.equals(cmd.args[1]);
            expect(TurnInfo.AbsoluteMaxBytes).to.be.equals(cmd.args[2]);
            expect(TurnInfo.PreferredMaxBytes).to.be.equals(cmd.args[3]);
            done();
        });
    });


    it('prepareStartup', function(done) {
        const CmdInfo = {
            StartCLI: 'echo',
            Path: './',
        };
        const TurnInfo = {};
        const cmd = commands.prepareStartup(CmdInfo, TurnInfo);
        expect('echo').to.be.equals(cmd.command);
        expect('network up').to.be.equals(cmd.info);
        expect('up').to.be.equals(cmd.args[0]);
        expect('createChannel').to.be.equals(cmd.args[1]);
        expect('-i').to.be.equals(cmd.args[2]);
        expect('2.2').to.be.equals(cmd.args[3]);
        done();
    });

    it('prepareCCDeploy', function(done) {
        const CmdInfo = {
            CCDeployCLI: 'echo',
            Path: './',
        };
        const TurnInfo = {
            BatchTimeout:1,
        };
        const cmd = commands.prepareCCDeploy(CmdInfo, TurnInfo);
        expect('echo').to.be.equals(cmd.command);
        expect('deployCC').to.be.equals(cmd.info);
        expect('deployCC').to.be.equals(cmd.args[0]);
        expect('-d').to.be.equals(cmd.args[1]);
        expect(TurnInfo.BatchTimeout).to.be.equals(cmd.args[2]);
        done();
    });

    it('prepareSleep', function(done) {
        const CmdInfo = {
            Path: './',
            CoolDown: 10,
        };
        const TurnInfo = {
        };
        const cmd = commands.prepareSleep(CmdInfo, TurnInfo);
        expect('sleep').to.be.equals(cmd.command);
        expect(CmdInfo.CoolDown).to.be.equals(cmd.args[0]);
        expect('cool down').to.be.equals(cmd.info);
        done();
    });

    it('PrepareTapeTearDown', function(done) {
        const CmdInfo = {
            Path: './',
        };
        const TurnInfo = {
        };
        const cmd = commands.PrepareTapeTearDown(CmdInfo, TurnInfo);
        expect('docker').to.be.equals(cmd.command);
        expect('tape down').to.be.equals(cmd.info);
        expect('rm').to.be.equals(cmd.args[0]);
        expect('tape').to.be.equals(cmd.args[1]);
        done();
    });

    it('PrepareTearDown', function(done) {
        const CmdInfo = {
            Path: './',
            ShutDownCLI: 'echo'
        };
        const TurnInfo = {
        };
        const cmd = commands.PrepareTearDown(CmdInfo, TurnInfo);
        expect('echo').to.be.equals(cmd.command);
        expect('network down').to.be.equals(cmd.info);
        expect('down').to.be.equals(cmd.args[0]);
        done();
    });
});
