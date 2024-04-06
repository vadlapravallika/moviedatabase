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

