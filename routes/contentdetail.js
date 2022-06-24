var express = require('express');
var router = express.Router();


var contentDetailController = require('../controllers/contentDetailController');


router.get('/:yearname/:optionid/:filename', contentDetailController.content_detail);
module.exports = router;