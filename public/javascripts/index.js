const xmlhttp = new XMLHttpRequest();
xmlhttp.open('GET', './api/get?data=BatchTimeout', false);
xmlhttp.send();
const BatchTimeout = xmlhttp.responseText.split(',');

xmlhttp.open('GET', './api/get?data=TPS', false);
xmlhttp.send();
const TPS = xmlhttp.responseText.split(',');

xmlhttp.open('GET', './api/get?data=MaxMessageCount', false);
xmlhttp.send();
const MaxMessageCount = xmlhttp.responseText.split(',');

xmlhttp.open('GET', './api/get?data=AbsoluteMaxBytes', false);
xmlhttp.send();
const AbsoluteMaxBytes = xmlhttp.responseText.split(',');

xmlhttp.open('GET', './api/get?data=PreferredMaxBytes', false);
xmlhttp.send();
const PreferredMaxBytes = xmlhttp.responseText.split(',');

const Turn1 =  {
    opacity: 0.5,
    color: 'rgba(255,127,80,0.7)',
    type: 'scatter3d',
    x: BatchTimeout,
    y: MaxMessageCount,
    z: TPS,
    scene: 'scene1'
};

const Turn2 =  {
    opacity: 0.5,
    color: 'pink',
    type: 'scatter3d', // 'mesh3d',
    x: BatchTimeout,
    y: AbsoluteMaxBytes,
    z: TPS,
    scene: 'scene2'
};

const Turn3 = {
    opacity:0.4,
    color:'rgb(033,255,100)',
    type: 'scatter3d',
    x: BatchTimeout,
    y: PreferredMaxBytes,
    z: TPS,
    scene: 'scene3',
};

const Turn4 = {
    opacity: 0.5,
    color:'rgb(200,100,200)',
    type: 'scatter3d',
    x: MaxMessageCount,
    y: AbsoluteMaxBytes,
    z: TPS,
    scene: 'scene4'
};

const Turn5 =  {
    opacity: 0.5,
    color:'rgb(00,150,200)',
    type: 'scatter3d',
    x: MaxMessageCount,
    y: PreferredMaxBytes,
    z: TPS,
    scene: 'scene5',
};

const Turn6 =  {
    opacity: 0.5,
    color:'rgb(033,150,200)',
    type: 'scatter3d',
    x: AbsoluteMaxBytes,
    y: PreferredMaxBytes,
    z: TPS,
    scene: 'scene6',
};

const layout = {
    scene1: {
        domain: {
            x: [0.0,  0.33],
            y: [0.5, 1.0]
        },},
    scene2: {
        domain: {
            x: [0.33, 0.66],
            y: [0.5, 1.0]
        }},
    scene3: {
        domain: {
            x: [0.66, 0.99],
            y: [0.5, 1.0]
        }},
    scene4: {
        domain: {
            x: [0.0,  0.33],
            y: [0, 0.5]
        },},
    scene5: {
        domain: {
            x: [0.33, 0.66],
            y: [0, 0.5]
        }},
    scene6: {
        domain: {
            x: [0.66, 0.99],
            y: [0, 0.5]
        },},
    height: 600,
    margin: {
        l: 0,
        r: 0,
        b: 0,
        t: 0,
        pad: 0
    },
};

Plotly.newPlot('myDiv', [Turn1, Turn2, Turn3, Turn4, Turn5, Turn6], layout);