const express = require('express');
const router = express.Router();
const log4js = require('log4js');
const logger = log4js.getLogger('app');
/* GET config page. */

router.get('/config', function(req, res, next) {
    logger.info(req.query);
    res.render('config');
});

router.get('/BatchTimeout', function(req, res, next) {
    logger.info(req.query);
    const url = '/api/run?Path=.%2Ffabric-samples%2Ftest-network%2F&BatchTimeout=0.125%2C0.25%2C0.5%2C1%2C2%2C4%2C8&MaxMessageCount=50000&AbsoluteMaxBytes=20&PreferredMaxBytes=20480&CoolDown=5&PrepareCLI=.%2FprepareConfig.sh&StartCLI=.%2Fnetwork.sh&CCDeployCLI=.%2Fnetwork.sh&TapeCount=50000&ShutDownCLI=.%2Fnetwork.sh';
    if (req.query.DryRun) {
        res.redirect(url + '&DryRun=true');
    } else {
        res.redirect(url);
    }
});

router.get('/MaxMessageCount', function(req, res, next) {
    logger.info(req.query);
    const url = '/api/run?Path=.%2Ffabric-samples%2Ftest-network%2F&BatchTimeout=0.25&MaxMessageCount=10%2C20%2C40%2C80%2C160%2C320%2C640%2C1280&AbsoluteMaxBytes=20&PreferredMaxBytes=20480&CoolDown=5&PrepareCLI=.%2FprepareConfig.sh&StartCLI=.%2Fnetwork.sh&CCDeployCLI=.%2Fnetwork.sh&TapeCount=50000&ShutDownCLI=.%2Fnetwork.sh';
    if (req.query.DryRun) {
        res.redirect(url + '&DryRun=true');
    } else {
        res.redirect(url);
    }
});
module.exports = router;
