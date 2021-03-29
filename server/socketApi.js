const socketio = require('socket.io');
const { handleJoinRoom } = require('./helpers/socketHelpers');
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
  let currentRoom = '';

  socket.on('createRoom', (data) => {
    data.password === '';
    io.emit('updateRoomList', data);
  });

  socket.on('joinRoom', (data) => {
    currentRoom = data.room._id;
    data.socketId = socket.id;
    HandleJoinRoom(socket, data);
  });

  socket.on('deleteRoom', (roomId) => {
    io.emit('removeRoomFromList', roomId);
  });

  socket.on('sendMessage', (messageContent, creator) => {
    io.to(currentRoom).emit('updateMessages', messageContent, creator);
  });
});

module.exports = socketApi;
