const {
  GET_MESSAGES,
  NEW_MESSAGE,
} = require('../actions/socketActions');

module.exports = {
  handleJoinRoom: async (socket, data) => {
    socket.join(data.room._id);
    socket.emit('updateRoom', await GET_MESSAGES(data));
   /*  socket.to(data.room._id).emit('updateMessage',
    JSON.stringify(
      NEW_MESSAGE({
        message: data.message,
        room: data.room,
        user: false,
      })
    )); */
 }
};
