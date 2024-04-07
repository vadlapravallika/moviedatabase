// src/movieRepository.js
const { MongoClient, ObjectId } = require('mongodb');
const url = process.env.MONGODB_URI;
const client = new MongoClient(url);

const mongoose = require('mongoose');

// Define the Movie schema
const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  director: { type: String, required: true },
  year: { type: Number, required: true },
  notes: { type: String },
});

// Create the Movie model
const Movie = mongoose.model('movie', movieSchema);

// Function to create a new movie (using Mongoose)
async function createMovie(movie) {
  const newMovie = new Movie(movie); // Create a new Movie document
  return await newMovie.save(); // Save the new movie to the database and return it
}

// Function to retrieve all movies (using Mongoose)
async function findAllMovies() {
  return await Movie.find({}); // Find all movies and return them
}

// Function to find a movie by ID (using Mongoose)
async function findById(id) {
  return await Movie.findById(id); // Find movie by ID and return it
}

// Function to update a movie by ID (using Mongoose)
async function updateMovie(id, updates) {
  return await Movie.findByIdAndUpdate(id, updates, { new: true }); // Update movie by ID and return the updated document
}

// Function to delete a movie by ID (using Mongoose)
async function deleteMovie(id) {
  return await Movie.findByIdAndDelete(id); // Delete movie by ID and return the deleted document (or null if not found)
}

module.exports = {
  createMovie,
  findAllMovies,
  findById,
  updateMovie,
  deleteMovie,
};
