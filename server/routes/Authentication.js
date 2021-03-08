const express = require('express');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const User = require('../models/User');
const router = express.Router();

/** Save user */
router.post('/register', (request, response) => {

  User.findOne({ username: request.body.username }).then(user => {
    if (user) {
      if (user.username === request.body.username) response.status(404).json({ error: 'Username is already taken' })
      if (user.email === request.body.email) response.status(404).json({ error: 'E-mail adress is already taken' })
    } else {
      const establishUser = new User({
        username: request.body.username,
        email: request.body.email,
        password: request.body.password,
      });

      establishUser.save().then(() => {
        const token = jwt.sign(user, process.env.JWT_KEY, {
          expireTime: 24000
        });

        response.status(200).send({
          auth: true,
          token: token,
          user
        });
      })
      .catch(error => {
        console.log(error);
      });
    }
  });
});

/** Login user */
router.post('/login', async (request, response) => {
  const user = await User.findOne({ email: request.body.email }).select('-password');

  if (!user) {
    return response.status(404).send({ error: `${request.params.username} not found` });
  }

  const token = jwt.sign(user.toObject(), process.env.JWT_KEY, { expireTime: 24000 });

  response.status(200).send({ auth: true, token: `Bearer ${token}`, user });
});

/** Logout user */
router.post('/logout', async (request, response) => {
  const user = await User.findOne({ username: request.body.username }).select('-password');

  if (!user) {
    return response.status(404).send({ error: `${request.params.username} not found` });
  }

    response.status(200).send({ success: true });
});

module.exports = router;
