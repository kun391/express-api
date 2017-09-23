'use strict'

import Orm from './Orm'
import Sequelize from 'sequelize'

export default class Base {
  static get className () {
    return this.name
  }

  static get Sequelize () {
  	return Sequelize
  }

  static get attributes () {
    return {}
  }

  static get options () {
  	return {}
  }

  static model () {
    return Orm.define(this.className, this.attributes, this.options)
  }
}

module.exports = Base
