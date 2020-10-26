const fs = require('fs');
const path = require('path');
const parse = require('csv-parse/lib/sync');
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

exports.run = function run(CmdInfo,BatchTimeout,MaxMessageCount,AbsoluteMaxBytes,PreferredMaxBytes){
  //var tapeCmd = 'docker';
  //var startup = CmdInfo.StartCLI; //'/minifab';
  //var teardown = CmdInfo.ShutDownCLI; //'/minifab';
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
          this.startup(CmdInfo,TurnInfo);
          this.sleep(CmdInfo);
          TPS = this.tapeTPS(CmdInfo); 
          this.sleep(CmdInfo);
          this.teardown(CmdInfo);
          //'sample,0.75,10,2,256, 180.038278,'
          this.appendRS(TurnInfo.Chaincode+','+
                   TurnInfo.BatchTimeout+','+
                   TurnInfo.MaxMessageCount+','+
                   TurnInfo.AbsoluteMaxBytes+','+
                   TurnInfo.PreferredMaxBytes+','+
                   TPS+',');
          console.log('start cold down');
          this.sleep(CmdInfo);
          console.log('end of cold down');
        })
      })
    })
  });
  return 0;
}

exports.sleep = function sleep(CmdInfo){
  rs = process.spawnSync('sleep',[CmdInfo.CoolDown]);
  //console.log(rs.status);
  if (rs.status !=0) {
    console.log(rs);
    console.log(rs.stderr.toString('utf-8'));
  }
  return rs.status;
}

exports.prepare = function prepare(CmdInfo,TurnInfo){
  if (CmdInfo.PrepareCLI=='echo'){
    return 0
  }
  rs = process.spawnSync(path.resolve('./minifabric/')+CmdInfo.PrepareCLI,[
    TurnInfo.BatchTimeout,
    TurnInfo.MaxMessageCount,
    TurnInfo.AbsoluteMaxBytes,
    TurnInfo.PreferredMaxBytes,
    '-n',
    TurnInfo.Chaincode,
  ]);
  if (rs.status !=0) {
    console.log(rs);
    console.log(rs.stderr.toString());
  } else {
    console.log('prepare success');
  }
}

exports.startup = function startup(CmdInfo){
  if (CmdInfo.StartCLI=='echo'){
    return 0
  }
  //./prepareConfig.sh $BatchTimeout $MaxMessageCount $AbsoluteMaxBytes $PreferredMaxBytes -n $chaincode
  rs = process.spawnSync(path.resolve('./minifabric/')+CmdInfo.StartCLI,['up']);
  if (rs.status !=0) {
    console.log(rs);
    console.log(rs.stderr.toString());
  } else {
    console.log('network start success');
  }
  //console.log(rs.status);
  return rs.status;
}

exports.teardown = function teardown(CmdInfo){
  if (CmdInfo.ShutDownCLI=='echo'){
    return 0
  }
  rs = process.spawnSync(path.resolve('./minifabric/')+CmdInfo.ShutDownCLI,['cleanup']);
  if (rs.status !=0) {
    console.log(rs.stderr.toString());
  } else {
    console.log('network cleanup success');
  }
  return rs.status;
}

// docker run --name tape -e TAPE_LOGLEVEL=debug --network minifab -v $PWD:/config tape tape /config/config.yaml 500
exports.tapeTPS = function tapeTPS(CmdInfo){
  // so far for testing
    if (CmdInfo.TapeCLI=='echo'){
      return 1
    }
    rs = process.spawnSync(CmdInfo.TapeCLI,[
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
      5000//CmdInfo.tapeConfig,CmdInfo.tapeCount
    ]);
    if (rs.status !=0) {
      console.log(rs.stderr.toString());
    } else {
      console.log('tape success');
    }
     str=rs.output.toString('utf-8',0);
     str = str.substring(str.indexOf('tps:'));
     str = str.substring(0,str.indexOf('\n'));
     str = str.substring(4);
     console.log(str);
     return str;
}
