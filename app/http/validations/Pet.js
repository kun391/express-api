'use strict'

/**
 * location: params, query, headers and cookies.
 */
import Joi from 'joi'

module.exports = {
  body: {
    name: Joi.string().required(),
    sex: Joi.string().required(),
    type: Joi.string().required()
  }
}
