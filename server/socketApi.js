const socketio = require('socket.io');
const { handleJoinRoom }  = require('./helpers/socketHelpers');
const { NEW_MESSAGE } = require('./actions/socketActions');

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
const actualRoom = '';

  socket.on('createRoom', (data) => {
    data.password === '';
    io.emit('updateRoomList', data);
  });

  socket.on('deleteRoom', (roomId) => {
    io.emit('removeRoomFromList', roomId);
  });

  socket.on('joinRoom', (data) => {
    actualRoom = data.room_id;
    data.socket = socket.id;
    handleJoinRoom(socket, data);
  });

  socket.on('sendMessage', async (data) => {
    const message = await NEW_MESSAGE(data);
    io.to(data.room._id).emit('updateMessages', JSON.stringify(message));
  });
});

module.exports = socketApi;
