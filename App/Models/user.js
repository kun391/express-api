'use strict'

import Base from './Base'
import Building from './Building'
import Pet from './Pet'
import Hash from 'password-hash'
import uuid from 'uuid/v4'

export default class User extends Base {
  constructor () {
    super()
  }

  static get attributes () {
    return {
      uid: this.Sequelize.STRING,
      first_name: this.Sequelize.STRING,
      last_name: this.Sequelize.STRING,
      full_name: this.Sequelize.STRING,
      facebook_id: this.Sequelize.STRING,
      email: {
        type: this.Sequelize.STRING
      },
      password: this.Sequelize.STRING,
      phone: this.Sequelize.STRING,
      address: this.Sequelize.STRING,
      building_id: this.Sequelize.INTEGER,
      unit_number: this.Sequelize.STRING,
      unit_size: this.Sequelize.INTEGER,
      unit_bedroom: this.Sequelize.INTEGER,
      unit_bathroom: this.Sequelize.INTEGER
    }
  }

  static get relations () {
    return [
      {
        type: 'belongsTo',
        target: Building.model(),
        options: { foreignKey: 'building_id', as: 'building' }
      }, {
        type: 'hasOne',
        target: Pet.model(),
        options: { foreignKey: 'user_id', as: 'pet' }
      }
    ]
  }

  static get options () {
    return {
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      tableName: 'users',
      hooks: {
        beforeCreate: (user) => {
          if (!user.facebook_id && user.password) {
            user.password = Hash.generate(user.password)
            user.uid = uuid()
          }
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
