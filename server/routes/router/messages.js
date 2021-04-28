const router = require('express').Router();
const { postMessage } = require('../../controllers/messagesController');
const { requireAuth } = require('../../middlewares/authMiddleware');
const { validateMessage } = require('../../validators/messageValidator');

/** Save message */
router.post('/:slug', requireAuth, validateMessage, postMessage);

module.exports = router;
