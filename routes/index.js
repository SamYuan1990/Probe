const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index');
});

router.get('/result', function(req, res, next) {
    res.render('result');
});

module.exports = router;
