const path = require('path');
const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server, { path: '/ws' });

server.listen(3003);

app.get('/', (req, res) => {
  res.sendfile(path.join(__dirname, '/index.html'));
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

  socket.emit('status', getStatusData('wendy'));

  socket.on('getStatus', (serverId) => {
    console.log('server', serverId);
    socket.emit('status', getStatusData(serverId));
  });
});
