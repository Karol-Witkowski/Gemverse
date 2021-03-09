const express = require('express');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const User = require('../models/User');
const router = express.Router();

/** Save user */
router.post('/register', async (request, response) => {

  await User.findOne().or([{ username: request.body.username }, { email: request.body.email }]).then(user => {
    let errors = [];
    if (user) {
      if (user.username === request.body.username) errors.push(`${request.body.username} is already taken`);
      if (user.email === request.body.email) errors.push(`${request.body.email} address is already taken`);

      //if ((user.username === request.body.username) && (user.email === request.body.email)) errors.push(`${request.body.username} and ${request.body.email} are already taken`);
      //else if (user.username === request.body.username) errors.push(`${request.body.email} address is already taken`);
      //else errors.push(`${request.body.email} address is already taken`);

      response.status(404).send({ errors });
    } else {
      const establishUser = new User({
        username: request.body.username,
        email: request.body.email,
        password: request.body.password,
      });

      establishUser.save().then(() => {
        const token = jwt.sign(user.toJSON(), process.env.JWT_KEY, {
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
    return response.status(404).send({ error: `${request.body.username} not found` });
  }

  const token = jwt.sign(user.toObject(), process.env.JWT_KEY, { expireTime: 24000 });

  response.status(200).send({ auth: true, token: `Bearer ${token}`, user });
});

/** Logout user */
router.post('/logout', async (request, response) => {
  const user = await User.findOne({ username: request.body.username }).select('-password');

  if (!user) {
    return response.status(404).send({ error: `${request.body.username} not found` });
  }

    response.status(200).send({ success: true });
});

module.exports = router;
