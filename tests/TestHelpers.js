'use strict'

export function success201(res, expectData) {
  expect(res.statusCode).toEqual(201)
  expect(res.body).not.toBe(null)
  if (expectData) {
  	expect(res.body).toEqual(expectData)
  }
}

export function success200(res, expectData) {
  expect(res.statusCode).toEqual(200)
  expect(res.body).not.toBe(null)
  if (expectData) {
  	expect(res.body).toEqual(expectData)
  }
}

export function validate400(res, expectData) {
  expect(res.statusCode).toEqual(400)
  expect(res.body).not.toBe(null)
}

export function notFound404(res) {
  expect(res.statusCode).toEqual(404)
}

export function success204(res) {
  expect(res.statusCode).toEqual(204)
}
