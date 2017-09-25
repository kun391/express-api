'use strict'

import Base from './Base'

export default class Maintenance extends Base {
  static get attributes () {
    return {
      user_id: this.Sequelize.INTEGER,
      content: this.Sequelize.STRING,
      start_at: this.Sequelize.DATE
    }
  }

  static get options () {
    return {
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      tableName: 'maintenances'
    }
  }
}

module.exports = Maintenance
