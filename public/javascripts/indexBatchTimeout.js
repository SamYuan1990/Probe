const xmlhttp = new XMLHttpRequest();
xmlhttp.open('GET', '../api/get?data=BatchTimeout&orderby=BatchTimeout', false);
xmlhttp.send();
const BatchTimeout = xmlhttp.responseText.split(',');

xmlhttp.open('GET', '../api/get?data=TPS&orderby=BatchTimeout', false);
xmlhttp.send();
const TPS = xmlhttp.responseText.split(',');

xmlhttp.open(
  'GET',
  '../api/get?data=MaxMessageCount&orderby=BatchTimeout',
  false
);
xmlhttp.send();
const MaxMessageCount = xmlhttp.responseText.split(',');

xmlhttp.open(
  'GET',
  '../api/get?data=AbsoluteMaxBytes&orderby=BatchTimeout',
  false
);
xmlhttp.send();
const AbsoluteMaxBytes = xmlhttp.responseText.split(',');

xmlhttp.open(
  'GET',
  '../api/get?data=PreferredMaxBytes&orderby=BatchTimeout',
  false
);
xmlhttp.send();
const PreferredMaxBytes = xmlhttp.responseText.split(',');

const Turn1 = {
  opacity: 0.5,
  color: 'rgb(255,0,0)',
  type: 'scatter3d',
  x: BatchTimeout,
  y: MaxMessageCount,
  z: TPS,
  scene: 'scene1',
};

const Turn2 = {
  opacity: 0.5,
  color: 'rgb(0,255,0)',
  type: 'scatter3d', // 'mesh3d',
  x: BatchTimeout,
  y: AbsoluteMaxBytes,
  z: TPS,
  scene: 'scene2',
};

const Turn3 = {
  opacity: 0.5,
  color: 'rgb(0,0,255)',
  type: 'scatter3d',
  x: BatchTimeout,
  y: PreferredMaxBytes,
  z: TPS,
  scene: 'scene3',
};

const layout = {
  scene1: {
    domain: {
      x: [0.0, 0.33],
      y: [0.5, 1.0],
    },
  },
  scene2: {
    domain: {
      x: [0.33, 0.66],
      y: [0.5, 1.0],
    },
  },
  scene3: {
    domain: {
      x: [0.66, 0.99],
      y: [0.5, 1.0],
    },
  },
  height: 600,
  margin: {
    l: 0,
    r: 0,
    b: 0,
    t: 0,
    pad: 0,
  },
};

Plotly.newPlot('myDiv', [Turn1, Turn2, Turn3], layout);
