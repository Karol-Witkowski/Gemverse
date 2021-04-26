const User = require('../models/User');

const createUser = async (data) => {
	return new User({
    username: data.body.username,
    email: data.body.email,
    password: data.body.password,
  }).save();
};

const findUserByQuery = async (data) => {
	return User.findOne(data)
    .select('-password');
};

const findOnlineUsers = async () => {
	return User.find({}, 'email username');
};

const findUserByEmail = async (data) => {
	return User.findOne({ email: data });
};

const removeAccount = async (data) => {
  return data.delete();
};

const saveUser = async (data) => {
  return data.save();
};

module.exports = {
  createUser,
  findUserByQuery,
  findOnlineUsers,
  findUserByEmail,
  removeAccount,
  saveUser
};
