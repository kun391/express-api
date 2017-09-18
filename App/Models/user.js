'use strict'

import Base from './Base'

export default class User extends Base {
  static get className () {
    return 'User'
  }

  static get define () {
    return {}
  }
}

module.exports = User
