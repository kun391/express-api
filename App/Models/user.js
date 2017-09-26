'use strict'

import Base from './Base'
import Building from './Building'
import Pet from './Pet'
import Hash from 'password-hash'
import uuid from 'uuid/v4'
import ev from 'express-validation'

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
        type: this.Sequelize.STRING,
        unique: {
          args: true,
          msg: 'Oops. Looks like you already have an account with this email address. Please try to login.',
          fields: [this.Sequelize.fn('lower', this.Sequelize.col('email'))]
        },
        validate: {
          isUnique: async (email) => {
            const user = await User.model().findOne({where: {email: email}})
            if (user) {
              throw new Error({error: [{message: 'Email address already in use!'}]})
            }
          }
        }
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
        type: 'hasMany',
        target: Pet.model(),
        options: { foreignKey: 'user_id', as: 'pets' }
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
