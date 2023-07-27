const passport = require('passport');
const userController = require('../controllers/userController');
const sessionController = require('../controllers/sessionController');
require('../services/passport');

const express = require('express');
const router = express.Router();

// Route user has to visit to kick off the oAuth process
router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
  })
);

function setCookie(req, res, next) {
  res.cookie('email', req.user.email, {
    httpOnly: false, // allows JS code to access it
  });
  next();
}

// router.get('/current_user', (req, res) => {
//   console.log('this is current user');
//   res.send(req.cookies);
// });

// Route that we are using as our callback URL inside passport.js file
router.get(
  '/google/callback',
  passport.authenticate('google'),
  setCookie,
  (req, res, next) => {
    res.redirect('http://localhost:8080');
    next();
  }
);

module.exports = router;
