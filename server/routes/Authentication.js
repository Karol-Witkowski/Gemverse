require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const router = express.Router();
const User = require('../models/User');

/** Middleware */
// const registrationValidation= require('../middleware/valiation');

/** Save user */
router.post('/register', async (request, response) => {
  const emailDB = await User.findOne({ email : request.body.email })
  const usernameDB = await User.findOne({ username :  { $regex : new RegExp(request.body.username, "i") } })
  let emailError = '';
  let usernameError = '';

  if (emailDB || usernameDB) {
    if (emailDB !== null) {
      emailError =`${ request.body.email } address is already taken`;
    }
    if (usernameDB !== null) {
      usernameError = `${ request.body.username } is already taken`;
    }
    response.status(403).send({ emailError, usernameError });
  } else {
    const establishUser = new User({
      username: request.body.username,
      email: request.body.email,
      password: request.body.password,
    });

    establishUser.save().then((UserCollection) => {
      const user = UserCollection.toObject();
      const token = jwt.sign(
        { id: request.body.id },
        { expiresIn: 24000 },
        process.env.JWT_KEY
    )

      response.status(201).send({
        success: true,
        auth: true,
        token: `Bearer ${token}`,
        user
      });
    })
    .catch(error => {
      console.log(error);
    });
  }
});

/** Login user */
router.post('/login', async (request, response) => {
  const user = await User.findOne({ email: request.body.email }).select('-password');
  const token = jwt.sign(user.toObject(), process.env.JWT_KEY, { expireTime: 24000 });

  if (!user) {
    return response.status(404).send({ error: `${request.body.username} not found` });
  }
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
