const mongoose = require('mongoose');
const socketio = require('socket.io');
const { handleJoinRoom }  = require('./helpers/socketHelpers');
const {
  ADD_NEW_MESSAGE,
  FILTER_ACTIVE_USERS,
  UPDATE_ACTIVE_USERS
} = require('./actions/socketActions');

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
  let currentStatus = null;

  socket.on('createRoom', (data) => {
    data.password === '';
    io.emit('updateRoomList', data);
  });

  socket.on('deleteRoom', (roomId) => {
    io.emit('removeRoomFromList', roomId);
  });

  socket.on('disconnect', async () => { // fix needed
    if (currentStatus) {
      const roomState = await FILTER_ACTIVE_USERS({
        currentRoomId: currentStatus.room._id,
        socketId: socket.id
    });
      // socket.to(currentStatus.room._id).emit('userDisconnected', await UPDATE_ACTIVE_USERS(currentStatus));
      socket.to(currentStatus.room._id).emit('userMoved', await UPDATE_ACTIVE_USERS(currentStatus));
    };
  });

  socket.on('joinRoom', (data) => {
    currentStatus = data;
    data.socketId = socket.id;
    handleJoinRoom(socket, data);
  });

  socket.on('leaveRoom', (data) => {
    currentStatus = null;
    socket.to(data._id).emit('userMoved', data);
    socket.leave(data._id);
  });

  socket.on('sendMessage', async (data) => {
    const message = await ADD_NEW_MESSAGE(data);
    io.to(data.room._id).emit('updateMessages', JSON.stringify(message));
  });
});

module.exports = socketApi;