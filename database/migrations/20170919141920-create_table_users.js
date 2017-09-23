'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'users',
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        created_at: {
          type: Sequelize.DATE
        },
        created_at: {
          type: Sequelize.DATE
        },
        updated_at: {
          type: Sequelize.DATE
        },
        first_name: Sequelize.STRING,
        last_name: Sequelize.STRING,
        full_name: Sequelize.STRING,
        password: Sequelize.STRING,
        email: Sequelize.STRING,
        phone: Sequelize.STRING,
        address: Sequelize.STRING,
        facebook_id: Sequelize.STRING
      }
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('users')
  }
}
