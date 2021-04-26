const Message = require('../models/Message');

const createMessage = async (data) => {
	return new Message({
    message: data.message,
    user: data.user,
    room: data.room
  }).save();
};

const deleteRoomMessages = async (data) => {
	return Message.deleteMany({ room: data });
};

const emitNewMessage = async (data) => {
  return Message.populate(data, {
    path: 'user',
    select: 'username'
  });
};

const emitMessagesToRoom = async (data) => {
  return Message.find({ room: data })
    .populate(
      'user',
      ['username']
    );
};

module.exports = {
  createMessage,
  deleteRoomMessages,
  emitNewMessage,
  emitMessagesToRoom
};
