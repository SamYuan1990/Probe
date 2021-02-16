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
    it('GET /api/getAbsoluteMaxBytes', function (done) {
        request
            .get('/api/get?data=AbsoluteMaxBytes')
            .expect(200, done);
    });
    it('GET /api/getPreferredMaxBytes', function (done) {
        request
            .get('/api/get?data=PreferredMaxBytes')
            .expect(200, done);
    });
    it('GET /api/getTPS', function (done) {
        request
            .get('/api/get?data=TPS')
            .expect(200, done);
    });

    it('GET /api/getTPS', function (done) {
        request
            .get('/api/get?data=TPS&orderby=BatchTimeout')
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

    it('GET /quick/config', function (done) {
        request
            .get('/quick/config')
            .expect(200, done);
    });

    // http://localhost:3000/newUI

    it('GET /oldUI', function (done) {
        request
            .get('/oldUI')
            .expect(200, done);
    });

    it('Post /api/run/new 200 for any dry run', function (done) {
        request.post('/api/run/new').set('Content-Type', 'application/x-www-form-urlencoded').send(
            {
                BatchTimeout: '1,2',
                MaxMessageCount: '10',
                AbsoluteMaxBytes: '2',
                PreferredMaxBytes: '512',
                path: './fabric-samples',
                dryRun: true,
                cmd: '[{"order":0,"cmdType":"PrePare","args":["./prepareConfig.sh"]},{"order":1,"cmdType":"Shell","args":["./network.sh","up","createChannel","-i","2.2"]},{"order":2,"cmdType":"Shell","args":["./network.sh","deployCC","-d","5","-ccn","basic","-ccp","../asset-transfer-basic/chaincode-go/","-ccl","go"]},{"order":3,"cmdType":"Shell","args":["sleep","10"]},{"order":4,"cmdType":"Tape","args":["docker","run","--name","tape","-e","TAPE_LOGLEVEL=debug","--network","host","-v","./:/config","guoger/tape","tape","-c","/config/config.yaml","-n","500"]},{"order":5,"cmdType":"Shell","args":["docker","rm","tape"]},{"order":6,"cmdType":"Shell","args":["./network.sh","down"]},{"order":7,"cmdType":"Shell","args":["sleep","10"]}]'
            }
        ).expect(200, done);
    });
});