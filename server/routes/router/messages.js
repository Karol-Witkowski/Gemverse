const router = require('express').Router();
const { requireAuth } = require("../../middlewares/authMiddleware");
const { validateMessage } = require("../../validators/messageValidator");
const {
  getMessagesByRoom,
  postMessage,
} = require('../../controllers/messagesController');

/** Get all room messages by id */
router.get('/:id',
  requireAuth,
  getMessagesByRoom
);

/** Save message */
router.post('/',
  requireAuth,
  validateMessage,
  postMessage
);

module.exports = router;
