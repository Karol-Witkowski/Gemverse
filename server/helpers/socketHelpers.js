const {
  newMessage,
  getMessages,
} = require('../actions/socketActions');

module.exports = {
  handleJoinRoom: (socket, data) => {
    socket.join(data.room._id, async () => {
    socket.emit('updateRoomData',
      JSON.stringify({
        messages: await getMessages(data),
        })
    );
    socket.broadcast.to(data.room._id).emit('updateMessage',
    JSON.stringify(
      await newMessage({
        room: data.room,
        user: false,
        content: data.content,
      })
    ));
  })
 }
};
