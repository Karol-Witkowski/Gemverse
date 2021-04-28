/* eslint-disable prettier/prettier */
const { body } = require('express-validator');
const {
  findUserByQuery,
  findUserByEmail,
} = require('../repositories/userRepository');

const validateRegister = [
  body('email', 'Email addres is required').trim().notEmpty(),
  body('email', 'Email address must be at least 8 characters long').trim().isLength({ min: 8, max: 128 }),
  body('email', 'Invalid e-mail address').trim().isEmail(),
	body('email').trim().custom(async (value) => {
		return await findUserByEmail(value)
      .then((user) => {
				if (user) {
					return Promise.reject(`${ value } address is already in use`);
				}
			});
	}),

	body('password', 'Password is required').trim().notEmpty(),
	body('password', 'Password must be at least 6 characters long').trim().isLength({ min: 6, max: 128 }),

  body('username', 'Username is required').trim().notEmpty(),
  body('username', 'Username length must be between 3 to 15').trim().isString().isLength({ min: 3, max: 15 }),
  body('username').trim().custom(async (value) => {
		return await findUserByQuery({ username: value})
      .then((user) => {
				if (user) {
					return Promise.reject(`Name ${ value } is already in use`);
			  }
		  });
	}),
];

module.exports = { validateRegister };
