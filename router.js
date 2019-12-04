const express = require('express');
const usersController = require('./controllers/UsersController');
const authenticationController = require('./controllers/AuthenticationController');
const authenticationMiddleware = require('./middlewares/authentication');

const router = express.Router();

/* 
  Inregistram middleware-ul pentru a fi inclus in chain doar pe request-urile 
  de pe ruta /users.
  Pentru a-l aplica pe intreaga aplicatie, metoda `.use()` exista si pe instanta de express (`app` din index.js)
*/

router.use('/users', authenticationMiddleware);

router.get('/users', usersController.index);
router.post('/users', usersController.create);
router.get('/users/:id', usersController.show);
router.put('/users/:id', usersController.update);
router.delete('/users/:id', usersController.delete);

/*
  Middleware-ul de autentificare nu ar trebui sa fie luat in considerare pe ruta /login.
  Nu ar mai fi posibila autentificarea.
*/
router.post('/login', authenticationController.login);

module.exports = router;
