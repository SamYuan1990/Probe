const parse = require('csv-parse/lib/sync');
const fs = require('fs');

exports.BatchTimeout = 'BatchTimeout';
exports.MaxMessageCount = 'MaxMessageCount';
exports.AbsoluteMaxBytes = 'AbsoluteMaxBytes';
exports.PreferredMaxBytes = 'PreferredMaxBytes';
exports.TPS = 'TPS';

exports.loadRs = function loadRs(lab) {
    const rs = [];
    const input = fs.readFileSync('./data/rs.csv', 'utf-8');
    const records = parse(input, {
        columns: true,
        skip_empty_lines: true
    });
    records.forEach(element => {
        if (lab === this.BatchTimeout) {
            rs.push(+element.BatchTimeout);
        }
        if (lab === this.MaxMessageCount) {
            rs.push(+element.MaxMessageCount);
        }
        if (lab === this.AbsoluteMaxBytes) {
            rs.push(+element.AbsoluteMaxBytes);
        }
        if (lab === this.PreferredMaxBytes) {
            rs.push(+element.PreferredMaxBytes);
        }
        if (lab === this.TPS) {
            rs.push(+element.TPS);
        }
    });
    return rs;
};


exports.init = function init() {
    try {
        fs.unlinkSync('./data/rs.csv');
        fs.appendFileSync('./data/rs.csv', 'Chaincode,BatchTimeout,MaxMessageCount,AbsoluteMaxBytes,PreferredMaxBytes,TPS,');
    } catch (err) {
        /* 处理错误 */
        console.log(err);
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