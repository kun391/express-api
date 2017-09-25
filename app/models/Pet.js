'use strict'

import Base from './Base'

export default class Pet extends Base {
  static get attributes () {
    return {
      name: this.Sequelize.STRING,
      user_id: this.Sequelize.INTEGER,
      sex: this.Sequelize.STRING,
      type: this.Sequelize.STRING
    }
  }

  static get options () {
    return {
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      tableName: 'pets'
    }
  }
}

module.exports = Pet
