const io = require( "socket.io" )();
const socketapi = {
    io: io
};

io.on('connection', socket =>  {
  socket.broadcast.emit(
    'updateRoomList',
    JSON.stringify({
      room: Room.name.find({})
    })
  );
});

module.exports = socketapi;
