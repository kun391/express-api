'use strict'

import Orm from './orm'
import Sequelize from 'sequelize'

export default class Base {
  static get className () {
    return this.name
  }

  static get define () {
    return {}
  }

  static model () {
    return Orm.define(this.className, this.define)
  }
}

module.exports = Base
