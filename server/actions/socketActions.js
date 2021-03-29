const { Message } = require('../models/Message');

module.exports = {
  newMessage: async (data) => {
    const message = await new Message({
      content: data.content,
      user: data.user._id || null,
      room: data.room._id
    }).save();

    return Message.populate(message, {
      path: 'user',
      select: 'username'
    });
  },
  getMessages: async data => {
    return await Message.find({ room: data.room._id }).populate('user', [
      'username',
    ]);
  },
};
