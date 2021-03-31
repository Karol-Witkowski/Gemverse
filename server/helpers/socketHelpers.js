const {
  NEW_MESSAGE,
  GET_MESSAGES,
} = require('../actions/socketActions');

module.exports = {
  handleJoinRoom: (socket, data) => {
    socket.join(data.room._id, async () => {
    socket.emit('updateRoom',
      JSON.stringify({
        messages: await GET_MESSAGES(data),
      })
    );
    socket.to(data.room._id).emit('updateMessage',
    JSON.stringify(
      await NEW_MESSAGE({
        message: data.message,
        room: data.room,
        user: false,
      })
    ));
  })
 }
};
