const Joi = require('joi');
const { assign } = require('lodash');

const menuBody = {
  title: Joi.string().trim().required(),
  description: Joi.string().trim(),
  tags: Joi.array().items(Joi.string().trim())
};

const create = assign({}, { body: menuBody });

module.exports = {
  create
};