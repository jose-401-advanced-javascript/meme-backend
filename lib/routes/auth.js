const { Router } = require('express');
const User = require('../model/User');

module.exports = Router()
  .post('/signup', (req, res, next) => {
    const { username, password } = req.body;
    User
      .create({ username, password })
      .then(user => {
        console.log(user);
        
        res.cookie('session', user.token());
        res.send(user);
      })
      .catch(next);
  });
