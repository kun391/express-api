'use strict'

import BaseController from './BaseController'

class JobController extends BaseController {
  constructor () {
    super()
  }

  startJob (request, response) {
    console.log(this)
    response.json({data: true})
  }

  restartJob (request, response) {
    response.json({data: true})
  }
}

module.exports = new JobController()
