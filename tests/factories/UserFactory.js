'use strict'

import BaseFactory from './BaseFactory'
import User from '../../app/models/User'

class UserFactory extends BaseFactory {
  static get model () {
    return User.model()
  }

  static get defaults () {
    return {
      phone: this.faker.phone.phoneNumber(),
      uid: this.faker.random.uuid(),
      email: this.faker.internet.email(),
      password: this.faker.internet.password(),
      first_name: this.faker.name.firstName(),
      last_name: this.faker.name.lastName(),
      full_name: this.faker.name.findName(),
      address: this.faker.address.streetAddress()
    }
  }
}

module.exports = UserFactory
