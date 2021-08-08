const todos = (state = {path:'./fabric-samples/test-network', BatchTimeout:'1', MaxMessageCount:'10', AbsoluteMaxBytes:'2', PreferredMaxBytes:'512', cmd:[{order:0, cmdType: 'Shell', args:['']}]}, action) => {
    switch (action.type) {
        case 'TEST_NET_CALIPER':
            state = {
                path:'./fabric-samples/test-network',
                BatchTimeout:'1,2',
                MaxMessageCount:'10',
                AbsoluteMaxBytes:'2',
                PreferredMaxBytes:'512',
                cmd:[
                    {order:0, cmdType: 'PrePare', args:['./prepareConfig.sh']},
                    {order:1, cmdType: 'Shell', args:['./network.sh', 'up', 'createChannel']},
                    {order:2, cmdType: 'Shell', args:['./network.sh', 'deployCC', '-d', '5', '-ccn', 'basic', '-ccp', '../asset-transfer-basic/chaincode-go/', '-ccl', 'go']},
                    {order:3, cmdType: 'Shell', args:['sleep', '10']},
                    {order:4, cmdType: 'Caliper', args:['docker',
                        'run',
                        '--name',
                        'caliper',
                        '-v',
                        './:/hyperledger/caliper/workspace',
                        '--network',
                        'host',
                        'hyperledger/caliper:0.4.2',
                        'launch',
                        'manager',
                        '--caliper-workspace',
                        'caliper-workspace',
                        '--caliper-networkconfig',
                        'networkConfig.yaml',
                        '--caliper-benchconfig',
                        'myAssetBenchmark.yaml',
                        '--caliper-flow-only-test',
                        '--caliper-fabric-gateway-enabled',
                        '--caliper-bind-sut',
                        'fabric:2.2']},
                    {order:5, cmdType: 'Shell', args:['docker', 'rm', 'caliper']},
                    {order:6, cmdType: 'Shell', args:['./network.sh', 'down']},
                    {order:7, cmdType: 'Shell', args:['sleep', '10']},
                ]};
            return state;
        case 'TEST_NET_MINIFAB':
            state = {
                path:'./minifabric',
                BatchTimeout:'1',
                MaxMessageCount:'10,20',
                AbsoluteMaxBytes:'103809024',
                PreferredMaxBytes:'524288',
                cmd:[
                    {order:0, cmdType: 'Shell', args:['./minifab', 'up', '-i', '2.2']},
                    {order:1, cmdType: 'Shell', args:['./minifab', 'channelquery', '-c', 'systemchannel']},
                    {order:2, cmdType: 'Shell', args:['cp', 'vars/systemchannel_config.json', 'updatedchannel.json']},
                    {order:3, cmdType: 'PrePare', args:['./prepareConfig.sh']},
                    {order:4, cmdType: 'Shell', args:['cp', 'updatedchannel.json', 'vars/systemchannel_config.json']},
                    {order:5, cmdType: 'Shell', args:['./minifab', 'channelsign,channelupdate', '-c', 'systemchannel']},
                    {order:6, cmdType: 'Shell', args:['mkdir', '-p', '/tmp/minifab']},
                    {order:7, cmdType: 'Shell', args:['cp', 'config.yaml', '/tmp/minifab']},
                    {order:8, cmdType: 'Shell', args:['cp', '-r', './vars', '/tmp/minifab']},
                    {order:9, cmdType: 'Tape', args:['docker',
                        'run',
                        '--name',
                        'tape',
                        '-e',
                        'TAPE_LOGLEVEL=debug',
                        '--network',
                        'mysite0',
                        '-v',
                        '/tmp/minifab:/config',
                        'guoger/tape',
                        'tape',
                        '-c',
                        '/config/config.yaml',
                        '-n',
                        '500']},
                    {order:10, cmdType: 'Shell', args:['docker', 'rm', 'tape']},
                    {order:11, cmdType: 'Shell', args:['rm', '-rf', '/tmp/minifab']},
                    {order:12, cmdType: 'Shell', args:['sleep', '10']},
                    {order:13, cmdType: 'Shell', args:['./minifab', 'down']},
                    {order:14, cmdType: 'Shell', args:['./minifab', 'cleanup']},
                ]};
            return state;
        case 'TEST_NET_SAMPLE':
            state = {
                path:'./fabric-samples/test-network',
                BatchTimeout:'1,2',
                MaxMessageCount:'10',
                AbsoluteMaxBytes:'2',
                PreferredMaxBytes:'512',
                cmd:[
                    {order:0, cmdType: 'PrePare', args:['./prepareConfig.sh']},
                    {order:1, cmdType: 'Shell', args:['./network.sh', 'up', 'createChannel']},
                    {order:2, cmdType: 'Shell', args:['./network.sh', 'deployCC', '-d', '5', '-ccn', 'basic', '-ccp', '../asset-transfer-basic/chaincode-go/', '-ccl', 'go']},
                    {order:3, cmdType: 'Shell', args:['sleep', '10']},
                    {order:4, cmdType: 'Tape', args:['docker',
                        'run',
                        '--name',
                        'tape',
                        '-e',
                        'TAPE_LOGLEVEL=debug',
                        '--network',
                        'host',
                        '-v',
                        './:/config',
                        'guoger/tape',
                        'tape',
                        '-c',
                        '/config/config.yaml',
                        '-n',
                        '500']},
                    {order:5, cmdType: 'Shell', args:['docker', 'rm', 'tape']},
                    {order:6, cmdType: 'Shell', args:['./network.sh', 'down']},
                    {order:7, cmdType: 'Shell', args:['sleep', '10']},
                ]};
            return state;
        case 'TEST_NET_MONITOR_SAMPLE':
            state = {
                path:'./fabric-samples/test-network',
                BatchTimeout:'1,2',
                MaxMessageCount:'10',
                AbsoluteMaxBytes:'2',
                PreferredMaxBytes:'512',
                cmd:[
                    {order:0, cmdType: 'PrePare', args:['./prepareConfig.sh']},
                    {order:1, cmdType: 'Shell', args:['./network.sh', 'up', 'createChannel']},
                    {order:2, cmdType: 'Shell', args:['./network.sh', 'deployCC', '-d', '5', '-ccn', 'basic', '-ccp', '../asset-transfer-basic/chaincode-go/', '-ccl', 'go']},
                    {order:3, cmdType: 'Shell', args:['sleep', '10']},
                    {order:4, cmdType: 'Shell', args:['docker', 'network', 'connect', 'net_test', 'prometheus']}, // docker 'network', 'connect', 'net_test', 'prometheus'
                    {order:5, cmdType: 'Tape', args:['docker',
                        'run',
                        '--name',
                        'tape',
                        '-e',
                        'TAPE_LOGLEVEL=debug',
                        '--network',
                        'host',
                        '-v',
                        './:/config',
                        'guoger/tape',
                        'tape',
                        '-c',
                        '/config/config.yaml',
                        '-n',
                        '500']},
                    {order:6, cmdType: 'Shell', args:['docker', 'rm', 'tape']},
                    {order:7, cmdType: 'Shell', args:['docker', 'network', 'disconnect', 'net_test', 'prometheus']}, // disconnect
                    {order:8, cmdType: 'Shell', args:['./network.sh', 'down']},
                    {order:9, cmdType: 'Shell', args:['sleep', '10']},
                ]};
            return state;
        case 'ADD_TODO':
            state.cmd.push({
                order: state.cmd.length,
                cmdType: 'Shell',
                args : ['']
            });
            return state;
        case 'REMOVE_TODO':
            state.cmd.pop();
            return state;
        case 'TYPE_TAPE':
            state.cmd.map(data => {
                if (data.order === action.order) {
                    data.cmdType = 'Tape';
                    data.args = [
                        'docker',
                        'run',
                        '--name',
                        'tape',
                        '-e',
                        'TAPE_LOGLEVEL=debug',
                        '--network',
                        'host',
                        '-v',
                        'your tape config folder:/config',
                        'guoger/tape',
                        'tape',
                        '-c',
                        '/config/config.yaml',
                        '-n',
                        'your number there'];
                }
            }
            );
            return state;
        case 'TYPE_SHELL':
            state.cmd.map(data => {
                if (data.order === action.order) {
                    data.cmdType = 'Shell';
                    data.args = [''];
                }
            }
            );
            return state;
        case 'TYPE_PREPARE':
            state.cmd.map(data => {
                if (data.order === action.order) {
                    data.cmdType = 'PrePare';
                    data.args = [''];
                }
            }
            );
            return state;
        case 'ADD_ARG':
            state.cmd.map(data => {
                if (data.order === action.order) {
                    data.args.push('');
                }
            }
            );
            return state;
        case 'REMOVE_ARG':
            state.cmd.map(data => {
                if (data.order === action.order) {
                    data.args.pop();
                }
            }
            );
            return state;
        case 'CHANGE_ARG':
            state.cmd.map(data => {
                if (data.order === action.order) {
                    data.args[action.index] = action.value;
                }
            }
            );
            return state;
        case 'CHANGE_PATH':
            state.path = action.value;
            return state;
        case 'CHANGE_BATCHTIMEOUT':
            state.BatchTimeout = action.value;
            return state;
        case 'CHANGE_MAXMSG':
            state.MaxMessageCount = action.value;
            return state;
        case 'CHANGE_ABS':
            state.AbsoluteMaxBytes = action.value;
            return state;
        case 'CHANGE_PREFERED':
            state.PreferredMaxBytes = action.value;
            return state;
        default:
            return state;
    }
};

export default todos;

/*
id:{
  orderer: id,
  cmdType: string,
  args : []
}
*/