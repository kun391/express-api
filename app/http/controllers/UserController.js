'use strict'

import BaseController from './BaseController'
import User from '../../models/User'

class UserController extends BaseController {
  async show () {
    const userId = this.request._request.params.userId
    const currentUser = await this.currentUser

    if (!currentUser) {
      return this.throwError(404)
    }
    const user = await User.model().findOne({ where: { id: userId, email: currentUser.email } })

    if (!user) {
      return this.throwError(404)
    }
    
    return this.response.json({ data: user })
  }
}

module.exports = UserController
