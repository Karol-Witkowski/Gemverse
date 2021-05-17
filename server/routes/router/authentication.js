const router = require('express').Router();
const { validateRegister } = require('../../validators/userValidator');
const { signIn, signUp } = require('../../controllers/authenticationController');

/** Save user */
router.post('/register', validateRegister, signUp);

/** Login user */
router.post('/login', signIn);

module.exports = router;
