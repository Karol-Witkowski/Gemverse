// Need rework before applying

const User = require('../models/User');

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

  let validationErrors = request.validationErrors() || [];
  const user = await User.findOne({ username: request.body.username });

  if (user) {
    validationErrors.push({ param: 'username', msg: 'Username already taken' });
  }

  if (validationErrors.length > 0) {
    response.send({
      validationErrors
    });
  } else {
    next();
  }
};

const roomValidation = async (request, response, next) => {
  const emailDB = await User.findOne({ email : request.body.email });
  const usernameDB = await User.findOne({ username :  { $regex : new RegExp(request.body.username, 'i') } });
  let emailError = '';
  let usernameError = '';

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

  const validationErrors = request.validationErrors();

  if (validationErrors) {
    response.send({
      validationErrors
    });
  } else {
    next();
  }
};


module.exports = {
  registrationValidation,
  roomValidation,
};
