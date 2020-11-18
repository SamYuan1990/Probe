const parse = require('csv-parse/lib/sync');
const fs = require('fs');
const log4js = require('log4js');
const logger = log4js.getLogger('app');

exports.BatchTimeout = 'BatchTimeout';
exports.MaxMessageCount = 'MaxMessageCount';
exports.AbsoluteMaxBytes = 'AbsoluteMaxBytes';
exports.PreferredMaxBytes = 'PreferredMaxBytes';
exports.TPS = 'TPS';

function keySort(key) {
    return function(a, b) {
        return a[key] -  b[key];
    };
}

exports.loadRs = function loadRs(data, orderby) {
    const rs = [];
    const input = fs.readFileSync('./data/rs.csv', 'utf-8');
    const records = parse(input, {
        columns: true,
        skip_empty_lines: true
    });
    let orderedRecords = records;
    if (orderby) {
        orderedRecords = records.sort(keySort(orderby));
    }
    orderedRecords.forEach(element => {
        rs.push(+element[data]);
    });
    return rs;
};


exports.init = function init() {
    try {
        fs.unlinkSync('./data/rs.csv');
        fs.appendFileSync('./data/rs.csv', 'Chaincode,BatchTimeout,MaxMessageCount,AbsoluteMaxBytes,PreferredMaxBytes,TPS,');
    } catch (err) {
        /* 处理错误 */
        logger.error(err);
    }
};

exports.appendRS = function appendRS(data) {
    try {
        fs.appendFileSync('./data/rs.csv', '\n' + data);
    } catch (err) {
        /* 处理错误 */
    }
    return 0;
};
