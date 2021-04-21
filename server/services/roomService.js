const Message = require('../models/Message');
const Room = require('../models/Room');

const findAllRooms = async () => {
	return await Room.find()
    .select('-password');
};

const findAndRemove = async (roomId) => {
	return await Room.findOne({ _id: roomId })
};

const findRoomBySlug = async (roomSlug) => {
	return await Room.findOne({ slug: roomSlug })
    .select('-password');
};

const findRoomByName = async (roomName) => {
	return await Room.findOne({ name: { $regex : new RegExp(roomName, 'i') } })
};

module.exports = {
  findAllRooms,
  findAndRemove,
  findRoomByName,
  findRoomBySlug,
};
