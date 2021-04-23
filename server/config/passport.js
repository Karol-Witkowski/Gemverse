const passport = require('passport');
const ExtractJwt = require('passport-jwt').ExtractJwt;
const { findUserByQuery } = require('../repositories/userRepository');
const JwtStrategy = require('passport-jwt').Strategy;
const keys = require('../config/keys');

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

/** JWT passport strategy */
const jwtLogin = new JwtStrategy(opts, async (payload, done) => {
  findUserByQuery({ _id: payload._id })
    .then(user => {
      if(user) {
        return done(null, user);
      }
      return done(null, false);
    })
    .catch(error => console.error(error));
});

passport.use(jwtLogin);
