const socketio = require('socket.io');
const io = socketio({
  cors: {
    credentials: true,
    methods: ["GET", "POST"],
    origin: "http://localhost:8080"
  }
});
const socketApi = {};

socketApi.io = io;

io.on('connection', (socket) => {
  socket.on('createRoom', (roomName, roomPassword, roomSlug) => {
    let locked = (roomPassword !== '');
    io.emit('newRoom', roomName, locked, roomSlug);
  });
});

module.exports = socketApi;
