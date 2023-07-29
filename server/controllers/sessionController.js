const jwt = require('jsonwebtoken');
const axios = require('axios');

const sessionController = {};

// sessionController.githubAuth = async (req, res, next) => {
//   try {
//     const { code } = req.body;
//     const params = `client_id=${process.env.GITHUB_CLIENT_ID}&client_secret=${process.env.GITHUB_CLIENT_SECRET}&code=${code}`;

//     const response = await axios.post(
//       `https://github.com/login/oauth/access_token?${params}`,
//       {
//         headers: {
//           Accept: 'application/json',
//         },
//       }
//     );
//     res.locals.status = true;
//     res.locals.token = response.data;

//     return next();
//   } catch (err) {
//     return next(err);
//   }
// };

sessionController.startSession = async (req, res, next) => {
  try {
    const { email } = res.locals.user;

    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.cookie('token', token, { httpOnly: true, secure: true });

    return next();
  } catch (err) {
    return next(err);
  }
};

sessionController.isLoggedIn = async (req, res, next) => {
  try {
    const { token, session } = req.cookies;

    if (!session && !token) {
      res.locals.isLoggedIn = false;
      return next();
    }

    if (session !== undefined) {
      res.locals.isLoggedIn = true;
      return next();
    }

    const loggedIn = jwt.verify(token, process.env.JWT_SECRET);

    res.locals.isLoggedIn = loggedIn;

    return next();
  } catch (err) {
    console.log(`Error: ${err}`);
    return next(err);
  }
};

sessionController.logout = async (req, res, next) => {
  try {
    res.clearCookie('token',{httpOnly: true,secure: true});
    res.clearCookie('email');
    res.clearCookie('session');
    return next();
  } catch (err) {
    return next(err);
  }
};

module.exports = sessionController;
