const express = require('express');
const passport = require('passport');
const router = express.Router();
const User = require('../models/User');

/** Get online users */
router.get('/users', passport.authenticate('jwt', { session: false }), async (request, response) => {
  const onlineUsers = await User.find({}, 'email username').exec();

    if (!onlineUsers) {
      return response.status(404).json({ error: 'Users not found' });
    } else {
      return response.status(200).json(onlineUsers).end();
    }
});

/** Get user data */
router.get('/logged', passport.authenticate('jwt', { session: false }), async (request, response) => {
  const user = await User.findById({ _id: request.user._id }).select('-password');

  await response.status(200).json(user);
});

/** Remove user data */
router.put('/logged', passport.authenticate('jwt', { session: false }), async (request, response) => {
  await User.findOneAndUpdate({ _id: request.user.id });
  return response.json({ success: true });
});

module.exports = router;
