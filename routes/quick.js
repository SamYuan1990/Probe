const express = require('express');
const router = express.Router();
const log4js = require('log4js');
const logger = log4js.getLogger('app');
/* GET config page. */

router.get('/config', function(req, res, next) {
    logger.info(req.query);
    res.render('config');
});

module.exports = router;
