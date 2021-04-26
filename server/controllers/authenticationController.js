const { createJwtToken } = require('../modules/utils');
const { validatorResult } = require("../validators/validationResult");
const {
  createUser,
  findUserByQuery,
  findUserByEmail,
  saveUser,
} = require('../repositories/userRepository');

const signUp = async (req, res) => {
  createUser(req)
    .then((user) => {
      const token = createJwtToken(user);

      return res.status(201)
        .json({
          auth: true,
          success: true,
          token: `Bearer ${ token }`,
          data: user
        });
    })
    .catch((error) => {
      validatorResult(req, res, error);
    });
};

const signIn = async (req, res) => {
  const user = await findUserByEmail(req.body.email);

  if (!user) {
    return res.status(404)
      .json({
        success: false,
        user: 'User not found - Try again'
      });
  } else {
    if (!await user.isValidPassword(req.body.password)) {
      return res.status(404)
        .json({
          password: 'Invalid password',
          success: false
        });
    }
    const token = createJwtToken(user);

    await saveUser(user);
    return res.status(200)
      .json({
        auth: true,
        data: user,
        success: true,
        token: `Bearer ${ token }`
      });
  }
};

const logoutUser = async (req, res) => {
  const user = await findUserByQuery({ email : req.body.email });

  if (!user) {
    return res.status(404)
      .json({
        message: `${ req.body.username } not found`,
        success: false
      });
  } else {
    return res.status(200)
      .json({
        success: true
      });
  }
};

module.exports = {
  logoutUser,
  signIn,
  signUp
};
