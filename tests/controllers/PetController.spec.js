'use strict'

import { Request } from '../TestCase'
import * as Helper from '../TestHelpers'
import Pet from '../../app/models/Pet'
import UserFactory from '../factories/UserFactory'

beforeEach(async (done) => {
  // await Pet.model().destroy({where: {}})
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
  // it.only('Fail: Validate', async () => {
  //   const user = await UserFactory.create({ password: '123', email: 'johan@gmail.com' })
  //   const token = Helper.getToken(user.get())

  //   return Request.post('/pets')
  //     .set('Accept', 'application/json')
  //     .set('Authorization', `Bearer ${token}`)
  //     .send({
  //       name: 21312312,
  //       sex: 'male',
  //       type: 'dog'
  //     })
  //     .then((res) => {
  //       Helper.validate400(res)
  //       expect(res.body.errors.length).toBe(1)
  //       expect(res.body.errors[0].messages.length).toBe(1)
  //       expect(res.body.errors[0].field[0]).toEqual('name')
  //     })
  // })
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
    // it('Success', () => {
    //   return Request.post('/auth/signup')
    //     .set('Accept', 'application/json')
    //     .send({
    //       full_name: 'Goft Johan',
    //       email: 'johan@gmail.com',
    //       password: '2oqwif'
    //     })
    //     .then((res) => {
    //       return Request.post('/auth/signin')
    //         .set('Accept', 'application/json')
    //         .send({
    //           email: 'johan@gmail.com',
    //           password: '2oqwif'
    //         })
    //         .then((res) => {
    //           Helper.success200(res)
    //         })
    //     })
    // })
    // it('Fail: Pet not found', () => {
    //   return Request.post('/auth/signin')
    //     .set('Accept', 'application/json')
    //     .send({
    //       email: 'johan@gmail.com',
    //       password: '2oqwif'
    //     })
    //     .then((res) => {
    //       Helper.notFound404(res)
    //     })
    // })
  })
})
