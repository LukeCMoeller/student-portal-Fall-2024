const db = require('../configs/db.js')
const axios = require('axios');
const qs = require('qs');
const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.HUBGIT_CLIENT_ID,
      clientSecret: process.env.HUBGIT_CLIENT_SECRET,
      callbackURL: `https://${CODESPACE_NAME}-3002.app.github.dev/auth/github-callback`   //process.env.GITHUB_CALLBACK_URL,
    },
    (accessToken, refreshToken, profile, done) => {
      return done(null, profile);
    }
  )
);

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj));

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication API
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   responses:
 *     UnauthorizedError:
 *       description: JWT is missing or invalid
 */

// Load Libraries
const express = require('express')
const router = express.Router()
//const jwt = require('jsonwebtoken')

// Load Configurations
const cas = require('../configs/cas.js')
const requestLogger = require('../middleware/request-logger.js')
const refreshToken = require('../middleware/refreshToken.js')

// Load Models
const User = require('../models/user.js')

// Configure Logging
router.use(requestLogger)

/**
 * @swagger
 * /auth/login:
 *   get:
 *     summary: login
 *     description: log in the current user by redirecting to CAS or using force authentication if enabled
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       301:
 *         description: user is logged in, redirect to homepage
 */
router.get('/login', refreshToken, async function (req, res, next) {
  if (!req.session.user_id) {
    let email = ''
    if (req.query.email && process.env.FORCE_AUTH === 'true') {
      // force authentication enabled, use email from query
      email = req.query.email
    } else {
      // use CAS authentication
      if (req.session[cas.session_name] === undefined) {
        // CAS is not authenticated, so redirect
        // Hack to fix redirects
        req.url = req.originalUrl
        cas.bounce_redirect(req, res, next)
        return
      } else {
        // CAS is authenticated, get email from session
        email =
          req.session[cas.session_name] + '@ksu.edu'
      }
    }
    if (email && email.length != 0) {
      // Find or Create User for email
      let user = await User.findOrCreate(email)
      // Store User ID in session
      // req.session.user_id = user.id
      // req.session.user_email = email
      // https://medium.com/garage-inside-garage/secure-jwt-authentication-against-both-xss-and-xsrf-vue-js-django-rest-b1570b8acf70
      // Set Refresh Token as HTTP Only Cookie
      const refreshToken = await user.updateRefreshToken()
      res.cookie('refresh_token', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 5 * 60 * 60 * 1000, // 5 hours
      })
    }
  }
  // Redirect to Homepage
  res.redirect('/')
})

/* Discord */
router.get('/discord-callback', async (req, res) => {
  const { code } = req.query;

  const data = qs.stringify({
    client_id: process.env.HUBGIT_CLIENT_ID,
    client_secret: process.env.HUBGIT_CLIENT_SECRET,
    code: code,
    redirect_uri: 'https://${CODESPACE_NAME}-3002.app.github.dev/auth/github-callback',
    grant_type: 'authorization_code',
  });

  try {
    const response = await axios.post('https://discord.com/api/oauth2/token', data, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    const accessToken = response.data.access_token;
    const userData = await axios.get('https://discord.com/api/v10/users/@me', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const user = userData.data;
    const id = req.query.state;
    console.log(id);
    await db('user_discord')
      .insert({
        user_id: id,
        discord_id: user.id, 
        username: user.username, 
      })
      .onConflict('user_id')
      .merge();

    res.redirect('https://${CODESPACE_NAME}-5173.app.github.dev/profile')
  } catch (error) {
    console.error(error);
    res.status(500).send('Authentication failed');
  }
});

/* GitHub */
router.get('/github', (req, res, next) => {
  const userId = req.query.state;

  passport.authenticate('github', {
    scope: ['user:email'],
    state: userId 
  })(req, res, next);
});
router.get(
  '/github-callback',
  passport.authenticate('github', { failureRedirect: '/' }),
  async (req, res) => {
    console.log(req.query.state)
    await db('user_github')
      .insert({
        user_id: req.query.state,
        github_id: req.user.id, 
        username: req.user.username, 
        profile_url: req.user.profileUrl
      })
      .onConflict('user_id')
      .merge();
    res.redirect('https://${CODESPACE_NAME}-5173.app.github.dev/profile')
  }
);

/**
 * @swagger
 * /auth/token:
 *   get:
 *     summary: get JWT
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: JWT for user
 *         content:
 *           application/json:
 *             schema:
 *               token:
 *                 type: string
 *                 format: JWT
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 */
router.get('/token', refreshToken, async function (req, res, next) {
  // TODO use refresh session cookie
  if (req.session.user_id) {
    const token = await User.getToken(req.session.user_id)
    if (token) {
      res.json({
        token: token,
      })
      return
    } else {
      res.status(401)
      res.json({ error: 'User does not have role to request API token' })
    }
  } else {
    res.status(401)
    res.json({ error: 'No Session Established, Please Login' })
  }
})

/**
 * @swagger
 * /auth/token:
 *   post:
 *     summary: use refresh token to get new JWT
 *     tags: [Auth]
 *     requestBody:
 *       description: refresh token
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               refresh_token:
 *                 type: string
 *                 format: JWT
 *     responses:
 *       200:
 *         description: JWT for user
 *         content:
 *           application/json:
 *             schema:
 *               token:
 *                 type: string
 *                 format: JWT
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 */
// router.post('/token', async function (req, res, next) {
//   if (req.body.refresh_token) {
//     jwt.verify(
//       req.body.refresh_token,
//       process.env.TOKEN_SECRET,
//       async (err, data) => {
//         // console.log('Debugging old refresh tokens')
//         // console.log(err)
//         // console.log(data)
//         if (err) {
//           res.status(401)
//           res.json({ error: 'Error Parsing Token' })
//           return
//         }
//         if (data && data.refresh_token) {
//           // If we receive a verified token, see if it is valid in the database
//           const user = await User.findByRefreshToken(data.refresh_token)
//           if (user != null) {
//             // If it is valid, generate a new token and send
//             const token = await User.getToken(user.id)
//             res.json({
//               token: token,
//             })
//           } else {
//             res.status(401)
//             res.json({
//               error:
//                 'Refresh Token Not Found in Database, Session Expired, Please Login',
//             })
//           }
//         } else {
//           res.status(401)
//           res.json({ error: 'Token Data Invalid, Please Login' })
//         }
//       }
//     )
//   } else {
//     res.status(401)
//     res.json({ error: 'Refresh Token Not Found in Request Body' })
//   }
// })

/**
 * @swagger
 * /auth/logout:
 *   get:
 *     summary: logout
 *     description: log out the current user
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       301:
 *         description: user is logged out, redirect to home page
 */
router.get('/logout', refreshToken, async function (req, res, next) {
  if (req.session.user_id) {
    await User.clearRefreshToken(req.session.user_id)
  }
  if (req.session[cas.session_name]) {
    cas.logout(req, res, next)
  } else {
    req.session.destroy()
    res.redirect('/')
  }
})

module.exports = router