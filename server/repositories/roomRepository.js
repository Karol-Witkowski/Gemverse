const mongoose = require('mongoose');
const Room = require('../models/Room');

const createRoom = async (roomData) => {
	return await Room.create(roomData);
};

const filterActiveUsers = async (data) => {
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

const findAllRooms = async () => {
	return await Room.find()
    .select('-password');
};

const findRoomById = async (roomId) => {
	return await Room.findOne({ _id: roomId })
};

const findRoomByName = async (roomName) => {
	return await Room.findOne({ name: { $regex : new RegExp(roomName, 'i') } })
};

const findRoomBySlug = async (roomSlug) => {
	return await Room.findOne({ slug: roomSlug })
    .select('-password');
};

const removeRoom = async (roomData) => {
  return roomData.delete();
};

const saveRoom = async (roomData) => {
  return roomData.save();
};

const setOnlineUsers = async (room) => {
  return Room.populate(room, {
    path: 'user activeUsers.lookup',
    select: 'username'
  })
};

const updateOnlineUsers = async (data) => {
  const room = await Room.findOne({ name: data.room.name })
    .populate('activeUsers.lookup', ['username']);

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
};

module.exports = {
  createRoom,
  filterActiveUsers,
  findAllRooms,
  findRoomById,
  findRoomByName,
  findRoomBySlug,
  removeRoom,
  saveRoom,
  setOnlineUsers,
  updateOnlineUsers
};
