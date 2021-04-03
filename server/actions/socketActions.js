const { Message } = require('../models/Message');
const { Room } = require('../models/Room');

module.exports = {
  ADD_NEW_MESSAGE: async (data) => {
    const createdMessage = await new Message({
      message: data.message,
      room: data.room._id,
      user: data.user._id
    }).save();

    return Message.populate(createdMessage, {
      path: 'user',
      select: 'username'
    });
  },

  GET_ACTIVE_USERS: async (data) => {
    return await Room.findById(data.room._id).populate('user', ['username'])
  },

  GET_MESSAGES: (data) => {
    return Message.find({ room: data.room._id }).populate('user activeUsers.lookup', ['username']);
  },
};
