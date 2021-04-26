const { body } = require("express-validator");
const {
  findUserByQuery,
  findUserByEmail,
} = require('../repositories/userRepository');

const validateRegister = [
  body('username', 'Username is required').trim().not().isEmpty(),
  body('username', 'Username must be at least 3 characters long').trim().isLength({ min: 3 }),
  body('username').trim().custom(async value => {
		return await findUserByQuery({ username: value})
      .then(user => {
			  if (user) {
				  return Promise.reject(`Name ${ value } is already in use`);
			  }
		  });
	}),

	body('password', 'Password is required').trim().not().isEmpty(),
	body('password', 'Password must be at least 6 characters long').trim().isLength({ min: 6 }),

  body('email', 'Email addres is required').trim().not().isEmpty(),
  body('email', 'Email address must be at least 8 characters long').trim().isLength({ min: 8 }),
  body('email', 'Invalid e-mail address').trim().isEmail(),
	body('email').trim().custom(async value => {
		return await findUserByEmail(value)
      .then(user => {
			  if (user) {
				  return Promise.reject(`${ value } address is already in use`);
			  }
		  });
	}),
];

module.exports = { validateRegister };
