'use strict'

import BaseController from './BaseController'
import User from '../../models/User'
import Building from '../../models/Building'

class UserController extends BaseController {
  async show () {
    const userId = this.request._request.params.userId
    const currentUser = await this.currentUser

    if (parseInt(currentUser.id) !== parseInt(userId)) {
      return this.throwError(403)
    }

    const user = await User.model().findOne({ where: { id: userId, email: currentUser.email } }, { include: [Building.model()] })
    if (!user) {
      return this.throwError(404)
    }

    return this.response.json({ data: user })
  }

  async verify () {
    const userId = this.request._request.params.userId
    const currentUser = await this.currentUser

    if (currentUser.id.toString() !== userId.toString()) {
      return this.throwError(403)
    }

    const input = this.request.only(['building_id', 'unit_number', 'unit_size', 'unit_bedroom', 'unit_bathroom'])

    const user = await User.model().update(input, { where: { id: userId, email: currentUser.email } })
    console.log(user)
    return this.response.json({ data: user })
  }
}

module.exports = UserController
