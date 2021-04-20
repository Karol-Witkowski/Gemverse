const User = require('../models/User');
const {
  createJwtToken,
} = require('../modules/utils');

const signUp = async (req, res) => {
  const emailDB = await User.findOne({ email : req.body.email });
  const usernameDB = await User.findOne({ username :  { $regex : new RegExp(req.body.username, 'i') } });
  let email = '';
  let username = '';

  if (emailDB || usernameDB) {
    if (emailDB !== null) {
      email =`${ req.body.email } address is already taken`;
    }
    if (usernameDB !== null) {
      username = `${ req.body.username } is already taken`;
    }
    res.status(403).send({ email, username });
  } else {
    const establishUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });

    establishUser.save().then((user) => {
      const token = createJwtToken(user);

      res.status(201).send({
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
};

const signIn = async (req, res) => {
  const user = await User.findOne({ email : req.body.email });

  if (!user) {
    return res.status(404).json({ user: 'User not found - Try again' });
  } else {
    if (await user.isValidPassword(req.body.password)) {
      const token = createJwtToken(user);
      await user.save();
      return res.status(200).send({ auth: true, token: `Bearer ${ token }`, user });
    }
    return res.status(404).json({ password: 'Invalid password' });
  }
};

const logoutUser = async (req, res) => {
  const user = await User.findOne({ username: req.body.username }).select('-password');

  if (!user) {
    return res.status(404).send({ error: `${ req.body.username } not found` });
  } else {
    return res.status(200).send({ success: true });
  }
};

module.exports = {
  signUp,
  signIn,
  logoutUser
};
