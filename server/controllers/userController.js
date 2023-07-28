// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcryptjs");
// const asyncHandler = require("express-async-handler");
// require in user model
// const UserData = require('../models/userModel');
const dbsql = require('../db_sql');

// @description Register new user
// @route POST /api/users/register
// @access Public
const userController = {};

userController.createUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    // check for all user inputs
    if (!name || !email || !password) {
      res.status(400);
      throw new Error('Please add all fields');
    }

    // check if user exists
    const userExists = await dbsql('SELECT * FROM users WHERE email=$1', [
      email,
    ]);
    console.log(userExists);

    if (userExists.rowCount) {
      return next('User already exists');
    }

    const newUser = await dbsql('INSERT INTO users VALUES($1, $2, $3, $4)');

    res.locals.newUser = newUser;

    return next();
  } catch (err) {
    console.log(err);
    return next(err);
  }
};

userController.createUserOAuth = async (req, res, next) => {
  try {
    const { username, email } = req.user;
    // console.log(req.user, 'this is req.user');
    // check for all user inputs
    if (!username || !email) {
      res.status(400);
      throw new Error('Please add all fields');
    }

    // check if user exists
    const userExists = await dbsql('SELECT * FROM users WHERE email=$1', [
      email,
    ]);
    console.log(userExists);

    if (userExists.rowCount) {
      res.locals.newUser = userExists.rows[0];
      return next();
    }

    const newUser = await dbsql(
      'INSERT INTO users(username, email, password) VALUES($1, $2, $3)',
      [username, email, 'google']
    );
    console.log('this is newUser after SQL query insert');

    res.locals.newUser = newUser;

    return next();
  } catch (err) {
    console.log(err);
    return next(err);
  }
};

// @description Authenticate user data
// @route POST /api/users/login
// @access Public
userController.verifyUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    res.locals.status = true;

    const user = await UserData.findOne({ email });

    if (!user) {
      res.locals.status = 'Incorrect username or password';
      return next();
    }

    const correctPass = await UserData.comparePassword(password, user.password);

    if (!correctPass) {
      res.locals.status = 'Incorrect username or password';
      return next();
    }

    res.locals.user = user;

    return next();
  } catch (err) {
    return next(err);
  }

  // check for email and password

  //   // find user by email in db
  //   const user = await User.findOne({ email });

  // //   // check if user exists and password is correct
  //   if (user && (await bcrypt.compare(password, user.password))) {
  //     res.json({
  //       _id: user.id,
  //       name: user.name,
  //       email: user.email,
  //       token: generateToken(user._id),
  //     });
  //     return next()
  //   } else {
  //     res.status(400);
  //     throw new Error("Invalid Credentials");
  //   }
};

// @description send to home page
// @route GET /api/users/home
// @access Private
userController.goHome = async (req, res) => {
  //   res.redirect('/home')
};

// Generate token
// const generateToken = (id) => {
//   // will sign a new token with the id passed in with the secret used and will expire in 30 days
//   return jwt.sign({ id }, process.env.JWT_SECRET, {
//     expiresIn: "30d",
//   });
// };

module.exports = userController;
