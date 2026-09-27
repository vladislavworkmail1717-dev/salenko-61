const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
const authenticate = require('../middlewares/auth');
const validateUserInput = require('../middlewares/validate');

router.use(authenticate);

router.get('/', usersController.getUsers);
router.post('/', validateUserInput, usersController.postUsers);

router.get('/:userId', usersController.getUserById);
router.put('/:userId', validateUserInput, usersController.putUserById);
router.delete('/:userId', usersController.deleteUserById);

module.exports = router;
