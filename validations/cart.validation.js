const Joi = require('joi');
const { assign } = require('lodash');

const cartBody = {
  menus: Joi.array().items(Joi.string().required()).required()
}

const addMenuItems = assign({}, { body: cartBody });

module.exports = {
  addMenuItems
}