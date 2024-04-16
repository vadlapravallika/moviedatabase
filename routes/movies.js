var express = require('express');
var router = express.Router();
const movieController = require('../controllers/movieController');
const { body } = require('express-validator');

/* GET todos listing. */
router.get('/', movieController.movies_list);

/* GET todos add */
router.get('/add', movieController.movies_create_get);

router.post('/add',
  body('title').trim().notEmpty().withMessage('NO empty title!'),
  body('director').trim().notEmpty().withMessage('NO empty Director!'),
  body('year').trim().notEmpty().withMessage('Year cannot be empty!').isInt().withMessage('Year must be a valid!'),
  body('notes').optional({ nullable: true }).trim(), 
  movieController.movies_create_post);

/* GET a todo */
router.get('/:uuid', movieController.movies_detail);

/* GET todos delete */
router.get('/:uuid/delete', movieController.movies_delete_get);

/* POST todos delete */
router.post('/:uuid/delete', movieController.movies_delete_post);

/* GET todos edit */
router.get('/:uuid/edit', movieController.movies_edit_get);

/* POST todos add */
router.post('/:uuid/edit', movieController.movies_edit_post);

module.exports = router;