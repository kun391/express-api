import Router from '../Lib/Router'

import JobController from './Controllers/JobController'

Router.group([(req, res, next) => { next() }, (req, res, next) => { next() }], (router) => {
  router.get('/start', (req, res, next) => {
    next()
  }, JobController.startJob)
  router.get('/restart', (req, res, next) => {
    next()
  }, JobController.restartJob)
})

Router.group([(req, res, next) => { next() }, (req, res, next) => { next() }], (router) => {
  router.get('/stop', (req, res, next) => {
    next()
  }, (req, res, next) => {
    res.send({data: 'hihi1'})
  })
  router.get('/shutdown', (req, res, next) => {
    next()
  }, (req, res, next) => {
    res.send({data: 'hihi2'})
  })
})

module.exports = Router
