const {
  newMessage,
  getMessages,
} = require('../actions/socketActions');

module.exports = {
  handleJoinRoom: (socket, data) => {
    socket.join(data.room._id, async () => {
    socket.emit('updateRoom',
      JSON.stringify({
        messages: await getMessages(data),
        })
    );
    socket.to(data.room._id).emit('updateMessage',
    JSON.stringify(
      await newMessage({
        message: data.message,
        room: data.room,
        user: false,
      })
    ));
  })
 }
};
