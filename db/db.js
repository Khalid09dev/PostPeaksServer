const { MongoClient, ServerApiVersion } = require('mongodb');
const mongoose = require('mongoose');
require('dotenv').config();

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@postpeaks.yzmql.mongodb.net/PostPeaksDB?retryWrites=true&w=majority&appName=PostPeaks`;


const client = new MongoClient(uri, {
    serverApi: ServerApiVersion.v1,
})

async function connectDB() {
    try {
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to mongoDB');
    } catch (error) {
        console.log("Failed to connect to mongoDB", error);
        process.exit(1); // Exit the application in case of failure
    }
}

module.exports = { client, connectDB };