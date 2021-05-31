const User = require('../models/User');

const createUser = async (data) => {
  return new User({
    email: data.body.email,
    password: data.body.password,
    username: data.body.username,
  }).save();
};

const findUserByEmail = async (data) => {
  return User.findOne({ email: data });
};

const findUserByQuery = async (data) => {
  return User.findOne(data).select('-password');
};

const removeAccount = async (data) => {
  return data.delete();
};

const saveUser = async (data) => {
  return data.save();
};

module.exports = {
  createUser,
  findUserByEmail,
  findUserByQuery,
  removeAccount,
  saveUser,
};
