const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  director: { type: String, required: true },
  year: { type: Number, required: true },
  notes: { type: String, default: '' },
  created_at: { type: Date, default: Date.now },
  modified_at: { type: Date, default: Date.now }
});

const Movie = mongoose.model('movie', movieSchema);

module.exports = Movie;
