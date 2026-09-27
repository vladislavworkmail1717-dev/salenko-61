// middlewares/errorHandler.js
// Централізований обробник помилок. Має бути підключений останнім (app.use
// в кінці server.js), Express розпізнає його за 4 аргументами.

function errorHandler(err, req, res, next) {
  console.error(`${new Date().toISOString()} - ERROR: ${err.message}`);
  res.status(err.status || 500).send(`Server error: ${err.message}`);
}

module.exports = errorHandler;
