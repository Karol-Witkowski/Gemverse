const express = require('express');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const User = require('../models/User');
const router = express.Router();

/** Save user */
router.post('/register', (request, response) => {
  let errors = [];

  User.findOne({ email: request.body.email }).then(user => {
    if (user) {
      errors.push({ param: 'email', msg: 'Email is already taken' });

      if (user.username === request.body.username) {
        errors.push({ param: 'username', msg: 'Username is already taken' });
      }

      response.send({errors: createErrorObject(errors)}).end();
    } else {
      newUser.save().then(() => {
        const token = jwt.sign(user, process.env.JWT, {
          expireTime: 24000
        });

        response.status(200).send({
          auth: true,
          token: token,
          user
        });
      })
      .catch(errors => {
        response.send({errors, error: 'Error - check all fields and try again'});
      });
    }
  });
});

/** Login user */
router.post('/login', checkLoginFields, async (request, response) => {
  const user = await User.findOne({ email: request.body.email }).select('-password');

  if (!user) {
    return response.status(404).send({error: `${request.params.username} not found`});
  }

  const token = jwt.sign(user.toObject(), process.env.JWT_SECRET, { expireTime: 24000 });

  response.status(200).send({ auth: true, token: `Bearer ${token}`, user });
});

/** Logout user */
router.post('/logout', async (request, response) => {
  const user = await User.findOne({ username: request.body.username }).select('-password');

  if (!user) {
    return response.status(404).send({error: `${request.params.username} not found`});
  }

    response.status(200).send({ success: true });
});

module.exports = router;
