'use strict'

import BaseController from './BaseController'
import Base from '../../Models/Base'
import User from '../../Models/User'

class JobController extends BaseController {
  constructor (request, response) {
    super(request, response)
  }

  startJob () {
    const sss = (User.model())
    console.log(sss)
    this.response.json({data: true})
  }

  restartJob () {
    this.response.json({data: true})
  }
}

module.exports = JobController
