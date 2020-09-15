var express = require('express');
var router = express.Router();
var menuCtlr = require('../controllers/menu.controller');
var validate = require('express-validation');
var menuValidation = require('../validations/menu.validaton');

router.post('/create', validate(menuValidation.create), menuCtlr.createMenu);

router.get('/list', menuCtlr.list);

module.exports = router;