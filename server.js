// server.js
const express = require('express');

const logRequests = require('./middlewares/logger');
const sessionMiddleware = require('./middlewares/session');
const trackSession = require('./middlewares/sessionTracker');
const errorHandler = require('./middlewares/errorHandler');
const routes = require('./routes');

const app = express();
const PORT = 3000;

app.use(express.json());

app.use(logRequests);
app.use(sessionMiddleware);
app.use(trackSession);

app.use('/', routes);

app.use((req, res) => {
  res.status(404).send('Route not found');
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
