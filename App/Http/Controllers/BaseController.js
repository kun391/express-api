'use strict'

import Request from '../../lib/Request'

class BaseController {
  constructor (request, response) {
    this.request = new Request(request)
    this.response = response
    if (request.user && request.user instanceof Object) {
      this.currentUser = request.user
    }
  }

  throwError (statusCode, message = '') {
    this.response.status(404).json({data: 'User not found'})
  }
}

module.exports = BaseController
