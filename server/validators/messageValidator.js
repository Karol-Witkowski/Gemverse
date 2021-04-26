const { check } = require("express-validator");

const validateMessage = [
	check('message', 'Message can not be empty').trim().not().isEmpty(),
  check('message').isString().isLength({ min: 1, max: 4000 }),

	check('user', 'Message must be assigned to a user').trim().not().isEmpty(),
  check('user', 'Invalid user ID').trim().matches(/^[0-9a-fA-F]{24}$/),

	check('room', 'Message must be assigned to a room').trim().not().isEmpty(),
	check('room', 'Invalid room ID').trim().matches(/^[0-9a-fA-F]{24}$/)
];

module.exports = { validateMessage };
