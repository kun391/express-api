'use strict'

// import Route from '../lib/Route'
import {Router} from 'express'
let route = Router()
/**
 * Middlewares
 */
import Validate from 'express-validation'
import passport from './middlewares/Authentication'
/**
 * Validate rules
 */
import Rules from './validations'

/**
 * Controllers
 */
import AuthController from './controllers/AuthController'
import UserController from './controllers/UserController'

/**
  Router.group('Group name',[Array Middlewares], Router)

  Ex:

  import JobController from './Controllers/JobController'

  Router.group([(req, res, next) => { next() }, (req, res, next) => { next() }], (router) => {
    router.get('/start', (req, res, next) => {
      next()
    }, (req, res) => new JobController(req, res).startJob())
    router.get('/restart', (req, res, next) => {
      next()
    }, (req, res) => new JobController(req, res).restartJob())
  })
 */
/*
Route.group([(req, res, next) => { next() }], [
  {
    method: 'post',
    route: '/auth/facebook',
    path: (req, res) => new AuthController(req, res).signUp(),
    middlewares: [passport.authenticate('facebook-token', { session: false })]
  }
])

*/
route.post('/auth/signup', Validate(Rules.SignUp), (req, res) => new AuthController(req, res).signUp())
route.post('/auth/signin', Validate(Rules.SignIn), (req, res) => new AuthController(req, res).signIn())
route.get('/users/:userId', passport.authenticate('jwt', { session: false }), (req, res) => new UserController(req, res).show())
route.put('/users/:userId', passport.authenticate('jwt', { session: false }), Validate(Rules.Verify), (req, res) => new UserController(req, res).verify())
route.post('/auth/facebook', passport.authenticate('facebook-token', { session: false }), (req, res) => new AuthController(req, res).signUpFacebook())
// Route.group([(req, res, next) => { next() }], (route) => {
//   route.post('/auth/signup', Validate(Rules.SignUp), (req, res) => new AuthController(req, res).signUp())
//   route.post('/auth/signin', Validate(Rules.SignIn), (req, res) => new AuthController(req, res).signIn())
// })

// Route.group([], (route) => {
//   route.get('/users/:userId', (req, res) => new UserController(req, res).show())
//   // route.use(passport.authenticate('jwt', { session: false }))
// })

// Route.group([], (route) => {
//   route.post('/auth/facebook', passport.authenticate('facebook-token', { session: false }), (req, res) => new AuthController(req, res).signUpFacebook())
// })

module.exports = route
