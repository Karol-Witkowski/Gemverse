const bcrypt = require('bcrypt');
const express = require('express');
const jwt = require('jsonwebtoken');
const authentication = express.Router();
const User = require('../../models/User');

/** Save user */
authentication.post('/register', async (request, response) => {
  const emailDB = await User.findOne({ email : request.body.email });
  const usernameDB = await User.findOne({ username :  { $regex : new RegExp(request.body.username, 'i') } });
  let email = '';
  let username = '';

  if (emailDB || usernameDB) {
    if (emailDB !== null) {
      email =`${ request.body.email } address is already taken`;
    }
    if (usernameDB !== null) {
      username = `${ request.body.username } is already taken`;
    }
    response.status(403).send({ email, username });
  } else {
    const establishUser = new User({
      username: request.body.username,
      email: request.body.email,
      password: request.body.password,
    });

    establishUser.save().then((UserCollection) => {
      const user = UserCollection.toObject();
      const token = jwt.sign(
        user,
        process.env.JWT_KEY,
        { expiresIn: 24000 },
      );

      response.status(201).send({
        auth: true,
        success: true,
        token: `Bearer ${ token }`,
        user
      });
    })
      .catch((error) => {
        console.log(error);
      });
  }
});

/** Login user */
authentication.post('/login', async (request, response) => {
  const user = await User.findOne({ email : request.body.email });

  if (!user) {
    return response.status(404).json({ user: 'User not found - Try again' });
  } else {
    if (await bcrypt.compare(request.body.password, user.password)) {
      const token = jwt.sign(
        user.toObject(),
        process.env.JWT_KEY,
        { expiresIn: 24000 }
      );
      await user.save();
      return response.status(200).send({ auth: true, token: `Bearer ${ token }`, user });
    }
    return response.status(404).json({ password: 'Invalid password' });
  }
});

/** Logout user */
authentication.post('/logout', async (request, response) => {
  const user = await User.findOne({ username: request.body.username }).select('-password');

  if (!user) {
    return response.status(404).send({ error: `${ request.body.username } not found` });
  } else {
    return response.status(200).send({ success: true });
  }
});

module.exports = authentication;
