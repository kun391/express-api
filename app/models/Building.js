'use strict'

import Base from './Base'
import Hash from 'password-hash'

export default class Building extends Base {
  static get attributes () {
    return {
      name: this.Sequelize.STRING,
      description: this.Sequelize.STRING,
      phone: this.Sequelize.STRING,
      address: this.Sequelize.STRING
    }
  }

  static get options () {
    return {
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      tableName: 'buildings'
    }
  }
}

module.exports = Building
