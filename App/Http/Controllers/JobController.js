'use strict'

import BaseController from './BaseController'

class JobController extends BaseController {
  constructor (request, response) {
    super(request, response)
  }

  startJob () {
    console.log(this.request.post())
    console.log(this.request.collect(['ahaha']))
    this.response.json({data: true})
  }

  restartJob () {
    this.response.json({data: true})
  }
}

module.exports = JobController
