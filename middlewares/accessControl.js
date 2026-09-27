// middlewares/accessControl.js
// Мідлвар перевірки прав доступу до статей: читання (GET) дозволено всім,
// а зміна даних (POST/PUT/DELETE) вимагає заголовок x-user-role: editor.

function checkArticleAccess(req, res, next) {
  if (req.method === 'GET') {
    return next();
  }

  const role = req.headers['x-user-role'];

  if (role !== 'editor') {
    return res.status(403).send('Access denied. Editor role required to modify articles.');
  }

  next();
}

module.exports = checkArticleAccess;
