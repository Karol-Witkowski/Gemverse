const { emitMessagesToRoom } = require('../repositories/messageRepository');
const { updateOnlineUsers } = require('../actions/socketActions');

module.exports = {
  handleJoinRoom: async (socket, data) => {
    socket.join(data.room._id);
    socket.emit('updateRoom', {
      messages: await emitMessagesToRoom(data.room._id),
      room: await updateOnlineUsers(data),
    });
    socket.to(data.room._id).emit('userMoved', await updateOnlineUsers(data));
  },
};
