const { check } = require("express-validator");

const validateMessage = [
	check('message').trim().not().isEmpty(),
  check('message').isString().isLength({ min: 1, max: 4000 }),
	check('user').trim().not().isEmpty(),
  check('user', 'Invalid user ID').trim().matches(/^[0-9a-fA-F]{24}$/),
	check('room').trim().not().isEmpty(),
	check('room', 'Invalid room ID').trim().matches(/^[0-9a-fA-F]{24}$/)
];

module.exports = { validateMessage };
