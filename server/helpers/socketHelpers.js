const {
  GET_ACTIVE_USERS,
  GET_MESSAGES,
  UPDATE_ACTIVE_USERS
} = require('../actions/socketActions');

module.exports = {
  handleJoinRoom: async (socket, data) => {
    socket.join(data.room._id);
    socket.emit('updateRoom', {
      messages: await GET_MESSAGES(data),
      room: await UPDATE_ACTIVE_USERS(data)
    });
    socket.broadcast.to(data.room._id).emit('updateActiveUsers', JSON.stringify(await GET_ACTIVE_USERS(data)));
  },
};
