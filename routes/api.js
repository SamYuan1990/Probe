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
  var status = 0;
  libs.init();
  console.log(req.query);
  CmdInfo = {
      Chaincode:'sample',
      Path: req.query.Path,
      CoolDown: parseFloat(req.query.CoolDown),
      PrepareCLI: req.query.PrepareCLI,
      StartCLI: req.query.StartCLI,
      ShutDownCLI: req.query.ShutDownCLI,
      tapeCount: parseFloat(req.query.TapeCount),
  }
  if (req.query.TapeCLI) {
    CmdInfo.TapeCLI = req.query.TapeCLI;
  }
  BatchTimeout = [];
  BatchTimeoutArray = req.query.BatchTimeout.toString().split(",");
  BatchTimeoutArray.forEach(element => {
    BatchTimeout.push(parseFloat(element));
  });
  //
  MaxMessageCount = [];
  MaxMessageCountArray = req.query.MaxMessageCount.toString().split(",");
  MaxMessageCountArray.forEach(element => {
    MaxMessageCount.push(parseFloat(element));
  });
  //
  AbsoluteMaxBytes = [];
  AbsoluteMaxBytesArray = req.query.AbsoluteMaxBytes.toString().split(",");
  AbsoluteMaxBytesArray.forEach(element => {
    AbsoluteMaxBytes.push(parseFloat(element));
  });
  //
  PreferredMaxBytes = [];
  PreferredMaxBytesArray = req.query.PreferredMaxBytes.toString().split(",");
  PreferredMaxBytesArray.forEach(element => {
    PreferredMaxBytes.push(parseFloat(element));
  });
  status = libs.run(CmdInfo,BatchTimeout,MaxMessageCount,AbsoluteMaxBytes,PreferredMaxBytes);
  if (status == 0) {
    console.log(new Date().toString());
    res.send(d.toString()+' success at '+new Date().toString());
  } else {
    console.log('error');
    res.sendStatus(500);
  }
});

module.exports = router;
