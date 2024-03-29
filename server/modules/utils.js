const jwt = require('jsonwebtoken');

module.exports = {
  createJwtToken: (model) =>
    jwt.sign(model.toObject(), process.env.JWT_KEY, {
      expiresIn: parseInt(process.env.JWT_EXPIRE),
    }),
};
