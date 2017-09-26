'use strict'

import BaseController from './BaseController'
import Base from '../../models/Base'
import User from '../../models/User'
import {JWT} from '../../../config/app'
import jwt from 'jsonwebtoken'

class AuthController extends BaseController {
  constructor (request, response) {
    super(request, response)
  }
  async signUp () {
    const input = this.request.only(['first_name', 'last_name', 'email', 'password'])

    const existEmail = await User.model().count({ where: { email: input.email }})

    // Todo: Move to validation rules
    if (existEmail) {
      return this.throwError(400, {
        status: 400,
        statusText: 'Bad Request',
        errors: [
          {
            field: ['email'],
            location: 'body',
            messages: [
              'the `email` you entered is already in our system.'
            ]
          }
        ]
      })
    }

    const user = await User.model().create(input)
    const payload = {id: user.id, email: user.email}
    const token = jwt.sign(payload, JWT.key, { expiresIn: '7d' })

    this.response.status(201).json({data: {id: user.id, accessToken: token}})
  }

  async signIn () {
    const input = this.request.only(['email', 'password'])
    const user = await User.model().findOne({where: {email: input.email}})

    if (!user) {
      return this.throwError(404)
    }

    user.verifyPassword = input.password

    if (!user.password) {
      return this.throwError(404)
    }

    const payload = {id: user.id, email: user.email}
    const token = jwt.sign(payload, JWT.key)

    this.response.json({data: {id: user.id, accessToken: token}})
  }

  async signUpFacebook () {
    const user = await this.currentUser
    const payload = {id: user.id, email: user.email}
    const token = jwt.sign(payload, JWT.key, { expiresIn: '7d' })

    this.response.json({data: {id: user.id, accessToken: token}})
  }
}

module.exports = AuthController
