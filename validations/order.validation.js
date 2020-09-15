const Joi = require('joi');
const { assign } = require('lodash');

const orderBody = {
  menus: Joi.array().items(Joi.string().required()).required(),
  address: Joi.string().required()
}

const create = assign({}, { body: orderBody });

module.exports = {
  create
}