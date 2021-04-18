const router = require('express').Router();
const passport = require('passport');
const {
  getMessagesByRoom,
  postMessage,
} = require('../../controllers/messagesController');

/** Get all room messages by id */
router.get('/:id', passport.authenticate('jwt', { session: false }), getMessagesByRoom);

/** Save message */
router.post('/', passport.authenticate('jwt', { session: false }), postMessage);

module.exports = router;
