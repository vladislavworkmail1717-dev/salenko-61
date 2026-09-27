// middlewares/auth.js
// Мідлвар автентифікації: перевіряє наявність заголовка Authorization.
// Застосовується до маршрутів /users та /users/:userId.

function authenticate(req, res, next) {
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    return res.status(401).send('Access denied. No credentials sent.');
  }

  next();
}

module.exports = authenticate;
