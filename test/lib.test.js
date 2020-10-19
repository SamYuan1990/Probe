const libs = require('../lib/libs');
var expect = require('chai').expect;

describe('# libs', function () {
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