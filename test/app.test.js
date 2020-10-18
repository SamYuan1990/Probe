const app = require('../app');
const request = require('supertest')(app);

describe('# test app.js', function () {
    it('GET / 200 test', function (done) {
        request
            .get('/')
            .expect(200, done)
    });
    it('GET /api/', function (done) {
        request
            .get('/api')
            .expect(200, done)
    });
    it('GET /api/getBatchTimeout', function (done) {
        request
            .get('/api/getBatchTimeout')
            .expect(200, done)
    });
    it('GET /api/getMaxMessageCount', function (done) {
        request
            .get('/api/getMaxMessageCount')
            .expect(200, done)
    });
    it('GET /api/getAbsoluteMaxBytes', function (done) {
        request
            .get('/api/getAbsoluteMaxBytes')
            .expect(200, done)
    });
    it('GET /api/getPreferredMaxBytes', function (done) {
        request
            .get('/api/getPreferredMaxBytes')
            .expect(200, done)
    });
    it('GET /api/getTPS', function (done) {
        request
            .get('/api/getTPS')
            .expect(200, done)
    });
});