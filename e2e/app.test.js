const app = require('../app');
const request = require('supertest')(app);

describe('# test app.js', function () {
    it('GET / 200 test', function (done) {
        request
            .get('/')
            .expect(200, done);
    });
    it('GET /api/', function (done) {
        request
            .get('/api')
            .expect(200, done);
    });
    it('GET /api/run dryrun', function (done) {
        request
            .get('/api/run?Path=.%2Ffabric-samples%2Ftest-network%2F&BatchTimeout=1%2C2&MaxMessageCount=10&AbsoluteMaxBytes=3&PreferredMaxBytes=4&CoolDown=5&PrepareCLI=.%2FprepareConfig.sh&StartCLI=.%2Fnetwork.sh&CCDeployCLI=.%2Fnetwork.sh&TapeCount=5000&ShutDownCLI=.%2Fnetwork.sh&DryRun=true')
            .expect(200, done);
    });
    it('GET /api/run', function (done) {
        request
            .get('/api/run?Path=.%2Ffabric-samples%2Ftest-network%2F&BatchTimeout=1%2C2&MaxMessageCount=10&AbsoluteMaxBytes=3&PreferredMaxBytes=4&CoolDown=5&PrepareCLI=.%2FprepareConfig.sh&StartCLI=.%2Fnetwork.sh&CCDeployCLI=.%2Fnetwork.sh&TapeCount=5000&ShutDownCLI=.%2Fnetwork.sh')
            .expect(200, done);
    });
    it('GET /api/getBatchTimeout', function (done) {
        request
            .get('/api/get?data=BatchTimeout')
            .expect(200, done);
    });
    it('GET /api/getMaxMessageCount', function (done) {
        request
            .get('/api/get?data=MaxMessageCount')
            .expect(200, done);
    });
    it('GET /api/get？data=AbsoluteMaxBytes', function (done) {
        request
            .get('/api/get?data=AbsoluteMaxBytes')
            .expect(200, done);
    });
    it('GET /api/get?data=PreferredMaxBytes', function (done) {
        request
            .get('/api/get?data=PreferredMaxBytes')
            .expect(200, done);
    });
    it('GET /api/get?data=TPS', function (done) {
        request
            .get('/api/get?data=TPS')
            .expect(200, done);
    });
    it('GET / 200 resultBatchTimeout', function (done) {
        request
            .get('/result/BatchTimeout')
            .expect(200, done);
    });
    it('GET / 200 resultMaxMessageCount', function (done) {
        request
            .get('/result/MaxMessageCount')
            .expect(200, done);
    });
    it('GET / 200 resultAbsoluteMaxBytes', function (done) {
        request
            .get('/result/AbsoluteMaxBytes')
            .expect(200, done);
    });
    it('GET / 200 resultPreferredMaxBytes', function (done) {
        request
            .get('/result/PreferredMaxBytes')
            .expect(200, done);
    });
    it('GET /quick/BatchTimeout', function (done) {
        request
            .get('/quick/BatchTimeout')
            .expect(302, done);
    });

    it('GET /quick/MaxMessageCount', function (done) {
        request
            .get('/quick/MaxMessageCount')
            .expect(302, done);
    });
});