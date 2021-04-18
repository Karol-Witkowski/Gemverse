const { requireAuth } = require("../../middlewares/authMiddleware");
const router = require('express').Router();
const {
  getMessagesByRoom,
  postMessage,
} = require('../../controllers/messagesController');

/** Get all room messages by id */
router.get('/:id', requireAuth, getMessagesByRoom);

/** Save message */
router.post('/', requireAuth, postMessage);

module.exports = router;
