const fs = require('fs');
const path = require('path');
const parse = require('csv-parse/lib/sync');
const sleep = require('system-sleep');
const process = require('child_process');

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

exports.init = function init(){
    try {
        fs.unlinkSync('./data/rs.csv')
        fs.appendFileSync('./data/rs.csv', 'Chaincode,BatchTimeout,MaxMessageCount,AbsoluteMaxBytes,PreferredMaxBytes,TPS,');
      } catch (err) {
        /* 处理错误 */
        console.log(err)
      }
}

exports.appendRS = function appendRS(data){
    try {
        fs.appendFileSync('./data/rs.csv', '\n'+data);
      } catch (err) {
        /* 处理错误 */
      }
}

/*CmdInfo
Startup
Teardown
Sleep
tapeConfig
tapeCount
*/
exports.run = function run(CmdInfo,BatchTimeout,MaxMessageCount,AbsoluteMaxBytes,PreferredMaxBytes){
  var tapeCmd = 'docker';
  var startup;
  var teardown;
  BatchTimeout.forEach(BatchTimeoutElement =>{
    MaxMessageCount.forEach(MaxMessageCountElement => {
      AbsoluteMaxBytes.forEach(AbsoluteMaxBytesElement => {
        PreferredMaxBytes.forEach(PreferredMaxBytesElement => {
          var TurnInfo = {
            Chaincode:CmdInfo.Chaincode,
            BatchTimeout:BatchTimeoutElement,
            MaxMessageCount:MaxMessageCountElement,
            AbsoluteMaxBytes:AbsoluteMaxBytesElement,
            PreferredMaxBytes:PreferredMaxBytesElement,
          }
          startup(startup,TurnInfo);
          tapeTPS = tapeTPS(CmdInfo,tapeCmd);
          TPS = convertTPS(tapeTPS);
          teardown(teardown);
          //'sample,0.75,10,2,256, 180.038278,'
          appendRS(TurnInfo.Chaincode+','+
                   TurnInfo.BatchTimeout+','+
                   TurnInfo.MaxMessageCountElement+','+
                   TurnInfo.AbsoluteMaxBytesElement+','+
                   TurnInfo.PreferredMaxBytesElement+','+
                   TPS+',');
          sleep(CmdInfo.Sleep*1000);
        })
      })
    })
  });
}

// docker run --name tape -e TAPE_LOGLEVEL=debug --network minifab -v $PWD:/config tape tape /config/config.yaml 500
exports.tapeTPS = function tapeTPS(CmdInfo,tapeCmd){
    rs = process.spawnSync(tapeCmd,[
      'run',
      '--name',
      'tape',
      '-e',
      'TAPE_LOGLEVEL=debug',
      '--network',
      'minifab',
      '-v',
      path.resolve('./')+':/config',
      'tape',
      'tape',
      '/config/config.yaml',
      500//CmdInfo.tapeConfig,CmdInfo.tapeCount
    ]);
     str=rs.output.toString('utf-8',0);
     str = str.substring(str.indexOf('tps:'));
     str = str.substring(0,str.indexOf('\n'));
     str = str.substring(4);
     return str;
}
