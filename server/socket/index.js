const socketio = require('socket.io');
const { handleJoinRoom }  = require('../helpers/socketHelpers');
const {
  ADD_NEW_MESSAGE,
  FILTER_ACTIVE_USERS,
} = require('../actions/socketActions');

require('../db/mongoose');

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

  socket.on('deleteRoom', (roomSlug) => {
    io.emit('removeRoomFromList', roomSlug);
  });

  socket.on('disconnect', async () => {
    if (currentStatus) {
      socket.to(currentStatus.room._id)
        .emit('userDisconnected', await FILTER_ACTIVE_USERS({
          currentRoomId: currentStatus.room._id,
          currentUserId: currentStatus.user._id,
          socketId: socket.id
        }));
    }
  });

  socket.on('joinRoom', (data) => {
    currentStatus = data;
    data.socketId = socket.id;
    handleJoinRoom(socket, data);
  });

  socket.on('leaveRoom', (data) => {
    currentStatus = null;
    socket.to(data._id)
      .emit('userMoved', data);
    socket.leave(data._id);
  });

  socket.on('sendMessage', async (data) => {
    const message = await ADD_NEW_MESSAGE(data);
    io.to(data.room._id)
      .emit('updateMessages', JSON.stringify(message));
  });
});

module.exports = socketApi;
