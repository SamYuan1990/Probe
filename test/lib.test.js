const libs = require('../lib/libs');
var expect = require('chai').expect;

describe('# libs', function () {
    context('run', function(){
        it('run success', function(done){
            CmdInfo = {
                Chaincode:'sample',
                CoolDown: 1,
                PrepareCLI: 'echo',
                StartCLI: 'echo',
                DryRun: true,
                ShutDownCLI: 'echo',
                Path: '.',
            }
            BatchTimeout = [2];
            MaxMessageCount = [20];
            AbsoluteMaxBytes= [10];
            PreferredMaxBytes= [10];
            expect(0).to.deep.equal(
                libs.Run(CmdInfo,BatchTimeout,MaxMessageCount,AbsoluteMaxBytes,PreferredMaxBytes));
            done();
        })
    })

    context('handleStatus', function(){
        it('should success', function(done){
            rs = {
                status: 0,
            }
            expect(0).to.be.equals(libs.handleStatus(rs));
            done();
        })

        it('should handle error', function(done){
            rs = {
                status: 1,
                stderr: 'abc',
            }
            expect(-1).to.be.equals(libs.handleStatus(rs));
            done();
        })
    })

    context('executeCommand', function(){
        it('should success if dry run', function(done){
            rs = {
                DryRun: true,
            }
            expect(0).to.be.equals(libs.executeCommand(rs));
            done();
        })

        it('should success', function(done){
            rs = {
                DryRun: false,
                info: 'echo',
                command: 'echo',
                args: ['a'],
                Path: './s'
            }
            expect(0).to.be.equals(libs.executeCommand(rs));
            done();
        })

        it('should success if dry run', function(done){
            rs = {
                DryRun: false,
                info: 'echo',
                command: 'echo',
                args: ['tx:500,duration:1.356275407s,tps:100'],
                tps: true,
                Path: './s'
            }
            expect('100').to.be.equals(libs.executeCommand(rs));
            done();
        })
    })

    context('TapeTpsFilter', function(){
        it('should work', function(done){
            rs = {
                output: 'tx: 500, duration: 1.356275407s, tps: 100\n'
            }
            expect(' 100').to.be.equals(libs.TapeTpsFilter(rs));
            done();
        })
    })
})