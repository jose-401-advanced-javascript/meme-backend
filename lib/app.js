const express = require('express');
const app = express();
const ensureAuth = require('./middleware/ensure-auth');

app.use(require('cors')({
  origin: true,
  credentials: true
}));
app.use(require('cookie-parser')());
app.use(express.json());

app.use('/api/v1/auth', require('./routes/auth'));
app.use('/api/v1/memes', ensureAuth, require('./routes/meme'));

app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
