const mongoose = require('mongoose');
const { Message } = require('../models/Message');

module.exports = {
  NEW_MESSAGE: async (data) => {
    const createdMessage = await new Message({
      message: data.message,
      user: data.user._id,// || null,
      room: data.room._id
    }).save();

    return Message.populate(createdMessage, {
      path: 'user',
      select: 'username'
    });
  },
  GET_MESSAGES: async (data) => {
    return await Message.find({ room: data.room._id }).populate('user', [
      'username',
      'id',
  ]);
},
  };
