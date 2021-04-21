const Message = require('../models/Message');

async function getMessages(roomId) {
	return await Message.find({ room: roomId });
}

async function createMessage(data) {
	new Message({
    message: data.body.message,
    user: data.body.user,
    room: data.body.room,
  }).save();
}

module.exports = {
  createMessage,
	getMessages
};
