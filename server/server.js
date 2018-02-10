const express = require('express');
const _ = require('lodash');
const bodyParser = require('body-parser');

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server, { path: '/ws' });

const clients = {
  sockets: [],
};

const PORT = process.env.SERVER_PORT || 3003;

server.listen(PORT);
console.log(`Listening on ${PORT}`);

app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', express.static('../dist'));

const servers = {};

function emit(data, socket) {
  console.log('emitting', data);
  socket.emit('status', data);
}

function setServer(data) {
  if (data.persistent) {
    servers[data.id] = _.merge(servers[data.id], data);
  } else {
    servers[data.id] = data;
  }
  servers[data.id].timestamp = Date.now();

  console.log('sending to ', clients.sockets.length);

  clients.sockets.forEach((clientSocket) => {
    Object.keys(servers).forEach((serverId) => {
      emit(servers[serverId], clientSocket);
    });
  });
}

function mapStatus(state) {
  console.log('state', state);
  return {
    Pending: 'pending',
    Passed: 'success',
    Fixed: 'success',
    Broken: 'fail',
    Failed: 'fail',
    'Still Failing': 'fail',
    Canceled: 'cancel',
    Errored: 'fail',
  }[state] || 'unknown';
}

function convertTravisPayload(travis) {
  return {
    id: travis.branch,
    build: {
      id: travis.number,
      status: mapStatus(travis.status_message),
      status_message: travis.status_message,
      link: travis.build_url,
      commit: travis.commit,
      message: travis.message,
      author: travis.author_name,
      compare_url: travis.compare_url,
      committer: travis.committer_name,
    },
  };
}

app.post('/track/travis', (req, res) => {
  console.log('POST');
  console.log(req.body);
  try {
    if (req.body.id) {
      const payload = convertTravisPayload(req.body);

      // overwrite travis with query params
      Object.keys(req.query).forEach((key) => {
        _.set(payload, key, req.query[key]);
      });

      setServer(payload);
      res.json(payload);
      return;
    }
    res.sendStatus(500);
  } catch (err) {
    res.sendStatus(500);
  }
});

app.get('/track', (req, res) => {
  const payload = {};

  Object.keys(req.query).forEach((key) => {
    _.set(payload, key, req.query[key]);
  });

  if (payload.id && payload.build.status) {
    res.json(payload);
    setServer(payload);
  } else {
    res.sendStatus(500);
  }
});

io.on('connection', (socket) => {
  console.log('connection');
  clients.sockets.push(socket);

  Object.keys(servers).forEach((serverId) => {
    console.log('initial emit');
    emit(servers[serverId], socket);
  });

  socket.on('getStatus', (serverId) => {
    console.log('getStatus', serverId);
    emit(servers[serverId], socket);
  });

  socket.on('disconnect', () => {
    console.log('disconnect');
    clients.sockets = _.without(clients, socket);
    console.log('clients', clients.sockets.length);
  });
});
