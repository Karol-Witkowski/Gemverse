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
  console.log(chalk.bold.green('Socket connection established'));

  /** Delete this when finished */
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  socket.on('createRoom', (data) => {
    io.emit('newRoom', data)
  });
});

module.exports = socketApi;
