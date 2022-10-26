'use strict';


module.exports = {
  async up (queryInterface, Sequelize) {
   return queryInterface.addColumn('Usuarios', 'userId', {
    type: Sequelize.INTEGER,
    references:{
      model:'users',
      key:'id'
    },
    onDelete:'SET NULL'
   })
  },

  async down (queryInterface, Sequelize) {
   return queryInterface.removeColumn('Usuarios', 'userId')
  }
};
