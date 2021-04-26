const router = require('express').Router();
const { requireAuth } = require("../../middlewares/authMiddleware");
const {
  getOnlineUsers,
  getUserById,
  removeUser
} = require('../../controllers/userController');

/** Get online users */
router.get('/users',
  requireAuth,
  getOnlineUsers
);

/** Get user data */
router.get('/logged',
  requireAuth,
  getUserById
);

/** Remove user data */
router.delete('/remove/logged',
  requireAuth,
  removeUser
);

module.exports = router;
