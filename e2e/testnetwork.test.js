const app = require('../app');
const request = require('supertest')(app);

describe('# test app.js', function () {
  it('Post /api/run/new 200', function (done) {
    request
      .post('/api/run/new')
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .send({
        BatchTimeout: '1,2',
        MaxMessageCount: '10',
        AbsoluteMaxBytes: '2',
        PreferredMaxBytes: '512',
        path: './fabric-samples/test-network',
        cmd: `[
                    {"order":0,"cmdType":"PrePare","args":["./prepareConfig.sh"]},
                    {"order":1,"cmdType":"Shell","args":["./network.sh","up","createChannel"]},
                    {"order":2,"cmdType":"Shell","args":["./network.sh","deployCC","-d","5","-ccn","basic","-ccp","../asset-transfer-basic/chaincode-go/","-ccl","go"]},
                    {"order":3,"cmdType":"Shell","args":["sleep","10"]},
                    {"order":4,"cmdType":"Tape","args":["docker","run","--name","tape","-e","TAPE_LOGLEVEL=debug","--network","fabric_test","-v",".//:/config","ghcr.io/hyperledger-twgc/tape","tape","-c","/config/config.yaml","-n","500"]},
                    {"order":5,"cmdType":"Shell","args":["docker","rm","tape"]},
                    {"order":6,"cmdType":"Shell","args":["./network.sh","down"]},
                    {"order":7,"cmdType":"Shell","args":["sleep","10"]}]`,
      })
      .expect(200, done);
  });
});
