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

    it('GET /api/run', function (done) {
        request.post('/api/run').set('Content-Type', 'application/x-www-form-urlencoded').send(
            {
                Path: './fabric-samples/test-network/',
                BatchTimeout:'1',
                MaxMessageCount:'10',
                AbsoluteMaxBytes:'3',
                PreferredMaxBytes:'4',
                CoolDown:'5',
                PrepareCLI:'./prepareConfig.sh',
                StartCLI:'./network.sh',
                CCDeployCLI:'./network.sh',
                TapeCount: '500',
                ShutDownCLI: './network.sh'
            }).expect(200, done);
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
    /* it('GET /quick/BatchTimeout', function (done) {
        request
            .get('/quick/BatchTimeout')
            .expect(200, done);
    });

    it('GET /quick/MaxMessageCount', function (done) {
        request
            .get('/quick/MaxMessageCount')
            .expect(200, done);
    });*/
});