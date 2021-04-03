const { Message } = require('../models/Message');

module.exports = {
  GET_MESSAGES: (data) => {
    return Message.find({ room: data.room._id }).populate('user', [
      'username'
    ]);
  },
  NEW_MESSAGE: async (data) => {
    const createdMessage = await new Message({
      message: data.message,
      user: data.user._id,
      room: data.room._id
    }).save();

    return Message.populate(createdMessage, {
      path: 'user',
      select: 'username'
    });
  },
};
