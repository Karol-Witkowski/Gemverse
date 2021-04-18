const router = require('express').Router();
const {
  signUp,
  signIn,
  logoutUser
} = require('../../controllers/authenticationController');

/** Save user */
router.post('/register', signUp);

/** Login user */
router.post('/login', signIn);

/** Logout user */
router.post('/logout', logoutUser);

module.exports = router;
