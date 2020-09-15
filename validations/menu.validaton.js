const Joi = require('joi');
const { assign } = require('lodash');

const menuBody = {
  name: Joi.string().trim().required(),
  description: Joi.string().trim().required(),
  price: Joi.number().required()
};

const create = assign({}, { body: menuBody });

module.exports = {
  create
};