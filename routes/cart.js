var express = require('express');
var router = express.Router();
var cartCtlr = require('../controllers/cart.controller');
var validate = require('express-validation');
var cartValidation = require('../validations/cart.validation');

router.post('/add', validate(cartValidation.addMenuItems), cartCtlr.addMenuItems);

router.post('/remove/:menuId', cartCtlr.removeMenuItem)

router.get('/get', cartCtlr.getMyCart)

module.exports = router