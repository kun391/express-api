'use strict'

/**
 * location: params, query, headers and cookies.
 */
import Joi from 'joi'

module.exports = {
  body: {
    email: Joi.string().email().required(),
    full_name: Joi.string().required().min(3),
    password: Joi.string().required().min(6).max(10)
  }
}
