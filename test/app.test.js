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
});