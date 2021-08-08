const libs = require('../lib/libs');
const expect = require('chai').expect;

describe('# libs', function () {
    context('handleStatus', function() {
        it('should success', function(done) {
            const rs = {
                status: 0,
            };
            expect(0).to.be.equals(libs.handleStatus(rs));
            done();
        });

        it('should handle error', function(done) {
            class mockError {
                toString(value) {
                    return 'abc';
                }
            }
            const rs = {
                status: 1,
                stderr: new mockError()
            };
            expect(-1).to.be.equals(libs.handleStatus(rs));
            done();
        });
    });

    context('executeCommand', function() {
        it('should success if dry run', function(done) {
            const rs = {
                DryRun: true,
            };
            expect(0).to.be.equals(libs.executeCommand(rs));
            done();
        });

        it('should success', function(done) {
            const rs = {
                DryRun: false,
                info: 'echo',
                command: 'echo',
                args: ['a'],
                Path: './s'
            };
            expect(0).to.be.equals(libs.executeCommand(rs));
            done();
        });

        it('error handle', function(done) {
            const rs = {
                DryRun: false,
                info: 'echo',
                command: 'exit',
                tps: true,
                args: ['1'],
                Path: './s'
            };
            expect(-1).to.be.equals(libs.executeCommand(rs));
            done();
        });

        it('should success if dry run', function(done) {
            const rs = {
                DryRun: false,
                info: 'echo',
                command: 'echo',
                args: ['tx:500,duration:1.356275407s,tps:100'],
                tps: true,
                cmdType: 'Tape',
                Path: './s'
            };
            expect('100').to.be.equals(libs.executeCommand(rs));
            done();
        });
    });

    context('TapeTpsFilter', function() {
        it('should work', function(done) {
            const rs = {
                output: 'tx: 500, duration: 1.356275407s, tps: 101\n'
            };
            expect(' 101').to.be.equals(libs.TapeTpsFilter(rs));
            done();
        });
    });

    context('CaliperTpsFilter', function() {
        it('should work', function(done) {
            const rs = {
                output: `2021.08.08-07:16:44.370 info  [caliper] [report-builder]
                +-----------+-------+------+-----------------+-----------------+-----------------+-----------------+------------------+
                | Name      | Succ  | Fail | Send Rate (TPS) | Max Latency (s) | Min Latency (s) | Avg Latency (s) | Throughput (TPS) |
                |-----------|-------|------|-----------------|-----------------|-----------------|-----------------|------------------|
                | readAsset | 12774 | 0    | 431.6           | 0.21            | -0.01           | 0.01            | 431.5            |
                +-----------+-------+------+-----------------+-----------------+-----------------+-----------------+------------------+
                
                2021.08.08-07:16:44.381 info  [caliper] [report-builder]        Generated report with path /hyperledger/caliper/workspace/caliper-workspace/report.html
                2021.08.08-07:16:44.381 info  [caliper] [monitor.js]    Stopping all monitors
                2021.08.08-07:16:44.381 info  [caliper] [worker-orchestrator]   Sending exit me`
            };
            expect(' 431.5            ').to.be.equals(libs.CaliperTpsFilter(rs));
            done();
        });
    });


    context('runNew', function() {
        it('run success', function(done) {
            const cmds = JSON.parse('[{"order":0,"cmdType":"PrePare","args":["./prepareConfig.sh"]},{"order":1,"cmdType":"Shell","args":["./network.sh","up","createChannel","-i","2.2"]},{"order":2,"cmdType":"Shell","args":["./network.sh","deployCC","-d","5","-ccn","basic","-ccp","../asset-transfer-basic/chaincode-go/","-ccl","go"]},{"order":3,"cmdType":"Shell","args":["sleep","10"]},{"order":4,"cmdType":"Tape","args":["docker","run","--name","tape","-e","TAPE_LOGLEVEL=debug","--network","host","-v","./:/config","guoger/tape","tape","-c","/config/config.yaml","-n","500"]},{"order":5,"cmdType":"Shell","args":["docker","rm","tape"]},{"order":6,"cmdType":"Shell","args":["./network.sh","down"]},{"order":7,"cmdType":"Shell","args":["sleep","10"]}]');
            const BatchTimeout = [2];
            const MaxMessageCount = [20];
            const AbsoluteMaxBytes = [10];
            const PreferredMaxBytes = [10];
            expect(0).to.deep.equal(
                libs.RunNew(BatchTimeout, MaxMessageCount, AbsoluteMaxBytes, PreferredMaxBytes, true, './', cmds));
            done();
        });
    });
});