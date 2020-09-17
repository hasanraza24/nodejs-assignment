var express = require('express');
var router = express.Router();
var orderCtlr = require('../controllers/order.controller');
var validate = require('express-validation');
var orderValidation = require('../validations/order.validation');

router.post('/create', validate(orderValidation.create), orderCtlr.create)

router.get('/report', orderCtlr.getOrderReport)

module.exports = router

