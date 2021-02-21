const chalk = require('chalk');
const socketio = require('socket.io');
const io = socketio({
  cors: {
    origin: "http://localhost:8080",
    methods: ["GET", "POST"],
    credentials: true
  }
});
const socketApi = {};

socketApi.io = io;

io.on('connect', function (socket) {
  socket.on('createRoom', (data) => {
    io.emit('newRoom', data)
  });
});

module.exports = socketApi;
