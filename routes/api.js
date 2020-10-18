var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/getBatchTimeout', function(req, res, next) {
  res.send([0.75,0.75,0.75,0.75,1,1,1,1,2,2,2,2,1.5,1.5,1.5,1.5]);
});

router.get('/getMaxMessageCount', function(req, res, next) {
  res.send([10,40,80,120,10,40,80,120,10,40,80,120,10,40,80,120]);
});

router.get('/getAbsoluteMaxBytes', function(req, res, next) {
  res.send([2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2]);
});

router.get('/getPreferredMaxBytes', function(req, res, next) {
  res.send([256,256,256,256,256,256,256,256,256,256,256,256,256,256,256,256]);
});

router.get('/getTPS', function(req, res, next) {
  res.send([180,291,333,351,172,291,337,319,182,260,323.54,323.52,172,268,348,310]);
});

module.exports = router;
