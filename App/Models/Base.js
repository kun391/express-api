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

  static get relations () {
    return []
  }

  static model () {
    const model = Orm.define(this.className, this.attributes, this.options)
    if (this.relations && this.relations instanceof Array) {
      this.relations.forEach((association) => {
        model[association.type](association.target, association.options)
      })
    }
    return model
  }
}

module.exports = Base
