const models = require('../models');

const TasksController = {
  show: (req, res) => {
    models
      .Task
      .findByPk(req.params.id)
      .then(data => {
        if (!data) {
          // Trimitem 404 Not Found
          return res.status(404).send({});
        }

        return res.send(data);
      })
  },
  update: (req, res) => {
    const body = req.body;
    const id = req.params.id;
    models
      .Task
      .update(body, { where: { id: id }})
      .then(updated => {
        models
          .Task
          .findByPk(id)
          .then(data => res.send(data));
      });
  },
  delete: (req, res) => {
    const id = req.params.id;
    models
      .Task
      .destroy({
        where: {
          id: id,
        }
      })
      .then(data => {
        return res.send(true);
      })
  },
};

module.exports = TasksController;
