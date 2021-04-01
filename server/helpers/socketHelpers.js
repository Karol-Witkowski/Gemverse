const {
  NEW_MESSAGE,
  GET_MESSAGES,
} = require('../actions/socketActions');

module.exports = {
  handleJoinRoom: async (socket, data) => {
    socket.join(data.room._id);
    await socket.emit('updateRoom',
      JSON.stringify({
        messages: GET_MESSAGES(data),
      })
    );
    console.log(this.messages);
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
