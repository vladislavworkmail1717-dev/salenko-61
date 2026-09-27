const express = require('express');
const router = express.Router();

const rootController = require('../controllers/rootController');
const usersRoutes = require('./usersRoutes');
const articlesRoutes = require('./articlesRoutes');

router.get('/', rootController.getRoot);

router.use('/users', usersRoutes);

router.use('/articles', articlesRoutes);

module.exports = router;
