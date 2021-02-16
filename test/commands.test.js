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
});
