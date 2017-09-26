'use strict'

import BaseFactory from './BaseFactory'
import Pet from '../../app/models/Pet'

class PetFactory extends BaseFactory {
  static get model () {
    return Pet.model()
  }

  static get defaults () {
    return {
      name: this.faker.name.firstName(),
      sex: 'male',
      type: 'dog'
    }
  }
}

module.exports = PetFactory
