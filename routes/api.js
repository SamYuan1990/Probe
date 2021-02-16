const express = require('express');
const router = express.Router();
const libs = require('../lib/libs');
const fileIO = require('../lib/fileIO');
const log4js = require('log4js');
const logger = log4js.getLogger('app');
const fs = require('fs');

const lockFile = './data/lock';

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

// get?data=?&orderby=?
router.get('/get', function(req, res, next) {
    if (!req.query.orderby) {
        res.send(fileIO.loadRs(req.query.data));
    } else {
        res.send(fileIO.loadRs(req.query.data, req.query.orderby));
    }
});

function prepareArrayNew(input) {
    return input.split(',');
}

router.post('/run/new', function(req, res, next) {
    logger.info(req.body);
    res.send('process start at ' + new Date().toString() + ' go to /result to see result');
    fs.writeFileSync(lockFile, '123');
    fileIO.init();
    logger.info('process start');
    const BatchTimeout = prepareArrayNew(req.body.BatchTimeout);
    const MaxMessageCount = prepareArrayNew(req.body.MaxMessageCount);
    const AbsoluteMaxBytes = prepareArrayNew(req.body.AbsoluteMaxBytes);
    const PreferredMaxBytes = prepareArrayNew(req.body.PreferredMaxBytes);
    const cmdPath = req.body.path;
    const cmds = JSON.parse(req.body.cmd);
    let dryRun = false;
    if (req.body.dryRun) {
        dryRun = true;
    }
    logger.info('process start');
    const status = libs.RunNew(BatchTimeout, MaxMessageCount, AbsoluteMaxBytes, PreferredMaxBytes, dryRun, cmdPath, cmds);
    logger.info(status);
    fs.unlinkSync(lockFile);
});

module.exports = router;
