var express = require('express');
var router = express.Router();

var genre_controller = require('../controllers/genreController');

router.get('/', genre_controller.genre_list);
router.post('/',genre_controller.genre_create);
router.get('/:id',genre_controller.genre_detail);
router.delete('/:id',genre_controller.genre_delete);
router.put('/:id',genre_controller.genre_put);




module.exports=router;