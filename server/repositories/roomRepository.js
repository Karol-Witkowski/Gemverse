const Room = require('../models/Room');

const createRoom = async (roomData) => {
	return Room.create(roomData);
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

module.exports = {
  createRoom,
  findAllRooms,
  findRoomById,
  findRoomByName,
  findRoomBySlug,
  removeRoom,
  saveRoom,
  setOnlineUsers,
};
