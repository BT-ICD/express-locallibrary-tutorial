var express = require('express');
var router = express.Router();

var yearlist_controller = require('../controllers/yearListController');

//router.get('/',employee_controller.employee_list);
router.get('/',yearlist_controller.year_list);
module.exports = router;

