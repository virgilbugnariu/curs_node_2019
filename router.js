const express = require('express');
const usersController = require('./controllers/UsersController');
const usersTasksController = require('./controllers/UsersTasksController');
const taskController = require('./controllers/TasksController');
const authenticationController = require('./controllers/AuthenticationController');
const authenticationMiddleware = require('./middlewares/authentication');

const router = express.Router();

/* 
  Inregistram middleware-ul pentru a fi inclus in chain doar pe request-urile 
  de pe ruta /users.
  Pentru a-l aplica pe intreaga aplicatie, metoda `.use()` exista si pe instanta de express (`app` din index.js)
*/

// Users Resource
router.use('/users', authenticationMiddleware);

router.get('/users', usersController.index);
router.post('/users', usersController.create);
router.get('/users/:id', usersController.show);
router.put('/users/:id', usersController.update);
router.delete('/users/:id', usersController.delete);


// UsersTasks SubResource
router.get('/users/:userId/tasks', usersTasksController.index);
router.post('/users/:userId/tasks', usersTasksController.create);

// Tasks Resource
router.get('/tasks/:id', taskController.show);
router.delete('/tasks/:id', taskController.delete);
router.put('/tasks/:id', taskController.update);

/*
  Middleware-ul de autentificare nu ar trebui sa fie luat in considerare pe ruta /login.
  Nu ar mai fi posibila autentificarea.
*/
router.post('/login', authenticationController.login);

module.exports = router;
