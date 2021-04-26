const Room = require('../models/Room');

const createRoom = async (data) => {
	return Room.create(data);
};

const findAllRooms = async () => {
	return Room.find()
    .select('-password');
};

const findRoomById = async (data) => {
	return Room.findOne({ _id: data })
};

const findRoomByName = async (data) => {
	return Room.findOne({ name: { $regex : new RegExp(data, 'i') } })
};

const findRoomBySlug = async (data) => {
	return Room.findOne({ slug: data })
    .select('-password');
};

const removeRoom = async (data) => {
  return data.delete();
};

const saveRoom = async (data) => {
  return data.save();
};

const setOnlineUsers = async (data) => {
  return Room.populate(data, {
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
  setOnlineUsers
};
