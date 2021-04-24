const {
  findAndRemove,
  findOnlineUsers,
  findUserByEmail,
} = require('../repositories/userRepository');

const getOnlineUsers = async (req, res) => {
  const onlineUsers = await findOnlineUsers();

  if (!onlineUsers) {
    return res.status(404)
      .json({
        error: 'Users not found',
        success: false
      });
  } else {
    return res.status(200)
      .json({
        success: true,
        users: onlineUsers
      });
  }
};

const getUserById = async (req, res) => {
  const user = await findUserByEmail(req.user.email);

  if (!user) {
    return res.status(404)
      .json({
        error: 'User not found',
        success: false
      });
  } else {
    return res.status(200)
      .json({
        success: true,
        user
      });
  }
};

const removeUser = async (req, res) => {
  const user = await findAndRemove(req.user._id);

  if (!user) {
    return res.status(404)
      .json({
        error: 'User not found',
        success: false
      });
  } else {
    return res.status(200)
      .json({
        message: 'Account deleted',
        success: false
      });
  }
};

module.exports = {
  getOnlineUsers,
  getUserById,
  removeUser,
};
