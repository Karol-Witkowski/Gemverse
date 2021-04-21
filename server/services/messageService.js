const Message = require('../models/Message');

const getMessages = async (roomId) => {
	return await Message.find({ room: roomId });
};

const createMessage = async (data) => {
	new Message({
    message: data.body.message,
    user: data.body.user,
    room: data.body.room,
  }).save();
};

module.exports = {
  createMessage,
	getMessages
};
