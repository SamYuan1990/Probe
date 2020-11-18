const express = require('express');
const router = express.Router();

router.get('/BatchTimeout', function(req, res, next) {
    res.render('resultBatchTimeout');
});

router.get('/MaxMessageCount', function(req, res, next) {
    res.render('resultMaxMessageCount');
});

router.get('/AbsoluteMaxBytes', function(req, res, next) {
    res.render('resultAbsoluteMaxBytes');
});

router.get('/PreferredMaxBytes', function(req, res, next) {
    res.render('resultPreferredMaxBytes');
});

module.exports = router;
