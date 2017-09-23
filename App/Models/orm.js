'use strict'

import {DB} from '../../config/app'
import Sequelize from 'sequelize'

const Orm = new Sequelize(DB.MYSQL.DB_NAME, DB.MYSQL.USERNAME, DB.MYSQL.PASSWORD, {
  host: DB.MYSQL.HOST,
  port: DB.MYSQL.PORT,
  dialect: 'mysql',

  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
})

module.exports = Orm
