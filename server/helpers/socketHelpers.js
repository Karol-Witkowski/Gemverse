const {
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
    socket.to(data.room._id)
      .emit('userMoved', await UPDATE_ACTIVE_USERS(data));
  },
};
