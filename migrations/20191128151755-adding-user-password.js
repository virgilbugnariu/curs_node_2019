'use strict';

// A doua migratie care adauga coloana password in tabela users
// `npx sequelize db:migrate` pentru a rula migratia
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Users', 'password', Sequelize.STRING);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Users', 'password');
  }
};
