'use strict'

import Base from './Base'
import Hash from 'password-hash'

export default class User extends Base {
  static get attributes () {
    return {
      first_name: this.Sequelize.STRING,
      last_name: this.Sequelize.STRING,
      full_name: this.Sequelize.STRING,
      email: {
        type: this.Sequelize.STRING
      },
      password: this.Sequelize.STRING,
      phone: this.Sequelize.STRING,
      address: this.Sequelize.STRING
    }
  }

  static get options () {
    return {
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      tableName: 'users',
      hooks: {
        beforeCreate: (user) => {
          user.password = Hash.generate(user.password)
        }
      },
      setterMethods: {
        verifyPassword (password) {
          this.setDataValue('password', Hash.verify(password, this.password))
        }
      }
    }
  }
}

module.exports = User
