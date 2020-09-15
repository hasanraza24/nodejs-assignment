var express = require('express');
var router = express.Router();
var menuCtlr = require('../controllers/menu.controller');
var validate = require('express-validation');
var menuValidation = require('../validations/menu.validaton');
var multer = require('multer')
var createError = require('http-errors');


var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let path = `uploads/`;
    cb(null, path);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    let extArr = file.originalname.split('.')
    const ext = extArr[extArr.length - 1]
    cb(null, file.fieldname + '-' + uniqueSuffix + '.' + ext)
  }
})

var fileFilter = (req, file, cb) => {
  console.log('file', file)
  if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png' || file.mimetype == 'image/jpg') {
      console.log('file is image')
      cb(null, true);
  } else {
      const err = new Error('Not valid image file')
      cb(err);
  }
}

function fileuploadMiddle() {
  return function(req, res, next) {
    let upload = multer({ storage, fileFilter }).single('image');
    upload(req, res, function(err) {
         if (err) {
           const error = createError(400, err.message)
            next(error)
        } else {
          next()
        } 
    })
  }
}


router.post('/create',
fileuploadMiddle(),
 validate(menuValidation.create),
 menuCtlr.createMenu);

router.get('/list', menuCtlr.list);

module.exports = router;