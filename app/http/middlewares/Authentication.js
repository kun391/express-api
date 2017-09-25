'use strict'

import passport from 'passport'
import passportJWT from 'passport-jwt'
import User from '../../models/User'
import {JWT, AUTH} from '../../../config/app'
import RAC from 'diacritics'
import _ from 'lodash'
import FacebookTokenStrategy from 'passport-facebook-token'

const ExtractJwt = passportJWT.ExtractJwt
const JwtStrategy = passportJWT.Strategy

const jwtOptions = {}

jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
jwtOptions.secretOrKey = JWT.key

// stragtegy facebook
passport.use(new FacebookTokenStrategy({
  clientID: AUTH.FB.CLIENT_ID,
  clientSecret: AUTH.FB.CLIENT_SECRET,
},
  (accessToken, refreshToken, profile, done) => {
    const profileInfo = {
      full_name: RAC.remove(profile.displayName.toString('UTF-8')),
      first_name: RAC.remove(profile._json.first_name.toString('UTF-8')),
      last_name: RAC.remove(profile._json.last_name.toString('UTF-8'))
    }
    const user = User.model().findOrCreate({ where: {
      facebook_id: profile.id,
    }, defaults: profileInfo })
    .spread((user, created) => {
      const userAttribute = user.get({ plain: true })
      const compareUser = {
        full_name: userAttribute.full_name,
        first_name: userAttribute.first_name,
        last_name: userAttribute.last_name
      }
      if (!_.isEqual(compareUser, profileInfo)) {
        user.update(profileInfo, {fields: ['full_name', 'first_name', 'last_name']})
      }
      done(null, user)
    })
  }
))

// stragtegy jwt
passport.use(new JwtStrategy(jwtOptions, async (payload, next) => {
  // usually this would be a database call:
  const user = await User.model().findById(payload.id)
  if (user) {
    next(null, user)
  } else {
    next(null, false)
  }
}))

module.exports = passport
