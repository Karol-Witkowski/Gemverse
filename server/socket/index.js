const socketIo = require('socket.io');
const { emitNewMessage } = require('../repositories/messageRepository');
const { filterActiveUsers } = require('../actions/socketActions');
const { handleJoinRoom } = require('../helpers/socketHelpers');

require('../db/mongoose');

const io = socketIo({
  cors: {
    credentials: true,
    methods: ['CREATE', 'DELETE', 'GET', 'POST'],
    origin: 'http://localhost:8080',
  },
});
const socketApi = {};

socketApi.io = io;

io.on('connection', (socket) => {
  let currentStatus = null;

  socket.on('createRoom', (data) => {
    data.password === '';
    io.emit('updateRoomList', data);
  });

  socket.on('deleteRoom', (data) => {
    io.emit('removeRoomFromList', data);
  });

  socket.on('disconnect', async () => {
    if (currentStatus) {
      socket.to(currentStatus.room._id).emit(
        'userDisconnected',
        await filterActiveUsers({
          currentRoomId: currentStatus.room._id,
          currentUserId: currentStatus.user._id,
          socketId: socket.id,
        })
      );
    }
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
    const message = await emitNewMessage(data);

    io.to(data.room).emit('updateMessages', JSON.stringify(message));
  });
});

module.exports = socketApi;
