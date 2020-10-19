const fs = require('fs');
const path = require('path');
const parse = require('csv-parse/lib/sync');

exports.BatchTimeout = 'BatchTimeout'
exports.MaxMessageCount = 'MaxMessageCount'
exports.AbsoluteMaxBytes = 'AbsoluteMaxBytes'
exports.PreferredMaxBytes = 'PreferredMaxBytes'
exports.TPS = 'TPS'

exports.loadRs = function loadRs(lab){
    var rs = [];
    var input = fs.readFileSync('./data/rs.csv','utf-8');
    const records = parse(input, {
        columns: true,
        skip_empty_lines: true
      });
    records.forEach(element =>{
            if (lab == this.BatchTimeout){
                rs.push(+element.BatchTimeout);
            }
            if (lab == this.MaxMessageCount){
                rs.push(+element.MaxMessageCount);
            }
            if (lab == this.AbsoluteMaxBytes){
                rs.push(+element.AbsoluteMaxBytes);
            }
            if (lab == this.PreferredMaxBytes){
                rs.push(+element.PreferredMaxBytes);
            }
            if (lab == this.TPS){
                rs.push(+element.TPS);
            }
      }); 
    return rs;
}