const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const UserData = require('../models/userModel');
const dotenv = require('dotenv');
require('dotenv').config();

// const UserData = mongoose.model('users');

// passport serialize
passport.serializeUser((user, done) => {
  return done(null, user.id);
});

// passport deserialize
passport.deserializeUser((id, done) => {
  UserData.findById(id).then(user => {
    return done(null, user);
  });
});

// tell passport to be aware that there is a new strategy available and use it to authenticate users inside our app
passport.use(
  // pass in a new instance of the GoogleStrategy with a configuration
  // configuration needs Client ID, Client Secret, and a callbackURL to be directed to once Google sends the client back to our app
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/api/auth/google/callback',
    },
    // callback func to run once client is directed to callbackURL
    (accessToken, refreshToken, profile, done) => {
      // insert SQL query here to find a user in the users table if the user exists already
      // if so, redirect them to homepage
      // if not, create user in the db using profile.id
      console.log('this is the profile', profile);
      UserData.findOne({ googleID: profile.id }).then(existingUser => {
        if (existingUser) {
          done(null, existingUser);
        } else {
          new UserData({
            username: profile.name.givenName,
            password: 'google',
            email: profile.emails[0].value,
            googleID: profile.id,
          })
            .save()
            .then(newUser => {
              done(null, newUser);
            });
        }
      });
    }
  )
);
