const mongoose = require('mongoose');
const Message = require('../models/Message');
const Room = require('../models/Room');

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

  GET_ACTIVE_USERS: (data) => {
    return Room.find({ room: data.room._id }).populate('user', ['username'])
  },

  GET_MESSAGES: (data) => {
    return Message.find({ room: data.room._id }).populate('user', ['username']);
  },

  UPDATE_ACTIVE_USERS: async (data) => {
    const room = await Room.findOne({ name: data.room.name })
      .select('-password')
      .populate('activeUsers.lookup', ['username']);

    if (room) {
      if (room.activeUsers && !room.activeUsers.find((user) => user.lookup._id.toString() === data.user._id)) {
        room.activeUsers.push({
          lookup: mongoose.Types.ObjectId(data.user._id),
          socketId: data.socketId
        });
        const updatedRoom = await room.save();
        return await Room.populate(updatedRoom, {
          path: 'user activeUsers.lookup',
          select: 'username'
        });
      } else {
        const chatUser = room.activeUsers.find((user) => user.lookup._id.toString() === data.user._id);
        if (chatUser.socketId != data.socketId) {
          chatUser.socketId = data.socketId;
          await room.save();
        }
        return await Room.populate(room, {
          path: 'user activeUsers.lookup',
          select: 'username'
        });
      }
    } else {
      return;
    }
  },
};
