var express = require('express');
var router = express.Router();


var contentController = require('../controllers/contentController');

router.get('/:yearname/:optionid', contentController.content_list);
router.get('/:yearname/:optionid/:startpage/:endpage', contentController.content_list_pages);
module.exports = router;