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

  GET_MESSAGES: (data) => {
    return Message.find({ room: data.room._id }).populate('user', ['username']);
  },

  UPDATE_ACTIVE_USERS: async (data) => {
    const room = await Room.findOne({ name: data.room.name }).populate('activeUsers.lookup', ['username']);

    if (room) {
      if (room.activeUsers && !room.activeUsers.find((user) => data.user._id === user.lookup._id.toString())) {
        room.activeUsers.push({
          lookup: mongoose.Types.ObjectId(data.user._id),
          socketId: data.socketId
        });
        return await Room.populate(await room.save(), {
          path: 'user activeUsers.lookup',
          select: 'username'
        });
      } else {
        const roomUser = room.activeUsers.find((user) => data.user._id === user.lookup._id.toString());
        if (roomUser.socketId !== data.socketId) {
          roomUser.socketId = data.socketId;
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

  FILTER_ACTIVE_USERS: async (data) => {
    const room = await Room.findById(mongoose.Types.ObjectId(data.currentRoomId))
      .populate('activeUsers.lookup', ['username']);
    if (room) {
      room.activeUsers = room.activeUsers.filter((user) => user.socketId !== data.socketId);
      room.permission.splice(room.permission.indexOf(data.currentUserId), 1);
      await room.save();
      return {
        updated: await Room.populate(room, {
          path: 'user activeUsers.lookup',
          select: 'username'
        })
      };
    }
  }
};
