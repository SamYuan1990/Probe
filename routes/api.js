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

module.exports = router;
