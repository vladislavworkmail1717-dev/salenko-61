// middlewares/logger.js
// Мідлвар логування: фіксує метод, url та час кожного запиту.
// Застосовується глобально (app.use), тому покриває і "/", і всі інші маршрути.

function logRequests(req, res, next) {
  console.log(`${new Date().toISOString()} - ${req.method} request to ${req.url}`);
  next();
}

module.exports = logRequests;
