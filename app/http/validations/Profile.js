'use strict'

/**
 * location: params, query, headers and cookies.
 */
import Joi from 'joi'

module.exports = {
  body: {
    email: Joi.string().email().required(),
    full_name: Joi.string().required().min(3),
    password: Joi.string().required().min(1).max(10),
    address: Joi.string(),
    phone: Joi.number().min(6),
    building_id: Joi.number().required(),
    unit_number: Joi.number().required(),
    unit_size: Joi.string().required(),
    unit_bedroom: Joi.number().required(),
    unit_bathroom: Joi.number().required()
  }
}
