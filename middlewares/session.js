// middlewares/session.js
// Налаштування express-session: керування сесіями користувачів через cookie.

const session = require('express-session');

const sessionMiddleware = session({
  secret: 'salenko-61-secret-key',
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 1000 * 60 * 30, // 30 хвилин
  },
});

module.exports = sessionMiddleware;
