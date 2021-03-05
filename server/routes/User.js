const express = require('express');
const passport = require('passport');
const router = express.Router();
const User = require('../models/User');

/** Get all users */
router.get('/users', passport.authenticate('jwt', { session: false }), async (request, response, next) => {
  const users = await User.find({}, 'username email').exec();

  if (users) {
    return response.status(200).json(users).end();
  } else {
    return response.status(404).json({ error: 'Users not found' });
  }
});

/** Save the user */
/* router.put('/user', passport.authenticate('jwt', { session: false }),
  async (request, response, next) => {
  }
); */

/** Authentication */
router.get('/user', passport.authenticate('jwt', { session: false }), (request, response) => {
  response.json(request.user);
});

/** Delete the user */
router.delete('/user', passport.authenticate('jwt', { session: false }), async (request, response) => {
  await User.findOneAndDelete({ _id: request.user.id });
  response.json({ success: true });
});

module.exports = router;
