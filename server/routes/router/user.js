const router = require('express').Router();
const { requireAuth } = require('../../middlewares/authMiddleware');
const { getUserById, removeUser } = require('../../controllers/userController');

/** Get user data */
router.get('/logged', requireAuth, getUserById);

/** Remove user data */
router.delete('/remove/logged', requireAuth, removeUser);

module.exports = router;
