const express = require('express');
const passport = require('passport');
const router = express.Router();
const User = require('../models/User');

/** Get online users */
router.get('/users', passport.authenticate('jwt', { session: false }), async (request, response) => {
  const onlineUsers = await User.find({}, 'email username').exec();
    if (!onlineUsers) {
      return response.status(404).json({ error: 'Users not found' });
    }
      response.status(200).json(onlineUsers).end();
});

/** Get user data */
router.get('/logged', passport.authenticate('jwt', { session: false }), async (request, response) => {
  await response.status(200).json(request.user);
});

/** Delete user */
router.delete('/logged', passport.authenticate('jwt', { session: false }), async (request, response) => {
  await User.findOneAndDelete({ id: request.user.id });
  response.status(200).json({ success: true });
});

module.exports = router;
