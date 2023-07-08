// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
// require in user model

// @description Register new user
// @route POST /api/users/register
// @access Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  // check for all user inputs
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please add all fields");
  } else {
    res.status(200).json({ message: "You are logged in!"})
  }

  // check if user exists
//   const userExists = await User.findOne({ email });

//   if (userExists) {
//     res.status(400);
//     throw new Error("User already exists");
//   }

//   // hash password
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);

//   // create user document in db
//   const user = await User.create({
//     name,
//     email,
//     password, // add hashed password as value
//   });


//   if (user) {
    //     res.status(201);
    //   }

    //   return next();
});

// @description Authenticate user data
// @route POST /api/users/login
// @access Public
const loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  // check for email and password
  if (!email || !password) {
    res.status(400);
    throw new Error("Please provide email and password");
  } else {
    res.status(200).json({ message: "You are logged in"});
  }

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
});


// @description send to home page
// @route GET /api/users/home
// @access Private
const goHome = asyncHandler(async (req, res, next) => {
//   res.redirect('/home')
// return next;
});

// Generate token
// const generateToken = (id) => {
//   // will sign a new token with the id passed in with the secret used and will expire in 30 days
//   return jwt.sign({ id }, process.env.JWT_SECRET, {
//     expiresIn: "30d",
//   });
// };

module.exports = {
  registerUser,
  loginUser,
  goHome,
};
