const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const keys = require('../config/keys');
const User = require('../models/User');

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

/** JWT passport strategy */
const jwtLogin = new JwtStrategy(opts, async (payload, done) => {
  User.findById(payload._id)
  .select('-password')
  .then(user => {
    if(user) {
      return done(null, user);
    }
    return done(null, false);
  })
  .catch(error => console.error(error));
});

passport.use(jwtLogin);
