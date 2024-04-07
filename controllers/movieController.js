const Movie = require('../models/Movie'); // Import the Movie model

// Controller methods for movie routes
exports.createMovie = async (req, res, next) => {
    try {
        // Create a new movie using data from the request body
        const newMovie = await Movie.create(req.body);
        res.status(201).json(newMovie);
    } catch (error) {
        next(error); // Pass the error to the error handling middleware
    }
};

exports.moviesAll = async (req, res, next) => {
    try {
        // Retrieve all movies from the database
        const movies = await Movie.find();
        res.status(200).json(movies);
    } catch (error) {
        next(error); // Pass the error to the error handling middleware
    }
};

exports.getMovieById = async (req, res, next) => {
    try {
        // Retrieve a specific movie by ID from the database
        const movie = await Movie.findById(req.params.id);
        if (!movie) {
            return res.status(404).json({ message: 'Movie not found' });
        }
        res.status(200).json(movie);
    } catch (error) {
        next(error); // Pass the error to the error handling middleware
    }
};

exports.updateMovie = async (req, res, next) => {
    try {
        // Update a movie by ID with data from the request body
        const updatedMovie = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedMovie) {
            return res.status(404).json({ message: 'Movie not found' });
        }
        res.status(200).json(updatedMovie);
    } catch (error) {
        next(error); // Pass the error to the error handling middleware
    }
};

exports.deleteMovie = async (req, res, next) => {
    try {
        // Delete a movie by ID from the database
        const deletedMovie = await Movie.findByIdAndDelete(req.params.id);
        if (!deletedMovie) {
            return res.status(404).json({ message: 'Movie not found' });
        }
        res.status(200).json({ message: 'Movie deleted successfully' });
    } catch (error) {
        next(error); // Pass the error to the error handling middleware
    }
};
