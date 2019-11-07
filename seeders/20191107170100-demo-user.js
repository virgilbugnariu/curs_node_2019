'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users',
[
          {
            firstName: 'Virgil',
            lastName: 'Bugnariu',
            email: 'test@test.com',
            createdAt: new Date().getTime(),
            updatedAt: new Date().getTime(),
          },
          {
            firstName: 'Adrian',
            lastName: 'Mihai',
            email: 'test2@test.com',
            createdAt: new Date().getTime(),
            updatedAt: new Date().getTime(),
          },
      ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
