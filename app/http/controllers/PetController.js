'use strict'

import BaseController from './BaseController'
import User from '../../models/User'
import Pet from '../../models/Pet'

class PetController extends BaseController {
  async add () {
    const input = this.request.only(['name', 'sex', 'type'])
    const currentUser = await this.currentUser

    input.user_id = currentUser.id

    Pet.model().findOrCreate({ where: input }).spread((pet, created) => {
      if (pet) {
        return this.response.status(201).json({ data: pet.get({ plain: true }) })
      }

      return this.throwError(500)
    })
  }

  async delete () {
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

module.exports = PetController
