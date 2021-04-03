const {
  GET_MESSAGES,
  NEW_MESSAGE,
} = require('../actions/socketActions');

module.exports = {
  handleJoinRoom: async (socket, data) => {
    socket.join(data.room._id);
    socket.emit('updateRoom', await GET_MESSAGES(data));
  }
};
