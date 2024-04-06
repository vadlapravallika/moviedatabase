// routes/movies.js

const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movieController');

// POST route to create a new movie
router.post('/', movieController.createMovie);

// GET route to retrieve all movies
router.get('/', movieController.getAllMovies);

// GET route to retrieve a specific movie by ID
router.get('/:id', movieController.getMovieById);

// PUT route to update a movie by ID
router.put('/:id', movieController.updateMovie);
// edit movie route
router.edit('/:id',movieController.editMovie);

// DELETE route to delete a movie by ID
router.delete('/:id', movieController.deleteMovie);



module.exports = router;
