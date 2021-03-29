module.exports = {
  handleJoinRoom: (socket, data) => {
    socket.join(data.room._id);
  }
};
