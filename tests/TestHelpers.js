'use strict'

import {JWT} from '../config/app'
import jwt from 'jsonwebtoken'

export function success201 (res, expectData) {
  expect(res.statusCode).toEqual(201)
  expect(res.body).not.toBe(null)
  if (expectData) {
    expect(res.body).toEqual(expectData)
  }
}

export function success200 (res, expectData) {
  expect(res.statusCode).toEqual(200)
  expect(res.body).not.toBe(null)
  if (expectData) {
    expect(res.body).toEqual(expectData)
  }
}

export function validate400 (res, expectData) {
  expect(res.statusCode).toEqual(400)
  expect(res.body).not.toBe(null)
}

export function notFound404 (res) {
  expect(res.statusCode).toEqual(404)
}

export function success204 (res) {
  expect(res.statusCode).toEqual(204)
}

export function getToken (user) {
  const payload = {id: user.id, email: user.email}
  return jwt.sign(payload, JWT.key, { expiresIn: '7d' })
}
