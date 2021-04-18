const passport = require('passport');
const router = require('express').Router();
const {
  getOnlineUsers,
  getUserById,
  removeUser
} = require('../../controllers/userController');

/** Get online users */
router.get('/users', passport.authenticate('jwt', { session: false }), getOnlineUsers);

/** Get user data */
router.get('/logged', passport.authenticate('jwt', { session: false }), getUserById);

/** Remove user data */
router.delete('/remove/logged', passport.authenticate('jwt', { session: false }), removeUser);

module.exports = router;
