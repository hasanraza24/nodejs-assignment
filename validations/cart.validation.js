const Joi = require('joi');
const { assign } = require('lodash');

const cartBody = {
  menuIds: Joi.array().items(Joi.string().required()).required()
}

const addMenuItems = assign({}, { body: cartBody });

module.exports = {
  addMenuItems
}