const socketio = require('socket.io');
const { handleJoinRoom } = require('./helpers/socketHelpers');
const {
  newMessage,
} = require('./actions/socketActions');

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

  socket.on('sendMessage', async (data) => {
    const message = await newMessage(data);
    io.to(data.room._id).emit('updateMessages', JSON.stringify(message));
  });
});

module.exports = socketApi;
