'use strict'

import faker from 'faker'
import _ from 'lodash'

class BaseFactory {
  static get model () {
    return {}
  }

  static get faker () {
    return faker
  }

  static get defaults () {
    return {}
  }

  static build (attrs) {
    return _.merge(this.defaults, attrs)
  }

  static async create (attrs) {
    const attributes = await this.build(attrs)
    return await this.model.create(attrs)
  }
}

module.exports = BaseFactory
