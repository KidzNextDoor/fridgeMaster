const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
//const mongoose = require('mongoose');
const UserData = require('../models/userModel');
const dotenv = require('dotenv');
const query = require('../db_sql');
require('dotenv').config();

// const UserData = mongoose.model('users');

// passport serialize
passport.serializeUser((user, done) => {
  return done(null, user);
});

// passport deserialize
passport.deserializeUser((user, done) => {
  return done(null, user);
})
// passport.deserializeUser((id, done) => {
//   UserData.findById(id).then(user => {
//     return done(null, user);
//   });
// });

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
    async (accessToken, refreshToken, profile, done) => {
      const result = await query('SELECT * FROM users WHERE email=$1',[profile.emails[0].value]);
      console.log(result, 'this is line 39');
      if (result.rowCount > 0) { //if existinguser
        done(null, result.rows[0]);
      } else {
        const newUser = await query('INSERT INTO users (username, email, password) VALUES($1, $2, $3) returning username, email',[profile.name.givenName, profile.emails[0].value, profile.id]);
        console.log(newUser);
        done(null, newUser);
      }
      // insert SQL query here to find a user in the users table if the user exists already
      // if so, redirect them to homepage
      // if not, create user in the db using profile.id
      console.log('this is the profile', profile);
      // UserData.findOne({ googleID: profile.id }).then(existingUser => {
      //   if (existingUser) {
      //     done(null, existingUser);
      //   } else {
      //     new UserData({
      //       username: profile.name.givenName,
      //       password: 'google',
      //       email: profile.emails[0].value,
      //       googleID: profile.id,
      //     })
      //       .save()
      //       .then(newUser => {
      //         done(null, newUser);
      //       });
      //   }
      // });
    }
  )
);
