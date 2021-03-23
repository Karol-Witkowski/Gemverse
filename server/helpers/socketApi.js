const socketio = require('socket.io');
const io = socketio({
  cors: {
    credentials: true,
    methods: ['DELETE', 'GET', 'POST'],
    origin: 'http://localhost:8080'
  }
});
const socketApi = {};

socketApi.io = io;

io.on('connection', (socket) => {
  socket.on('createRoom', (roomId, roomName, roomPassword, roomSlug, roomCreator) => {
    let locked = roomPassword !== '';
    io.emit('updateRoomList', roomId, roomName, locked, roomSlug, roomCreator);
  });

  socket.on('deleteRoom', (roomIndex) => {
    io.emit('removeRoomFromList', roomIndex);
});
});

module.exports = socketApi;
