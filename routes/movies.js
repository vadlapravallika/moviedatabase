var express = require('express');
var router = express.Router();
const movieController = require('../controllers/movieController');
const { body } = require('express-validator');

/* GET movies listing. */
router.get('/list', movieController.movies_list);

/* GET movies add */
router.get('/add', movieController.movies_create_get);

router.post('/add',
  body('title').trim().notEmpty().withMessage('NO empty title!'),
  body('director').trim().notEmpty().withMessage('NO empty Director!'),
  body('year').trim().notEmpty().withMessage('Year cannot be empty!').isInt().withMessage('Year must be a valid!'),
  body('notes').optional({ nullable: true }).trim(),
  movieController.movies_create_post);

/* GET a movies*/
router.get('/:id', movieController.movies_detail);

/* GET movies delete */
router.get('/:id/delete', movieController.movies_delete_get);

/* POST moviesdelete */
router.post('/:id/delete', movieController.movies_delete_post);

/* GET movies edit */
router.get('/:id/edit', movieController.movies_edit_get);

/* POST movies add */
router.post('/:id/edit', movieController.movies_edit_post);

module.exports = router;