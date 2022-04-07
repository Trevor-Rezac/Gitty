const { Router } = require('express');
const jwt = require('jsonwebtoken');
const oneDayInMS = 1000 * 60 * 60 * 24;
const UserService = require('../services/UserService');

module.exports = Router()
  .get('/login', (req, res, next) => {
    res
      .redirect(
        `https://github.com/login/oauth/authorize?client_id=${process.env.CLIENT_ID}&scope=user&redirect_uri=${process.env.REDIRECT_URI}`
      )
      .catch((error) => next(error));
  })

  .get('/login/callback', (req, res, next) => {
    // const user = await UserService.create(req.query.code);

    // const signedToken = jwt.sign({ ...user }, process.env.JWT_SECRET, {
    //   expiresIn: '1 day',
    // });

    // res
    //   .cookie(process.env.COOKIE_NAME, signedToken, {
    //     httpOnly: true,
    //     maxAge: oneDayInMS,
    //   })
    //   .redirect('/api/v1/posts');

    UserService.create(req.query.code)
      .then((user) =>
        jwt.sign({ ...user }, process.env.JWT_SECRET, {
          expiresIn: '1 day',
        })
      )
      .then((signedToken) => {
        res
          .cookie(process.env.COOKIE_NAME, signedToken, {
            httpOnly: true,
            maxAge: oneDayInMS,
          })
          .redirect('/api/v1/posts');
      })
      .catch((error) => next(error));
  })

  .delete('/login/callback', (req, res, next) => {
    res
      .clearCookie(process.env.COOKIE_NAME)
      .json({ success: true, message: 'Signed out successfully!' })
      .catch((error) => next(error));
  });
