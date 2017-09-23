'use strict'

/**
 * location: params, query, headers and cookies.
 */
import Joi from 'joi'

module.exports = {
  body: {
    email: Joi.string().email().required(),
    password: Joi.string().required()
  }
}
