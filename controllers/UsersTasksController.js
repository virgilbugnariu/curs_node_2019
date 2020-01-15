const models = require('../models');

const UsersTasksController = {
  index: (req, res) => {
    models
      .User
      .findByPk(req.params.userId)
      .then(user => user.getTasks())
      .then(tasks => res.send(tasks));

  },
  create: (req, res) => {
    const body = req.body;

    models.Task.create({
      userId: req.params.userId,
      name: body.name,
      status: body.status || "todo",
    }).then(task => {
      return models
      .User
      .findByPk(req.params.userId, {
        include: [
          {
            model: models.Task,
          }
        ]
      })
      .then(user => {
          return res.status(201).send(user);
        });
    });
  },
};

module.exports = UsersTasksController;
