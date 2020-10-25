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
  BatchTimeout = [];
  console.log(req.query.BatchTimeout);
  BatchTimeoutArray = req.query.BatchTimeout.toString().split(",");
  BatchTimeoutArray.forEach(element => {
    BatchTimeout.push(parseFloat(element));
  });
  console.log(BatchTimeout);
  //
  MaxMessageCount = [];
  console.log(req.query.MaxMessageCount);
  MaxMessageCountArray = req.query.MaxMessageCount.toString().split(",");
  MaxMessageCountArray.forEach(element => {
    MaxMessageCount.push(parseFloat(element));
  });
  console.log(MaxMessageCount);
  //
  AbsoluteMaxBytes = [];
  console.log(req.query.AbsoluteMaxBytes);
  AbsoluteMaxBytesArray = req.query.AbsoluteMaxBytes.toString().split(",");
  AbsoluteMaxBytesArray.forEach(element => {
    AbsoluteMaxBytes.push(parseFloat(element));
  });
  console.log(AbsoluteMaxBytes);
  //
  PreferredMaxBytes = [];
  console.log(req.query.PreferredMaxBytes);
  PreferredMaxBytesArray = req.query.PreferredMaxBytes.toString().split(",");
  PreferredMaxBytesArray.forEach(element => {
    PreferredMaxBytes.push(parseFloat(element));
  });
  console.log(PreferredMaxBytes);
  libs.run(CmdInfo,BatchTimeout,MaxMessageCount,AbsoluteMaxBytes,PreferredMaxBytes);
  console.log(new Date().toString());
  res.send(d.toString()+' success at '+new Date().toString());
});

module.exports = router;
