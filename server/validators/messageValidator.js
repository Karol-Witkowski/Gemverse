const { body } = require("express-validator");

const validateMessage = [
	body('message', 'Message can not be empty').trim().not().isEmpty(),
  body('message', 'Message must contain at least one character').isString().isLength({ min: 1, max: 4000 }),

	body('user', 'Message must be assigned to a user').trim().not().isEmpty(),
  body('user', 'Invalid user ID').trim().matches(/^[0-9a-fA-F]{24}$/),

	body('room', 'Message must be assigned to a room').trim().not().isEmpty(),
	body('room', 'Invalid room ID').trim().matches(/^[0-9a-fA-F]{24}$/)
];

module.exports = { validateMessage };
