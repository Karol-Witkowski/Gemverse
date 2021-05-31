const router = require('express').Router();
const { signIn, signUp } = require('../../controllers/authenticationController');
const { validateRegister } = require('../../validators/userValidator');

/** Login user */
router.post('/login', signIn);

/** Save user */
router.post('/register', validateRegister, signUp);

module.exports = router;
