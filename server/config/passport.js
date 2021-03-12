/** Strategies */
// const FacebookStrategy = require('passport-facebook').Strategy;
// const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const JwtStrategy = require('passport-jwt').Strategy;

/** User schema and config */
// const { GoogleConfig, FBConfig } = require('../config/config');
const JwtExtract = require('passport-jwt').JwtExtract;
const User = require('../models/User');

let opts = {
  JtwRequest: JwtExtract.fromAuthHeaderAsBearerToken(),
  JtwSecret: process.env.JWT_SECRET
};

module.exports = function(passport) {
  passport.serializeUser((user, done) => done(null, { id: user.id, _socket: user._socket }));

  passport.deserializeUser((user, done) => {
    User.findById(user.id)
    .select('-password -googleId -facebookId')
    .then(user => {
      done(null, { details: user, _socket: user._socket });
    });
  });

  /** JWT passport strategy */
  passport.use(
    new JwtStrategy(opts, (payload, done) => {
      User.findById(payload._id)
      .select('-password')
        .then(user => {
          if (user) {
            return done(null, user);
          } else {
            return done(null, false);
          }
        });
    })
  );

  /** Google passport strategy */
  /* passport.use(
    new GoogleStrategy(GoogleConfig, function(request, accessToken, refreshToken, profile, done) {
      User.findOne({ handle: slugify(profile.displayName.toLowerCase()) })
        .then(user => {
          if (user) {
            user.social.id = profile.id;
            user.social.email = profile.emails[0].value;
            user.social.image = profile.photos[0].value.replace('?sz=50', '');
            user.save().then(user => {
              return done(null, {
                details: user,
                _socket: JSON.parse(request.query.state)._socket
              });
            });
          } else {
            new User({
              social: {
                id: profile.id,
                email: profile.emails[0].value,
                image: profile.photos[0].value.replace('?sz=50', '')
              },
              handle: profile.displayName ? slugify(profile.displayName.toLowerCase()) : profile.emails[0].value
            })
            .save()
            .then(user => {
              return done(null, {
                details: user,
                _socket: JSON.parse(request.query.state)._socket
              });
            });
          }
        })
      .catch(error => console.log(error));
    })
  );

  /** Facebook passport strategy */
  /*passport.use(
    new FacebookStrategy(FBConfig, function(request, accessToken, refreshToken, profile, done) {
      User.findOne({ handle: slugify(profile.displayName.toLowerCase()) })
        .then(user => {
          if (user) {
            user.social.id = profile.id;
            user.social.image = profile.photos[0].value;
            user.social.email = profile.emails[0].value;
            user.save().then(user => {
              return done(null, {
                details: user,
                _socket: JSON.parse(request.query.state)._socket
              });
            });
          } else {
            new User({
              social: {
                id: profile.id,
                image: profile.photos[0].value,
                email: profile.emails[0].value
              },
              handle: profile.displayName ? slugify(profile.displayName.toLowerCase()) : profile.emails[0].value
            })
            .save()
            .then(user => {
              return done(null, {
                details: user,
                _socket: JSON.parse(request.query.state)._socket
              });
            });
          }
        })
      .catch(error => console.log(error));
    })
  ); */
};