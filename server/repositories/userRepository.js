const User = require('../models/User');

const createUser = async (data) => {
	return new User({
    username: data.body.username,
    email: data.body.email,
    password: data.body.password,
  }).save();
};

const findUserByQuery = async (query) => {
	return await User.findOne(query)
    .select('-password');
};

const findOnlineUsers = async () => {
	return await User.find({}, 'email username');
};

const findUserByEmail = async (userEmail) => {
	return await User.findOne({ email: userEmail });
};

const findAndRemove = async (userId) => {
	return await User.findOneAndDelete({ _id: userId });
};

const saveUser = async (userData) => {
  return userData.save();
};

module.exports = {
  createUser,
  findAndRemove,
  findUserByQuery,
  findOnlineUsers,
  findUserByEmail,
  saveUser,
};
