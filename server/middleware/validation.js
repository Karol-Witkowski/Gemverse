const { User } = require('../models/User');

const registrationValidation = async (request, response, next) => {
  request.check('email').isEmail();

  request.check('password')
  .isLength({ min: 6, max: 128 })
  .isString()
  .withMessage('Password must be between 6 and 128 characters');

  request.check('username')
  .isLength({ min: 3, max: 15 })
  .isString()
  .withMessage('Username must be between 3 and 15 characters');

  let errors = request.validationErrors() || [];
  const user = await User.findOne({ username: request.body.username });

  if (user) {
    errors.push({ param: 'username', msg: 'Username already taken' });
  }

  if (errors.length > 0) {
    response.send({
      errors
    });
  } else {
    next();
  }
};

const roomValidation = async (request, response, next) => {
  if (!request.body.name) {
    request.check('name')
    .not()
    .isEmpty()
    .withMessage('Room name is required');
  } else {
    request.check('name')
    .isLength({ min: 3, max: 15 })
    .isString()
    .withMessage('Room name must be between 3 and 15 characters');
  }

  if (request.body.password) {
    request.check('password')
    .not()
    .isEmpty()
    .isLength({ min: 6, max: 128 })
    .withMessage('Password should be between 6 and 128 characters');
  }

  const errors = request.validationErrors();

  if (errors) {
    response.send({
      errors
    });
  } else {
    next();
  }
};


module.exports = {
  registrationValidation,
  roomValidation,
};
