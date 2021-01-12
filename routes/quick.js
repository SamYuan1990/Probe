const express = require('express');
const router = express.Router();
const log4js = require('log4js');
const logger = log4js.getLogger('app');
/* GET config page. */

router.get('/config', function(req, res, next) {
    logger.info(req.query);
    res.render('config');
});

/* router.get('/BatchTimeout', function(req, res, next) {
    logger.info(req.query);
    if (req.query.DryRun) {
        req.post('/api/run').set('Content-Type', 'application/x-www-form-urlencoded').send(
            {
                Path: './fabric-samples/test-network/',
                BatchTimeout:'1,2,4,8',
                MaxMessageCount:'10',
                AbsoluteMaxBytes:'3',
                PreferredMaxBytes:'512',
                CoolDown:'5',
                PrepareCLI:'./prepareConfig.sh',
                StartCLI:'./network.sh',
                CCDeployCLI:'./network.sh',
                TapeCount: '5000',
                ShutDownCLI: './network.sh',
                DryRun: true});
    } else {
        req.post('/api/run').set('Content-Type', 'application/x-www-form-urlencoded').send(
            {
                Path: './fabric-samples/test-network/',
                BatchTimeout:'1,2,4,8',
                MaxMessageCount:'10',
                AbsoluteMaxBytes:'3',
                PreferredMaxBytes:'512',
                CoolDown:'5',
                PrepareCLI:'./prepareConfig.sh',
                StartCLI:'./network.sh',
                CCDeployCLI:'./network.sh',
                TapeCount: '5000',
                ShutDownCLI: './network.sh'});
    }
    res.send('process start at ' + new Date().toString() + ' go to /result to see result');
});

router.get('/MaxMessageCount', function(req, res, next) {
    logger.info(req.query);
    if (req.query.DryRun) {
        req.post('/api/run').set('Content-Type', 'application/x-www-form-urlencoded').send(
            {
                Path: './fabric-samples/test-network/',
                BatchTimeout:'1',
                MaxMessageCount:'10,20,30',
                AbsoluteMaxBytes:'3',
                PreferredMaxBytes:'512',
                CoolDown:'5',
                PrepareCLI:'./prepareConfig.sh',
                StartCLI:'./network.sh',
                CCDeployCLI:'./network.sh',
                TapeCount: '5000',
                ShutDownCLI: './network.sh',
                DryRun: true});
    } else {
        req.post('/api/run').set('Content-Type', 'application/x-www-form-urlencoded').send(
            {
                Path: './fabric-samples/test-network/',
                BatchTimeout:'1',
                MaxMessageCount:'10,20,,30',
                AbsoluteMaxBytes:'3',
                PreferredMaxBytes:'512',
                CoolDown:'5',
                PrepareCLI:'./prepareConfig.sh',
                StartCLI:'./network.sh',
                CCDeployCLI:'./network.sh',
                TapeCount: '5000',
                ShutDownCLI: './network.sh'});
    }
    res.send('process start at ' + new Date().toString() + ' go to /result to see result');
});*/
module.exports = router;
