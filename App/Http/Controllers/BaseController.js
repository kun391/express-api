'use strict'

import Request from '../../Lib/Request'

class BaseController {
  constructor (request, response) {
    this.request = new Request(request)
    this.response = response
  }

  throwError (statusCode, message = '') {
    console.log('throw')
  }
}

module.exports = BaseController
