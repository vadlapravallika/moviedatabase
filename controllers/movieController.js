// controllers/movieController.js

const Movie = require('../models/Movie');
const action = require('../src/index');


// Controller function to create a new movie
exports.createMovie = async (req, res) => {
    const {title, director, year, notes} = req.body
        const newMovie = new Movie('',title, director, year, notes);
        await action.create(newMovie);
        res.json({msg:'/movies'});
};

// Controller function to render movies list view
exports.moviesAll = async function(req, res, next) {
    const movies = await Movie.find({});
    res.render('movies/all', { title: 'All Movies', movies: movies });
};
exports.getMovieById = function(req, res, next) {
    // Find movie by ID
    Movie.findById(req.params.id)
        .then(function(movie) {
            if (!movie) {
                return res.status(404).json({ message: 'Movie not found' });
            }
            res.json(movie);
        })
        .catch(function(err) {
            res.status(500).json({ message: err.message });
        });
};
exports.updateMovie = function(req, res, next) {
    //update movie by ID
    Movie.findByIdAndUpdate(req.params.id, req.body, { new: true }, function(err, updatedMovie) {
        if (err) {
            return res.status(400).json({ message: err.message });
        }
        res.json(updatedMovie);
    });
};



