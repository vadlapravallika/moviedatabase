// src/movieRepository.js

const connect = require('./db');

const repo = {
    findAll: async () => {
        try {
            const moviesColl = await connect();
            return await moviesColl.find({}).toArray();
        } catch (error) {
            console.error('Error finding movies:', error);
            throw error;
        }
    },
    findById: async (id) => {
        try {
            const moviesColl = await connect();
            return await moviesColl.findOne({ _id: id });
        } catch (error) {
            console.error('Error finding movie by ID:', error);
            throw error;
        }
    },
    create: async (movie) => {
        try {
            const moviesColl = await connect();
            return await moviesColl.insertOne(movie);
        } catch (error) {
            console.error('Error creating movie:', error);
            throw error;
        }
    },
    delete: async (id) => {
        try {
            const moviesColl = await connect();
            return await moviesColl.deleteOne({ _id: id });
        } catch (error) {
            console.error('Error deleting movie:', error);
            throw error;
        }
    },
    update: async (id, updates) => {
        try {
            const moviesColl = await connect();
            return await moviesColl.updateOne({ _id: id }, { $set: updates });
        } catch (error) {
            console.error('Error updating movie:', error);
            throw error;
        }
    }
};

module.exports = repo;
