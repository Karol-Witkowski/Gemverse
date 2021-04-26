const Message = require('../models/Message');

const createMessage = async (data) => {
	return new Message({
    message: data.message,
    user: data.user,
    room: data.room,
  }).save();
};

const deleteRoomMessages = async (roomId) => {
	return Message.deleteMany({ room: roomId });
};

const emitMessagesToRoom = async (roomId) => {
  return Message.find({ room: roomId })
    .populate(
      'user',
      ['username']
    );
};

const emitNewMessage = async (data) => {
  const createdMessage = await createMessage(data);

  return Message.populate(createdMessage, {
    path: 'user',
    select: 'username'
  });
};

const getMessages = async (roomId) => {
	return Message.find({ room: roomId });
};

module.exports = {
  createMessage,
  deleteRoomMessages,
  emitMessagesToRoom,
  emitNewMessage,
	getMessages
};
