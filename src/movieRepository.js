// src/movieRepository.js
const { MongoClient, ObjectId } = require('mongodb');
const Movie = require('../models/Movie');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
dotenv.config();
const url = process.env.MONGODB_URI;

mongoose.connect(url)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

// Function to create a new movie (using Mongoose)
async function createMovie(movie) {
  const newMovie = new Movie(movie); // Create a new Movie document
  return await newMovie.save(); // Save the new movie to the database and return it
}

// Function to retrieve all movies (using Mongoose)
async function findAllMovies() {
  await Movie.find().then(data => {
    console.log(data);
    return data;
  }); // Find all movies and return them
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
