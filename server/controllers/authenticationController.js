const { createJwtToken } = require('../modules/utils');
const { createUser, findUserByEmail, saveUser } = require('../repositories/userRepository');
const { validatorResult } = require('../validators/validationResult');

const signIn = async (req, res) => {
  const user = await findUserByEmail(req.body.email);

  if (!user) {
    return res.status(404).json({
      success: false,
      user: 'User not found - Try again',
    });
  } else {
    if (!(await user.isValidPassword(req.body.password))) {
      return res.status(404).json({
        password: 'Invalid password',
        success: false,
      });
    }

    const token = createJwtToken(user);

    await saveUser(user);

    user.password = '';

    return res.status(200).json({
      auth: true,
      data: user,
      success: true,
      token: `Bearer ${token}`,
    });
  }
};

const signUp = async (req, res) => {
  createUser(req)
    .then((user) => {
      const token = createJwtToken(user);

      user.password = '';

      return res.status(201).json({
        auth: true,
        data: user,
        success: true,
        token: `Bearer ${token}`,
      });
    })
    .catch((error) => {
      validatorResult(req, res, error);
    });
};

module.exports = {
  signIn,
  signUp,
};
