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
  libs.init();
  libs.run('sample,0.75,10,2,256, 180.038278,');
  libs.run('sample,0.75,40,2,256, 291.310916,');
  libs.run('sample,0.75,80,2,256, 333.041573,');
  libs.run('sample,0.75,120,2,256, 351.752320,');
  libs.run('sample,1,10,2,256, 172.872861,');
  libs.run('sample,1,40,2,256, 291.617799,');
  libs.run('sample,1,80,2,256, 337.826232,');
  libs.run('sample,1,120,2,256, 319.039588,');
  libs.run('sample,2,10,2,256, 182.105577,');
  libs.run('sample,2,40,2,256, 260.276446,');
  libs.run('sample,2,80,2,256, 323.542760,');
  libs.run('sample,2,120,2,256, 323.526945,');
  libs.run('sample,1.5,10,2,256, 172.745382,');
  libs.run('sample,1.5,40,2,256, 268.041591,');
  libs.run('sample,1.5,80,2,256, 348.150198,');
  libs.run('sample,1.5,120,2,256, 310.915616,');
  res.send('success');
});

module.exports = router;
