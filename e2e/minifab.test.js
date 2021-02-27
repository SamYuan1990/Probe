const app = require('../app');
const request = require('supertest')(app);

describe('# test app.js', function () {
    it('Post /api/run/new 200', function (done) {
        request.post('/api/run/new').set('Content-Type', 'application/x-www-form-urlencoded').send(
            {
                BatchTimeout: '1',
                MaxMessageCount: '10,20',
                AbsoluteMaxBytes: '103809024',
                PreferredMaxBytes: '524288',
                path: './minifabric',
                cmd: `[
                    {"order":0,"cmdType":"Shell","args":["./minifab","up","-i","2.2"]},
                    {"order":1,"cmdType":"Shell","args":["./minifab","channelquery","-c","systemchannel"]},
                    {"order":2,"cmdType":"Shell","args":["cp","vars/systemchannel_config.json","updatedchannel.json"]},
                    {"order":3,"cmdType":"PrePare","args":["./prepareConfig.sh"]},
                    {"order":4,"cmdType":"Shell","args":["cp","updatedchannel.json","vars/systemchannel_config.json"]},
                    {"order":5,"cmdType":"Shell","args":["./minifab","channelsign,channelupdate","-c","systemchannel"]},
                    {"order":6,"cmdType":"Shell","args":["mkdir","-p","/tmp/minifab"]},
                    {"order":7,"cmdType":"Shell","args":["cp","config.yaml","/tmp/minifab"]},
                    {"order":8,"cmdType":"Shell","args":["cp","-r","./vars","/tmp/minifab"]},
                    {"order":9,"cmdType":"Tape","args":["docker","run","--name","tape","-e","TAPE_LOGLEVEL=debug","--network","mysite0","-v","/tmp/minifab:/config","guoger/tape","tape","-c","/config/config.yaml","-n","500"]},
                    {"order":10,"cmdType":"Shell","args":["docker","rm","tape"]},
                    {"order":11,"cmdType":"Shell","args":["rm","-rf","/tmp/minifab"]},
                    {"order":12,"cmdType":"Shell","args":["sleep","10"]},
                    {"order":13,"cmdType":"Shell","args":["./minifab","down"]},
                    {"order":14,"cmdType":"Shell","args":["./minifab","cleanup"]}]`
            }).expect(200, done);
    });
});