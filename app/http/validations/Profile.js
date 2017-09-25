'use strict'

/**
 * location: params, query, headers and cookies.
 */
import Joi from 'joi'

module.exports = {
  body: {
    address: Joi.string(),
    phone: Joi.number().min(6),
    building_id: Joi.number().required(),
    unit_number: Joi.number().required(),
    unit_size: Joi.number().required(),
    unit_bedroom: Joi.number().required(),
    unit_bathroom: Joi.number().required()
  }
}
