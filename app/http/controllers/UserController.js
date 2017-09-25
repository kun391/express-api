'use strict'

import BaseController from './BaseController'
import User from '../../models/User'
import BuildingModel from '../../models/Building'

class UserController extends BaseController {
  async show () {
    const userId = this.request._request.params.userId
    const currentUser = await this.currentUser

    if (parseInt(currentUser.id) !== parseInt(userId)) {
      return this.throwError(403)
    }
    const Building = BuildingModel.model()
    const user = await User.model().findOne({ where: { id: userId, email: currentUser.email }, include: [{model: Building, as: 'building'}] })

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

    if (user === 0) {
      return this.throwError(500)
    }

    return this.response.json({ data: currentUser })
  }
}

module.exports = UserController
