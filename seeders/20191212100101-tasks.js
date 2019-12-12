'use strict';

const models = require('../models');

module.exports = {
  up: (queryInterface, Sequelize) => {
    const validStatus = ["todo", "in progress", "done"];

    return models
      .User
      .findAll()
      .then(users => {
        return users.map(user => user.id);
      }).then(userIds => {

        const tasks = [];

        userIds.forEach((id) => {
          tasks.push({
              "name": "Write Code",
              "status": validStatus[Math.floor((Math.random()*validStatus.length))],
              "userId": id
          });
          tasks.push({
            "name": "Drink Coffee",
            "status": validStatus[Math.floor((Math.random()*validStatus.length))],
            "userId": id
          });
          tasks.push({
            "name": "Commit & Push",
            "status": validStatus[Math.floor((Math.random()*validStatus.length))],
            "userId": id
          });
        })

        return queryInterface.bulkInsert('Tasks',
          tasks, {});
      }); 
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Tasks', null, {});
  }
};
