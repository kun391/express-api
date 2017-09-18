'use strict'

import { Request } from '../TestCase'
import * as Helper from '../TestHelpers'

describe('Flow API', () => {
  it('hello test', () => {
    return Request.get('/start')
    .then((res) => {
      Helper.success201(res, {data: true})
    })
  })
})
