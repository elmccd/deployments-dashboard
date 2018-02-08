const express = require('express');
const _ = require('lodash');

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server, { path: '/ws' });

const clients = {
  sockets: [],
};

server.listen(3003);
console.log(`Listening on ${3003}`);

app.use(express.json());
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

app.post('/', (req, res) => {
  try {
    if (req.body.id && req.body.build.status) {
      setServer(req.body);
      res.sendStatus(200);
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

function getStatusData(serverId) {
  return {
    id: serverId,
    destination: 'http://127.0.0.1',
    timestamp: 1518112373437,
    build: {
      id: '56',
      link: 'http://google.com',
      status: ['pending', 'fail', 'success'][Math.floor(Math.random() * 3)],
      commit: '9121877b63df7812fe9968d6256a68c2ccebe139',
      commitLink: 'https://github.com',
    },
  };
}

io.on('connection', (socket) => {
  console.log('connection');
  clients.sockets.push(socket);

  Object.keys(servers).forEach((serverId) => {
    emit(servers[serverId], socket);
  });

  socket.on('getStatus', (serverId) => {
    console.log('server', serverId);
    emit(servers[serverId], socket);
  });

  socket.on('disconnect', () => {
    console.log('disconnect');
    clients.sockets = _.without(clients, socket);
    console.log('clients', clients.sockets.length);
  });
});
