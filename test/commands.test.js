const commands = require('../lib/commands');
var expect = require('chai').expect;

describe('# commands', function () {
    context('PrepareTape' ,function(){
        it('dry Run', function(done){
            CmdInfo = {
                DryRun: true,
                Path: './',
            };
            TurnInfo = {};
            cmd = commands.PrepareTape(CmdInfo,TurnInfo)
            expect(true).to.be.equals(cmd.DryRun);
            done();
        })

        it('normal', function(done){
            CmdInfo = {
                DryRun: false,
                Path: './',
                tapeCount: 5000,
            };
            TurnInfo = {};
            cmd = commands.PrepareTape(CmdInfo,TurnInfo)
            expect(true).to.be.equals(cmd.tps);
            expect('docker').to.be.equals(cmd.command);
            expect('tape start').to.be.equals(cmd.info);
            expect(CmdInfo.tapeCount).to.be.equals(cmd.args[12]);
            done();
        })
    })

    context('prepareEnv', function(done){
        it('dry Run', function(done){
            CmdInfo = {
                DryRun: true,
                Path: './',
            };
            TurnInfo = {};
            cmd = commands.prepareEnv(CmdInfo,TurnInfo)
            expect(true).to.be.equals(cmd.DryRun);
            done();
        })

        it('normal', function(done){
            CmdInfo = {
                PrepareCLI: 'echo',
                Path: './',
            };
            TurnInfo = {
                BatchTimeout: 1,
                MaxMessageCount: 2,
                AbsoluteMaxBytes: 3,
                PreferredMaxBytes: 4,
            };
            cmd = commands.prepareEnv(CmdInfo,TurnInfo)
            expect('echo').to.be.equals(cmd.command);
            expect('prepare genesis block config '+JSON.stringify(TurnInfo)).to.be.equals(cmd.info);
            expect(TurnInfo.BatchTimeout).to.be.equals(cmd.args[0]);
            expect(TurnInfo.MaxMessageCount).to.be.equals(cmd.args[1]);
            expect(TurnInfo.AbsoluteMaxBytes).to.be.equals(cmd.args[2]);
            expect(TurnInfo.PreferredMaxBytes).to.be.equals(cmd.args[3]);
            done();
        })    
    })
    

    it('prepareStartup', function(done){
        CmdInfo = {
            StartCLI: 'echo',
            Path: './',
        };
        TurnInfo = {};
        cmd = commands.prepareStartup(CmdInfo,TurnInfo)
        expect('echo').to.be.equals(cmd.command);
        expect('network up').to.be.equals(cmd.info);
        expect('up').to.be.equals(cmd.args[0]);
        expect('createChannel').to.be.equals(cmd.args[1]);
        expect('-i').to.be.equals(cmd.args[2]);
        expect('2.2').to.be.equals(cmd.args[3]);
        done();
    })

    it('prepareCCDeploy', function(done){
        CmdInfo = {
            CCDeployCLI: 'echo',
            Path: './',
        };
        TurnInfo = {
            BatchTimeout:1,
        };
        cmd = commands.prepareCCDeploy(CmdInfo,TurnInfo)
        expect('echo').to.be.equals(cmd.command);
        expect('deployCC').to.be.equals(cmd.info);
        expect('deployCC').to.be.equals(cmd.args[0]);
        expect('-d').to.be.equals(cmd.args[1]);
        expect(TurnInfo.BatchTimeout).to.be.equals(cmd.args[2]);
        done();    
    })

    it('prepareSleep', function(done){
        CmdInfo = {
            Path: './',
            CoolDown: 10,
        };
        TurnInfo = {
        };
        cmd = commands.prepareSleep(CmdInfo,TurnInfo)
        expect('sleep').to.be.equals(cmd.command);
        expect(CmdInfo.CoolDown).to.be.equals(cmd.args[0]);
        expect('cool down').to.be.equals(cmd.info);
        done();    
    })

    it('PrepareTapeTearDown', function(done){
        CmdInfo = {
            Path: './',
        };
        TurnInfo = {
        };
        cmd = commands.PrepareTapeTearDown(CmdInfo,TurnInfo)
        expect('docker').to.be.equals(cmd.command);
        expect('tape down').to.be.equals(cmd.info);
        expect('rm').to.be.equals(cmd.args[0]);
        expect('tape').to.be.equals(cmd.args[1]);
        done();
    })

    it('PrepareTearDown', function(done){
        CmdInfo = {
            Path: './',
            ShutDownCLI: 'echo'
        };
        TurnInfo = {
        };
        cmd = commands.PrepareTearDown(CmdInfo,TurnInfo)
        expect('echo').to.be.equals(cmd.command);
        expect('network down').to.be.equals(cmd.info);
        expect('down').to.be.equals(cmd.args[0]);
        done();    
    })
})
