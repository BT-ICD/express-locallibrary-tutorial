var express = require('express');
var router = express.Router();

var employee_controller = require('../controllers/employeeController');

router.get('/',employee_controller.employee_list);
router.post('/',employee_controller.employee_create);
router.get('/:id', employee_controller.employee_detail);
router.delete('/:id', employee_controller.employee_delete);
router.put('/:id', employee_controller.employee_put);
//router.delete('/:id',genre_controller.genre_delete);
module.exports= router;