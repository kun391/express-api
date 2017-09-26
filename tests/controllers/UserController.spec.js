'use strict'

import { Request } from '../TestCase'
import * as Helper from '../TestHelpers'
import User from '../../app/models/User'
import sequelize from 'sequelize'

beforeEach(async (done) => {
  await User.model().destroy({where: {}})
  done()
})

describe('Authenticate', () => {
  describe('Signup', () => {
    it('Signup success', () => {
      return Request.post('/auth/signup')
        .set('Accept', 'application/json')
        .send({
          full_name: 'Goft Johan',
          email: 'johan@gmail.com',
          password: '2oqwif'
        })
        .then((res) => {
          Helper.success201(res)
        })
    })
    it('Signup fail: email invalid', () => {
      return Request.post('/auth/signup')
        .set('Accept', 'application/json')
        .send({
          full_name: 'Goft Johan',
          email: 'johan#ail.com',
          password: '2oqwif'
        })
        .then((res) => {
          Helper.validate400(res)
          expect(res.body.errors.length).toBe(1)
          expect(res.body.errors[0].messages.length).toBe(1)
          expect(res.body.errors[0].field[0]).toEqual('email')
        })
    })
    it('Signup fail: fields required', () => {
      return Request.post('/auth/signup')
        .set('Accept', 'application/json')
        .send({})
        .then((res) => {
          Helper.validate400(res)
          expect(res.body.errors.length).toBe(3)
              // email
          expect(res.body.errors[0].messages.length).toBe(1)
          expect(res.body.errors[0].field[0]).toEqual('email')
              // full_name
          expect(res.body.errors[1].messages.length).toBe(1)
          expect(res.body.errors[1].field[0]).toEqual('full_name')
              // password
          expect(res.body.errors[2].messages.length).toBe(1)
          expect(res.body.errors[2].field[0]).toEqual('password')
        })
    })
    it('Signup fail: wrong field length', () => {
      return Request.post('/auth/signup')
        .set('Accept', 'application/json')
        .send({
          full_name: 'Go',
          email: 'johan@gmail.com',
          password: '234'
        })
        .then((res) => {
          Helper.validate400(res)
          expect(res.body.errors.length).toBe(2)
              // full_name
          expect(res.body.errors[0].messages.length).toBe(1)
          expect(res.body.errors[0].field[0]).toEqual('full_name')
          expect('"full_name" length must be at least 3 characters long').toEqual(res.body.errors[0].messages[0])
              // password
          expect(res.body.errors[1].messages.length).toBe(1)
          expect(res.body.errors[1].field[0]).toEqual('password')
          expect('"password" length must be at least 6 characters long').toEqual(res.body.errors[1].messages[0])
        })
    })
  })

  describe('Signin', () => {
    it('Signin success', () => {
      return Request.post('/auth/signup')
        .set('Accept', 'application/json')
        .send({
          full_name: 'Goft Johan',
          email: 'johan@gmail.com',
          password: '2oqwif'
        })
        .then((res) => {
          return Request.post('/auth/signin')
            .set('Accept', 'application/json')
            .send({
              email: 'johan@gmail.com',
              password: '2oqwif'
            })
            .then((res) => {
              Helper.success200(res)
            })
        })
    })
    it('Signin fail: Wrong password', () => {
      return Request.post('/auth/signup')
        .set('Accept', 'application/json')
        .send({
          full_name: 'Goft Johan',
          email: 'johan@gmail.com',
          password: '2oqwif'
        })
        .then((res) => {
          return Request.post('/auth/signin')
            .set('Accept', 'application/json')
            .send({
              email: 'johan@gmail.com',
              password: '2oqvvvwif'
            })
            .then((res) => {
              Helper.notFound404(res)
            })
        })
    })
    it('Signin fail: Account not found', () => {
      return Request.post('/auth/signin')
        .set('Accept', 'application/json')
        .send({
          email: 'johan@gmail.com',
          password: '2oqwif'
        })
        .then((res) => {
          Helper.notFound404(res)
        })
    })
    it('Signin fail: validate', () => {
      return Request.post('/auth/signup')
        .set('Accept', 'application/json')
        .send({
          full_name: 'Goft Johan',
          email: 'joha.gmail.com',
          password: '2oqwif'
        })
        .then((res) => {
          Helper.validate400(res)
          expect(res.body.errors.length).toBe(1)
          expect(res.body.errors[0].messages.length).toBe(1)
          expect(res.body.errors[0].field[0]).toEqual('email')
        })
    })
  })

  describe('Signin with Facebook', () => {
    it('Facebook Fail: invalid token', () => {
      return Request.post('/auth/facebook')
        .set('Accept', 'application/json')
        .send({access_token: 'gagagagaioufghaosfhaofiahoh'})
        .expect(400)
    })
    it('Facebook Fail: invalid token', () => {
      return Request.post('/auth/facebook')
        .set('Accept', 'application/json')
        .expect(401)
    })
  })
})

describe('User', () => {
  describe('GET users/:id', () => {
    it('Fail: Not found', () => {
      return Request.get('/users/0')
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ODUsImVtYWlsIjoiam9oYW5AZ21haWwuY29tIiwiaWF0IjoxNTA2MDE1NTY1fQ.72ntd7lLht5Noe1-NeEqoEgROWswZNd0KbaY8pgXk4U`)
        .expect(401)
    })
    it('Get success', () => {
      return Request.post('/auth/signup')
        .set('Accept', 'application/json')
        .send({
          full_name: 'Goft Johan',
          email: 'johan@gmail.com',
          password: '2oqwif'
        })
        .then((res) => {
          const id = res.body.data.id
          const token = res.body.data.accessToken

          return Request.get(`/users/${id}`)
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .then((res) => {
              Helper.success200(res)
            })
        })
    })
  })
  describe('PUT users/:id', () => {
    it('Fail: Not found', () => {
      return Request.post('/auth/signup')
        .set('Accept', 'application/json')
        .send({
          full_name: 'Goft Johan',
          email: 'johan@gmail.com',
          password: '2oqwif'
        })
        .then((res) => {
          const token = res.body.data.accessToken
          return Request.put(`/users/0`)
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .send({building_id: 1, unit_size: 123, unit_number: 112, unit_bedroom: 3, unit_bathroom: 3})
            .expect(403)
        })
    })
    it('Fail: validate', () => {
      return Request.post('/auth/signup')
        .set('Accept', 'application/json')
        .send({
          full_name: 'Goft Johan',
          email: 'johan@gmail.com',
          password: '2oqwif'
        })
        .then((res) => {
          let id = res.body.data.id
          const token = res.body.data.accessToken

          return Request.put(`/users/${id}`)
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .send({building_id: 'agag', unit_size: 'agag', unit_number: 112, unit_bedroom: 3, unit_bathroom: 3})
            .then((res) => {
              Helper.validate400(res)
              expect(res.body.errors.length).toBe(2)
              expect(res.body.errors[0].messages.length).toBe(1)
              expect(res.body.errors[0].field[0]).toEqual('building_id')
              expect(res.body.errors[1].messages.length).toBe(1)
              expect(res.body.errors[1].field[0]).toEqual('unit_size')
            })
        })
    })
    it('Fail: validate required', () => {
      return Request.post('/auth/signup')
        .set('Accept', 'application/json')
        .send({
          full_name: 'Goft Johan',
          email: 'johan@gmail.com',
          password: '2oqwif'
        })
        .then((res) => {
          let id = res.body.data.id
          const token = res.body.data.accessToken

          return Request.put(`/users/${id}`)
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .then((res) => {
              Helper.validate400(res)
              expect(res.body.errors.length).toBe(5)
              expect(res.body.errors[0].messages.length).toBe(1)
              expect(res.body.errors[0].field[0]).toEqual('building_id')
              expect(res.body.errors[1].messages.length).toBe(1)
              expect(res.body.errors[1].field[0]).toEqual('unit_number')
              expect(res.body.errors[2].messages.length).toBe(1)
              expect(res.body.errors[2].field[0]).toEqual('unit_size')
              expect(res.body.errors[3].messages.length).toBe(1)
              expect(res.body.errors[3].field[0]).toEqual('unit_bedroom')
              expect(res.body.errors[4].messages.length).toBe(1)
              expect(res.body.errors[4].field[0]).toEqual('unit_bathroom')
            })
        })
    })
    it('Success', () => {
      return Request.post('/auth/signup')
        .set('Accept', 'application/json')
        .send({
          full_name: 'Goft Johan',
          email: 'johan@gmail.com',
          password: '2oqwif'
        })
        .then((res) => {
          let id = res.body.data.id
          const token = res.body.data.accessToken

          return Request.put(`/users/${id}`)
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .send({building_id: 1, unit_size: 123, unit_number: 112, unit_bedroom: 3, unit_bathroom: 3})
            .then((res) => {
              Helper.success200(res)
            })
        })
    })
  })
})
