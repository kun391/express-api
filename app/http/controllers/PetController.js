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
    const petId = this.request._request.params.id

    const currentUser = await this.currentUser

    const effect = await Pet.model().destroy({ where: { id: petId, user_id: currentUser.id } })

    if (effect === 0) {
      return this.throwError(404)
    }

    return this.response.status(204).json()
  }
}

module.exports = PetController
