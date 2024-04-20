const { validationResult } = require('express-validator');
const movieRepo = require('../src/movieRepository');
const Movie = require('../src/Movie'); // Assuming Movie model is correctly defined
const { ObjectId } = require('mongodb');

/* GET movies listing */
exports.movies_list = async function(req, res, next) {
    const data = await movieRepo.findAll();
    res.render('/list', { title: 'Movie List', movies: data } );
};

/* GET add movie form */
exports.movies_create_get = function(req, res, next) {
    res.render('add', { title: 'Add a Movie'} );
};
  
/* POST add movie */
exports.movies_create_post = async function(req, res, next) {
    const result = validationResult(req);
    if (!result.isEmpty()) {
        res.render('add', { title: 'Add a Movie', msg: result.array() });
    } else {
        const newMovie = new Movie({
            id: '', 
            title: req.body.title,
            director: req.body.director,
            year: req.body.year,
            notes: req.body.notes,
            // Add other movie properties as needed
        });
        await movieRepo.createMovie(newMovie);
        res.redirect('/movies');
    }
};
  
/* GET a movie */
exports.movies_detail = async function(req, res, next) {
    const movie = await movieRepo.findById(req.params.id);
    if (movie) {
        res.render('movies', { title: 'Movie Detail', movie: movie });
    } else {
        res.redirect('/movies');
    }
};
  
/* GET delete movie confirmation */
exports.movies_delete_get = async function(req, res, next) {
    const movie = await movieRepo.findById(req.params.id);
    res.render('delete', { title: 'Delete Movie', movie: movie });
};
  
/* POST delete movie */
exports.movies_delete_post = async function(req, res, next) {
    await movieRepo.deleteMovieById(req.params.uuid);
    res.redirect('/movies/');
};
  
/* GET edit movie form */
exports.movies_edit_get = async function(req, res, next) {
    try {
        const movie = await movieRepo.findById(req.params.id);
        res.render('edit', { title: 'Edit Movie', movie: movie });
    } catch (err) {
        // Handle errors appropriately
        next(err);
    }
};

/* POST edit movie */
exports.movies_edit_post = async function(req, res, next) {
    try {
        const updatedMovie = {
            title: req.body.title,
            director: req.body.director,
            year: req.body.year,
            notes: req.body.notes,
            // Add other movie properties as needed
        };

        await movieRepo.updateMovie(req.params.id, updatedMovie);
        res.redirect('/movies');
    } catch (err) {
        // Error handling
        const movie = await movieRepo.findById(req.params.id);
        res.render('edit', { title: 'Edit Movie', msg: 'An error occurred. Please try again.', movie: movie });
    }
};