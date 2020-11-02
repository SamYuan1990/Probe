const libs = require('../lib/libs');
var expect = require('chai').expect;

describe('# libs', function () {
    it('run', function(done){
        CmdInfo = {
            Chaincode:'sample',
            CoolDown: 1,
            PrepareCLI: 'echo',
            StartCLI: 'echo',
            DryRun: true,
            ShutDownCLI: 'echo',
        }
        BatchTimeout = [2];
        MaxMessageCount = [20];
        AbsoluteMaxBytes= [10];
        PreferredMaxBytes= [10];
        expect(true).to.deep.equal(libs.run(CmdInfo,BatchTimeout,MaxMessageCount,AbsoluteMaxBytes,PreferredMaxBytes)===0);
        done();
    })

    it('appendRS', function(done){
        libs.init();
        libs.appendRS('sample,0.75,10,2,256, 180.038278,');
        libs.appendRS('sample,0.75,40,2,256, 291.310916,');
        libs.appendRS('sample,0.75,80,2,256, 333.041573,');
        libs.appendRS('sample,0.75,120,2,256, 351.752320,');
        libs.appendRS('sample,1,10,2,256, 172.872861,');
        libs.appendRS('sample,1,40,2,256, 291.617799,');
        libs.appendRS('sample,1,80,2,256, 337.826232,');
        libs.appendRS('sample,1,120,2,256, 319.039588,');
        libs.appendRS('sample,2,10,2,256, 182.105577,');
        libs.appendRS('sample,2,40,2,256, 260.276446,');
        libs.appendRS('sample,2,80,2,256, 323.542760,');
        libs.appendRS('sample,2,120,2,256, 323.526945,');
        libs.appendRS('sample,1.5,10,2,256, 172.745382,');
        libs.appendRS('sample,1.5,40,2,256, 268.041591,');
        libs.appendRS('sample,1.5,80,2,256, 348.150198,');
        libs.appendRS('sample,1.5,120,2,256, 310.915616,');
        done();
    })

    it('get BatchTimeout', function (done) {
        expect([0.75,0.75,0.75,0.75,1,1,1,1,2,2,2,2,1.5,1.5,1.5,1.5]).to.deep.equal(
            libs.loadRs(libs.BatchTimeout));
        done();
    })
    it('get MaxMessageCount', function (done) {
        expect([10,40,80,120,10,40,80,120,10,40,80,120,10,40,80,120]).to.deep.equal(
            libs.loadRs(libs.MaxMessageCount));
        done();
    })
    it('get AbsoluteMaxBytes', function (done) {
        expect([2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2]).to.deep.equal(
            libs.loadRs(libs.AbsoluteMaxBytes));
        done();
    })
    it('get PreferredMaxBytes', function (done) {
        expect([256,256,256,256,256,256,256,256,256,256,256,256,256,256,256,256]).to.deep.equal(
            libs.loadRs(libs.PreferredMaxBytes));
        done();
    })
    it('get TPS', function (done) {
        expect([180.038278,
            291.310916,
            333.041573,
            351.752320,
            172.872861,
            291.617799,
            337.826232,
            319.039588,
            182.105577,
            260.276446,
            323.542760,
            323.526945,
            172.745382,
            268.041591,
            348.150198,
            310.915616]).to.deep.equal(
            libs.loadRs(libs.TPS));
        done();
    })
})