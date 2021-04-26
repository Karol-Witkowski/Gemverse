const {
  findOnlineUsers,
  findUserByEmail,
  removeAccount
} = require('../repositories/userRepository');

const getOnlineUsers = async (req, res) => {
  const onlineUsers = await findOnlineUsers();

  if (!onlineUsers) {
    return res.status(404)
      .json({
        message: 'Users not found',
        success: false
      });
  } else {
    return res.status(200)
      .json({
        data: onlineUsers,
        success: true
      });
  }
};

const getUserById = async (req, res) => {
  const user = await findUserByEmail(req.user.email);

  if (!user) {
    return res.status(404)
      .json({
        message: 'User not found',
        success: false
      });
  } else {
    return res.status(200)
      .json({
        data: user,
        success: true
      });
  }
};

const removeUser = async (req, res) => {
  const user = await findUserByEmail(req.user.email);

  if (!user) {
    return res.status(404)
      .json({
        message: 'User not found',
        success: false
      });
  } else {
    if (req.user.id !== user.id.toString()) {
      return res.status(403)
      .json({
        message: 'Users are allowed to delete only own accounts',
        success: false
      });
    }
    await removeAccount(user);
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
  removeUser
};
