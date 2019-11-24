const { Router } = require('express');
const User = require('../model/User');
const ensureAuth = require('../middleware/ensure-auth');

const MAX_AGE = 24 * 60 * 60 * 1000;

module.exports = Router()
  .post('/signup', (req, res, next) => {
    const { username, password } = req.body;
    User
      .create({ username, password })
      .then(user => {
        res.cookie('session', user.token(), {
          maxAge: MAX_AGE,
          httpOnly: true
        });
        res.send(user);
      })
      .catch(next);
  })

  .post('/signin', (req, res, next) => {
    const { username, password } = req.body;
    User
      .findOne({ username })
      .then(user => {
        if(!user || !user.compare(password)) {
          const err = new Error('Invalid username/password');
          err.status = 401;
          throw err;
        }

        res.cookie('session', user.token(), {
          maxAge: MAX_AGE,
          httpOnly: true
        });
        res.send(user);
      })
      .catch(next);
  })

  .get('/verify', ensureAuth, (req, res) => {
    res.send(req.user);
  });

