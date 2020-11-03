const express = require('express');
const router = express.Router();
const libs = require('../lib/libs');
const fileIO = require('../lib/fileIO');
const log4js = require('log4js');
const logger = log4js.getLogger('app');

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

function prepareArray(input) {
    const array = input.toString().split(',');
    const data = [];
    array.forEach(element => {
        data.push(parseFloat(element));
    });
    return data;
}

router.get('/run', function(req, res, next) {
    let status = 0;
    fileIO.init();
    logger.log(req.query);
    const CmdInfo = {
        Chaincode:'sample',
        Path: req.query.Path,
        CoolDown: parseFloat(req.query.CoolDown),
        PrepareCLI: req.query.PrepareCLI,
        StartCLI: req.query.StartCLI,
        CCDeployCLI: req.query.CCDeployCLI,
        ShutDownCLI: req.query.ShutDownCLI,
        tapeCount: parseFloat(req.query.TapeCount),
        DryRun: false,
    };
    if (req.query.DryRun) {
        CmdInfo.DryRun = req.query.DryRun;
    }
    const BatchTimeout = prepareArray(req.query.BatchTimeout);
    const MaxMessageCount = prepareArray(req.query.MaxMessageCount);
    const AbsoluteMaxBytes = prepareArray(req.query.AbsoluteMaxBytes);
    const PreferredMaxBytes = prepareArray(req.query.PreferredMaxBytes);
    const d = new Date();
    logger.log('process start');
    status = libs.Run(CmdInfo, BatchTimeout, MaxMessageCount, AbsoluteMaxBytes, PreferredMaxBytes);
    if (status === 0) {
        logger.log(new Date().toString());
        res.send(d.toString() + ' success at ' + new Date().toString());
    } else {
        logger.error('error');
        res.sendStatus(500);
    }
});

module.exports = router;
