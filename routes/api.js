var express = require('express');
var router = express.Router();
var libs = require('../lib/libs');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/getBatchTimeout', function(req, res, next) {
  res.send(libs.loadRs(libs.BatchTimeout));
});

router.get('/getMaxMessageCount', function(req, res, next) {
  res.send(libs.loadRs(libs.MaxMessageCount));
});

router.get('/getAbsoluteMaxBytes', function(req, res, next) {
  res.send(libs.loadRs(libs.AbsoluteMaxBytes));
});

router.get('/getPreferredMaxBytes', function(req, res, next) {
  res.send(libs.loadRs(libs.PreferredMaxBytes));
});

router.get('/getTPS', function(req, res, next) {
  res.send(libs.loadRs(libs.TPS));
});

router.get('/run', function(req, res, next) {
  var d = new Date();
  libs.init();
    CmdInfo = {
      Chaincode:'sample',
  }
  BatchTimeout = [0.75,1,1.5,2];
  MaxMessageCount = [10,40,80,120];
  AbsoluteMaxBytes= [2];
  PreferredMaxBytes= [256];
  libs.run(CmdInfo,BatchTimeout,MaxMessageCount,AbsoluteMaxBytes,PreferredMaxBytes);
  //console.log(new Date().toString());
  res.send(d.toString()+' success at '+new Date().toString());
});

module.exports = router;
