const router = require('express').Router();
const { validateRegister } = require('../../validators/userValidator');
const { logoutUser, signIn, signUp } = require('../../controllers/authenticationController');

/** Save user */
router.post('/register', validateRegister, signUp);

/** Login user */
router.post('/login', signIn);

/** Logout user */
router.post('/logout', logoutUser);

module.exports = router;
