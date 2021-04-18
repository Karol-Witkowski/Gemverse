const User = require('../models/User');

const getOnlineUsers = async (req, res) => {
  const onlineUsers = await User.find({}, 'email username').exec();

  if (!onlineUsers) {
    return res.status(404).json({ error: 'Users not found' });
  } else {
    return res.status(200).json(onlineUsers).end();
  }
};

const getUserById = async (req, res) => {
  const user = await User.findById({ _id: req.user._id }).select('-password');

  await res.status(200).json(user);
};

const removeUser = async (req, res) => {
  await User.findOneAndUpdate({ _id: req.user.id, username : ('Anonymous_'.concat(req.user._id)).substring(0,14)});

  return res.json({ message: 'Account deleted'});
};

module.exports = {
  getOnlineUsers,
  getUserById,
  removeUser,
};