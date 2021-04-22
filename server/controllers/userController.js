const {
  findAndRemove,
  findOnlineUsers,
  findUserByEmail,
} = require('../repositories/userRepository');

const getOnlineUsers = async (req, res) => {
  const onlineUsers = await findOnlineUsers();

  if (!onlineUsers) {
    return res.status(404).json({ error: 'Users not found' });
  } else {
    return res.status(200).json(onlineUsers);
  }
};

const getUserById = async (req, res) => {
  const user = await findUserByEmail(req.user.email);

  await res.status(200).json(user);
};

const removeUser = async (req, res) => {
  const user = await findAndRemove(req.user._id);

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  } else {
    return res.json({ message: 'Account deleted'});
  }
};

module.exports = {
  getOnlineUsers,
  getUserById,
  removeUser,
};
