'use strict'

export function success201 (res, expectData) {
  expect(res.statusCode).toEqual(200)
  expect(res.body).not.toBe(null)
  expect(res.body).toEqual(expectData)
}
