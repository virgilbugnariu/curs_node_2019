const express = require('express');
const usersController = require('./controllers/UsersController');
const authenticationController = require('./controllers/AuthenticationController');
const authenticationMiddleware = require('./middlewares/authentication');

const router = express.Router();
// router.use('/users', authenticationMiddleware);

router.get('/users', usersController.index);
router.post('/users', usersController.create);
router.get('/users/:id', usersController.show);
router.put('/users/:id', usersController.update);
router.delete('/users/:id', usersController.delete);

router.post('/login', authenticationController.login);
router.post('/verify', authenticationController.verify);
module.exports = router;
