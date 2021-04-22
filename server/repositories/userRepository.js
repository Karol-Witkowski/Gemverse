const User = require('../models/User');

const findOnlineUsers = async () => {
	return await User.find({}, 'email username');
};

const findUserById = async (userId) => {
	return await User.findById({ _id: userId })
    .select('-password');
};

const findAndRemove = async (userId) => {
	return await User.findOneAndDelete({ _id: userId });
};

module.exports = {
  findAndRemove,
  findOnlineUsers,
  findUserById,
};
