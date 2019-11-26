const { Router } = require('express');
const Meme = require('../model/Meme');

module.exports = Router()
  .post('/', (req, res, next) => {
    const { top, imageUrl, bottom } = req.body;
    Meme
      .create({ top, imageUrl, bottom, user: req.user._id })
      .then(meme => res.send(meme))
      .catch(next);
  })

  .get('/', (req, res, next) => {
    Meme
      .find({ user: req.user._id })
      .then(memes => res.send(memes))
      .catch(next);
  });
