
const { MongoClient, ObjectId } = require('mongodb');
const Movie = require('../src/Movie');

const url = process.env.MONGODB_URL;

const client = new MongoClient(url);

async function run() {
    await client.connect();
    return 'Connected to the MongoDB server...';
}

run().then(console.log).catch(console.error);

const movieRepo = {
    findAll: async () => {
        let movies = [];
        const moviesColl = client.db('express-movies-mongodb').collection('movies');
        const cursor = moviesColl.find({});
        await cursor.forEach(doc => {
            const movie = new Movie(doc._id.toString(), doc.title, doc.director, doc.year, doc.notes);
            movies.push(movie);
        });
        return movies;
    },
    findById: async (id) => {
        const moviesColl = client.db('express-movies-mongodb').collection('movies');
        const filter = { _id: new ObjectId() };
        const doc = await moviesColl.findOne(filter);
        if (doc) {
            return new Movie(doc._id.toString(), doc.title, doc.director, doc.year, doc.notes);
        } else {
            return null; // Movie not found
        }
    },
    createMovie: async (movie) => {
        const movieData = {
            title: movie.title,
            director: movie.director,
            year: movie.year,
            notes: movie.notes
        };
        const moviesColl = client.db('express-movies-mongodb').collection('movies');
        const result = await moviesColl.insertOne(movieData);
        console.log(`A document was inserted with the _id: ${result.insertedId}`);
    },
    deleteMovieById: async (id) => {
        const moviesColl = client.db('express-movies-mongodb').collection('movies');
        const filter = { _id: new ObjectId(id) };
        const result = await moviesColl.deleteOne(filter);
        if (result.deletedCount === 1) {
            console.log('Successfully deleted one document');
        } else {
            console.log('No documents matched the query. Deleted 0 documents');
        }
    },
    updateMovie: async (id, updates) => {
        const moviesColl = client.db('express-movies-mongodb').collection('movies');
        const filter = { _id: new ObjectId(id) };
        const updateDoc = {
            $set: updates
        };
        const result = await moviesColl.updateOne(filter, updateDoc);
        console.log(`${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`);
    }
};

module.exports = movieRepo;
