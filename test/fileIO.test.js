const fileIO = require('../lib/fileIO');
const expect = require('chai').expect;

describe('# fileIO', function () {
    it('appendRS', function(done) {
        fileIO.init();
        fileIO.appendRS('sample,1,10,2,256, 110,');
        fileIO.appendRS('sample,2,10,2,256, 210,');
        fileIO.appendRS('sample,4,10,2,256, 410,');
        fileIO.appendRS('sample,8,10,2,256, 810,');
        fileIO.appendRS('sample,1,20,2,256, 120,');
        fileIO.appendRS('sample,2,20,2,256, 220,');
        fileIO.appendRS('sample,4,20,2,256, 420,');
        fileIO.appendRS('sample,8,20,2,256, 820,');
        done();
    });

    it('get BatchTimeout', function (done) {
        expect([1, 2, 4, 8, 1, 2, 4, 8]).to.deep.equal(
            fileIO.loadRs(fileIO.BatchTimeout));
        done();
    });
    it('get MaxMessageCount', function (done) {
        expect([10, 10, 10, 10, 20, 20, 20, 20]).to.deep.equal(
            fileIO.loadRs(fileIO.MaxMessageCount));
        done();
    });
    it('get AbsoluteMaxBytes', function (done) {
        expect([2, 2, 2, 2, 2, 2, 2, 2]).to.deep.equal(
            fileIO.loadRs(fileIO.AbsoluteMaxBytes));
        done();
    });
    it('get PreferredMaxBytes', function (done) {
        expect([256, 256, 256, 256, 256, 256, 256, 256]).to.deep.equal(
            fileIO.loadRs(fileIO.PreferredMaxBytes));
        done();
    });
    it('get TPS', function (done) {
        expect([110, 210, 410, 810, 120, 220, 420, 820]).to.deep.equal(
            fileIO.loadRs(fileIO.TPS));
        done();
    });

    it('get BatchTimeout order by BatchTimeout', function (done) {
        expect([1, 1, 2, 2, 4, 4, 8, 8]).to.deep.equal(
            fileIO.loadRs(fileIO.BatchTimeout, fileIO.BatchTimeout));
        done();
    });

    it('get TPS order by BatchTimeout', function (done) {
        expect([110, 120, 210, 220, 410, 420, 810, 820]).to.deep.equal(
            fileIO.loadRs(fileIO.TPS, fileIO.BatchTimeout));
        done();
    });
});