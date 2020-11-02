var express = require('express');
var router = express.Router();
var libs = require('../lib/libs');
var fileIO = require('../lib/fileIO');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/getBatchTimeout', function(req, res, next) {
  res.send(fileIO.loadRs(fileIO.BatchTimeout));
});

router.get('/getMaxMessageCount', function(req, res, next) {
  res.send(fileIO.loadRs(fileIO.MaxMessageCount));
});

router.get('/getAbsoluteMaxBytes', function(req, res, next) {
  res.send(fileIO.loadRs(fileIO.AbsoluteMaxBytes));
});

router.get('/getPreferredMaxBytes', function(req, res, next) {
  res.send(fileIO.loadRs(fileIO.PreferredMaxBytes));
});

router.get('/getTPS', function(req, res, next) {
  res.send(fileIO.loadRs(fileIO.TPS));
});

function prepareArray(input){
  array = input.toString().split(",");
  data = [];
  array.forEach(element => {
    data.push(parseFloat(element));
  });
  return data;
}

router.get('/run', function(req, res, next) {
  var status = 0;
  fileIO.init();
  console.log(req.query);
  CmdInfo = {
      Chaincode:'sample',
      Path: req.query.Path,
      CoolDown: parseFloat(req.query.CoolDown),
      PrepareCLI: req.query.PrepareCLI,
      StartCLI: req.query.StartCLI,
      CCDeployCLI: req.query.CCDeployCLI,
      ShutDownCLI: req.query.ShutDownCLI,
      tapeCount: parseFloat(req.query.TapeCount),
      DryRun: false,
  }
  if (req.query.DryRun) {
    CmdInfo.DryRun = req.query.DryRun;
  }
  var BatchTimeout = prepareArray(req.query.BatchTimeout);  
  var MaxMessageCount = prepareArray(req.query.MaxMessageCount);  
  var AbsoluteMaxBytes = prepareArray(req.query.AbsoluteMaxBytes);  
  var PreferredMaxBytes = prepareArray(req.query.PreferredMaxBytes);
  var d = new Date();
  console.log('process start');
  status = libs.Run(CmdInfo,BatchTimeout,MaxMessageCount,AbsoluteMaxBytes,PreferredMaxBytes);
  if (status == 0) {
    console.log(new Date().toString());
    res.send(d.toString()+' success at '+new Date().toString());
  } else {
    console.log('error');
    res.sendStatus(500);
  }
});

module.exports = router;
