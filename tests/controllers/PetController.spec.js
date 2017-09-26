'use strict'

import { Request } from '../TestCase'
import * as Helper from '../TestHelpers'
import Pet from '../../app/models/Pet'
import User from '../../app/models/User'
import UserFactory from '../factories/UserFactory'
import PetFactory from '../factories/PetFactory'

beforeEach(async (done) => {
  await Pet.model().destroy({where: {}})
  await User.model().destroy({where: {}})
  done()
})

describe('Add a pet', () => {
  it('Success', async () => {
    const user = await UserFactory.create({ password: '123', email: 'johan@gmail.com' })
    const token = Helper.getToken(user.get())
    return Request.post('/pets')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Goft Johan',
        sex: 'male',
        type: 'dog'
      })
      .then((res) => {
        Helper.success201(res)
        expect('Goft Johan').toEqual(res.body.data.name)
        expect('male').toEqual(res.body.data.sex)
        expect('dog').toEqual(res.body.data.type)
      })
  })
  it('Fail: fields required', async () => {
    const user = await UserFactory.create({ password: '123', email: 'johan@gmail.com' })
    const token = Helper.getToken(user.get())

    return Request.post('/pets')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send()
      .then((res) => {
        Helper.validate400(res)
        expect(res.body.errors.length).toBe(3)
        expect(res.body.errors[0].messages.length).toBe(1)
        expect(res.body.errors[0].field[0]).toEqual('name')
        expect(res.body.errors[1].messages.length).toBe(1)
        expect(res.body.errors[1].field[0]).toEqual('sex')
        expect(res.body.errors[2].messages.length).toBe(1)
        expect(res.body.errors[2].field[0]).toEqual('type')
      })
  })
  describe('Delete a pet', () => {
    it('Success', async () => {
      const user = await UserFactory.create({ password: '123', email: 'johan@gmail.com' })
      const pet = await PetFactory.create({ user_id: user.get().id})
      const token = Helper.getToken(user.get())
      return Request.delete(`/pets/${pet.get().id}`)
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .then(async (res) => {
          Helper.success204(res)
          const havePet = await Pet.model().findOne({ where: { id: pet.get().id } })
          expect(havePet).toBe(null)
        })
    })
    it('Fail: Pet not found', async () => {
      const user = await UserFactory.create({ password: '123', email: 'johan@gmail.com' })
      const token = Helper.getToken(user.get())
      return Request.delete(`/pets/0`)
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .then(async (res) => {
          Helper.notFound404(res)
        })
    })
    it('Fail: Pet of other', async () => {
      const user = await UserFactory.create({ password: '123', email: 'johan@gmail.com' })
      const otherUser = await UserFactory.create({ password: '123', email: 'johan+1@gmail.com' })
      const pet = await PetFactory.create({ user_id: otherUser.get().id})
      const token = Helper.getToken(user.get())
      return Request.delete(`/pets/${pet.get().id}`)
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .then(async (res) => {
          Helper.notFound404(res)
        })
    })
  })
})
