const mongoose = require('mongoose');
const socketio = require('socket.io');
const { handleJoinRoom }  = require('./helpers/socketHelpers');
const { ADD_NEW_MESSAGE, GET_ACTIVE_USERS } = require('./actions/socketActions');
require('./db/mongoose');

const io = socketio({
  cors: {
    credentials: true,
    methods: ['CREATE', 'DELETE', 'GET', 'POST'],
    origin: 'http://localhost:8080'
  }
});
const socketApi = {};
socketApi.io = io;

io.on('connection', (socket) => {
  let currentRoom = null;

  socket.on('createRoom', (data) => {
    data.password === '';
    io.emit('updateRoomList', data);
  });

  socket.on('deleteRoom', (roomId) => {
    io.emit('removeRoomFromList', roomId);
  });

  socket.on('joinRoom', (data) => {
    currentRoom = data.room._id;
    data.socketId = socket.id;
    handleJoinRoom(socket, data);
  });

  socket.on('leaveRoom', (data) => {
    currentRoom = null;
    socket.leave(data._id)
  });

  socket.on('sendMessage', async (data) => {
    const message = await ADD_NEW_MESSAGE(data);
    io.to(data.room._id).emit('updateMessages', JSON.stringify(message));
  });

  socket.on('disconnect', async () => {
    if (currentRoom) {
      socket.to(currentRoom).emit('updateActiveUsers', JSON.stringify(
        GET_ACTIVE_USERS({ room: {
          _id: mongoose.Types.ObjectId(currentRoom)
        }})
      ));
    };
  });
});

module.exports = socketApi;
