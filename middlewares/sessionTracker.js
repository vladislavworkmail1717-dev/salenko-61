// middlewares/sessionTracker.js
// Використовує дані сесії (req.session), щоб рахувати кількість запитів
// у межах однієї сесії користувача.

function trackSession(req, res, next) {
  if (!req.session.visits) {
    req.session.visits = 0;
  }

  req.session.visits += 1;
  console.log(`Session ${req.sessionID}: visit #${req.session.visits}`);

  next();
}

module.exports = trackSession;
