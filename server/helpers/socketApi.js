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

io.on('connection', (socket) => {
  socket.on('createRoom', (roomName, roomPassword) => {
    io.emit('newRoom', roomName, roomPassword)
  });
});

module.exports = socketApi;
