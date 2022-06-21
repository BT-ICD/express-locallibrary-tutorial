var express = require('express');
var router = express.Router();

var menuOptionList_Controller = require('../controllers/menuOptionListController');

router.get('/', menuOptionList_Controller.menu_list);
module.exports=router;