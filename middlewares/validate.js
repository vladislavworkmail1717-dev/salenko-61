// middlewares/validate.js
// Мідлвар валідації даних: для POST/PUT на /users перевіряє обов'язкові поля тіла запиту.

function validateUserInput(req, res, next) {
  if (req.method === 'POST' || req.method === 'PUT') {
    const { username, email } = req.body || {};

    if (!username || !email) {
      return res.status(400).send('Missing required fields: username and email');
    }
  }

  next();
}

module.exports = validateUserInput;
