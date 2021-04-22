const mongoose = require('mongoose');
const Room = require('../models/Room');

const createRoom = async (roomData) => {
	return Room.create(roomData);
};

const filterActiveUsers = async (data) => {
  const room = await findRoomById(mongoose.Types.ObjectId(data.currentRoomId));

  await setOnlineUsers(room);
  if (room) {
    room.activeUsers = room.activeUsers.filter((user) => user.socketId !== data.socketId);
    room.permission.splice(room.permission.indexOf(data.currentUserId), 1);
    await saveRoom(room);

    return {
      updated: await setOnlineUsers(room)
    };
  }
};

const findAllRooms = async () => {
	return Room.find()
    .select('-password');
};

const findRoomById = async (roomId) => {
	return Room.findOne({ _id: roomId })
};

const findRoomByName = async (roomName) => {
	return Room.findOne({ name: { $regex : new RegExp(roomName, 'i') } })
};

const findRoomBySlug = async (roomSlug) => {
	return Room.findOne({ slug: roomSlug })
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
  const room = await findRoomByName(data.room.name);

  setOnlineUsers(room);
  if (room) {
    if (room.activeUsers && !room.activeUsers.find((user) => data.user._id === user.lookup._id.toString())) {
      room.activeUsers.push({
        lookup: mongoose.Types.ObjectId(data.user._id),
        socketId: data.socketId
      });

      return setOnlineUsers(await saveRoom(room));
    } else {
      const roomUser = room.activeUsers.find((user) => data.user._id === user.lookup._id.toString());

      if (roomUser.socketId !== data.socketId) {
        roomUser.socketId = data.socketId;
        await saveRoom(room);
      }

      return setOnlineUsers(room);
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
