'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.addColumn('Usuarios', 'foto', {
      type: Sequelize.STRING
    })

  },

  async down (queryInterface, Sequelize) {
    return queryInterface.removeColumn('Usuarios', 'foto')

  }
};
