const passport = require('passport');

// Tells passport to look for a 'jwt' strategy
const requireAuth = passport.authenticate('jwt', { session: false });

module.exports = { requireAuth };
