const { body } = require("express-validator");
const { findRoomByName } = require('../repositories/roomRepository');

const validateRoom = [
	body('name', 'Room name can not be empty').trim().notEmpty(),
  body('name', 'Room name length must be between 3 to 15').isString().isLength({ min: 3, max: 15 }),
  body('name').trim().custom(async (value) => {
		return await findRoomByName(value)
      .then((name) => {
			  if (name) {
				  return Promise.reject(`${ value } name is already in use`);
			  }
		  });
	}),

	body('password', 'Password must be at least 6 characters long').optional({ checkFalsy: true }).trim().isLength({ min: 6, max: 128 }),

	body('user', 'Room must be assigned to a creator').notEmpty(),
];

module.exports = { validateRoom };
