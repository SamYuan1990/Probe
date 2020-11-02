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
    return 0;
}

exports.run = function run(CmdInfo,BatchTimeout,MaxMessageCount,AbsoluteMaxBytes,PreferredMaxBytes){
  let status = 0;
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
          console.log('prepare phase');
          status = this.prepare(CmdInfo,TurnInfo);
          if (status != 0) {
            return status;
          }
          console.log('network start phase');
          status = this.startup(CmdInfo,TurnInfo);
          if (status != 0) {
            return status;
          }
          console.log('cool down for network');
          status = this.sleep(CmdInfo);
          if (status != 0) {
            return status;
          } 
          console.log('start testing');
          TPS = this.tapeTPS(CmdInfo); 
          if (TPS < 0) {
            console.log('error in testing');
            status = TPS;
            return status;
          }
          console.log('cool down');
          status = this.sleep(CmdInfo);
          if (status != 0) {
            return status;
          }
          console.log('tear down');
          status = this.teardown(CmdInfo);
          if (status != 0) {
            return status;
          }
          console.log('logging');
          status = this.appendRS(TurnInfo.Chaincode+','+
                   TurnInfo.BatchTimeout+','+
                   TurnInfo.MaxMessageCount+','+
                   TurnInfo.AbsoluteMaxBytes+','+
                   TurnInfo.PreferredMaxBytes+','+
                   TPS+',');
          if (status != 0) {
            return status;
          } 
          console.log('cold down');
          status = this.sleep(CmdInfo);
          if (status != 0) {
            return status;
          }
        })
      })
    })
  });
  return status;
}

function handleStatus(rs){
  if (rs.status !=0) {
    console.error(rs);
    console.error(rs.stderr.toString('utf-8'));
    return -1;
  } 
  return 0;
}

exports.sleep = function sleep(CmdInfo,TurnInfo){
  rs = process.spawnSync('sleep',[CmdInfo.CoolDown]);
  return handleStatus(rs);
}

exports.prepare = function prepare(CmdInfo,TurnInfo){
  if (CmdInfo.PrepareCLI=='echo'){
    return 0
  }
  rs = process.spawnSync(CmdInfo.PrepareCLI,[
    TurnInfo.BatchTimeout,
    TurnInfo.MaxMessageCount,
    TurnInfo.AbsoluteMaxBytes,
    TurnInfo.PreferredMaxBytes,
  ],{
    cwd:path.resolve(CmdInfo.Path)
  });
  return handleStatus(rs);
}

exports.startup = function startup(CmdInfo,TurnInfo){
  if (CmdInfo.StartCLI=='echo'){
    return 0
  }
  rs = process.spawnSync(CmdInfo.StartCLI,['up','createChannel','-i','2.2'],{
    cwd: path.resolve(CmdInfo.Path)
  });
  if (rs.status !=0) {
    console.log(rs);
    console.log(rs.stderr.toString());
  } else {
    console.log('network up createChannel success');
  }
  rs = process.spawnSync(CmdInfo.StartCLI,['deployCC','-d',TurnInfo.BatchTimeout],{
    cwd: path.resolve(CmdInfo.Path)
  });
  return handleStatus(rs);
}

exports.teardown = function teardown(CmdInfo,TurnInfo){
  if (CmdInfo.ShutDownCLI=='echo'){
    return 0
  }
  rs = process.spawnSync('docker',['rm','tape']);
  if (rs.status !=0) {
    console.log(rs.stderr.toString());
  } else {
    console.log('network cleanup success');
  }
  rs = process.spawnSync(CmdInfo.ShutDownCLI,['down'],{cwd: path.resolve(CmdInfo.Path)});
  return handleStatus(rs);
}

exports.tapeTPS = function tapeTPS(CmdInfo,TurnInfo){
    var command = PrepareTape(CmdInfo,TurnInfo);
    // so far for testing
    if (command.command=='echo'){
      return 0
    }
    rs = process.spawnSync(command.command,[
      command.args
    ]);
    if (rs.status !=0) {
      return handleStatus(rs);
    } 
    return TapeTpsFilter(rs);
}

exports.PrepareTape = function PrepareTape(CmdInfo,TurnInfo){
  var command = {};
  if (CmdInfo.TapeCLI=='echo'){
    return command.command = 'echo'
  }
  command.command = 'docker';
  command.args = ['run',
  '--name',
  'tape',
  '-e',
  'TAPE_LOGLEVEL=debug',
  '--network',
  'host',
  '-v',
  path.resolve('./')+':/config',
  'guoger/tape',
  'tape',
  '/config/config.yaml',
  CmdInfo.tapeCount];
  return command;
}

exports.TapeTpsFilter = function TapeTpsFilter(rs){
  str=rs.output.toString('utf-8',0);
  str = str.substring(str.indexOf('tps:'));
  str = str.substring(0,str.indexOf('\n'));
  str = str.substring(4);
  return str;
}