'use strict'

import passport from 'passport'
import passportJWT from 'passport-jwt'
import FacebookTokenStrategy from 'passport-facebook-token'
import User from '../../models/User'
import {JWT, AUTH} from '../../../config/app'

const ExtractJwt = passportJWT.ExtractJwt
const JwtStrategy = passportJWT.Strategy

const jwtOptions = {}

jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
jwtOptions.secretOrKey = JWT.key


const fbStrategy = new FacebookTokenStrategy({
  clientID: AUTH.FB.CLIENT_ID,
  clientSecret: AUTH.FB.CLIENT_SECRET,
},
  function (accessToken, refreshToken, profile, done) {
  	console.log(accessToken)
  	console.log(refreshToken)
  	console.log(profile)
  	// const user = User.model().findById(payload.id)
    if (profile) {
      done(null, profile)
    } else {
      done(null, false)
    }
   //  User.findOrCreate({ facebookId: profile.id }, function (err, user) {
   //    return cb(err, user)
   //  })
  }
)
// console.log(fbStrategy);
// stragtegy facebook
passport.use(fbStrategy)

// stragtegy jwt
passport.use(new JwtStrategy(jwtOptions, function (payload, next) {
  // usually this would be a database call:
  const user = User.model().findById(payload.id)
  if (user) {
    next(null, user)
  } else {
    next(null, false)
  }
}))

module.exports = passport
