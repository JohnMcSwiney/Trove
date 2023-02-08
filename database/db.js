const mongoose = require("mongoose");
const mongodb = require("mongodb");
const MongoClient = require("mongodb").MongoClient;

//setup music database

module.exports = async (request, response) => {

    const connectionParams = {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }

    mongoose.connect(process.env.MONGO_URI, connectionParams);

    const connect = mongoose.connection;

    connect.on('error', (error) => {
        console.error(`Error connecting to MongoDB: ${error}`);
      });
      
      connect.once('open', () => {
          console.log("MongoDB connection established successfully");
          console.log("connect.readyState: ", connect.readyState);
      });
}