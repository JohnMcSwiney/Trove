require("dotenv").config();
const express = require("express");

const { Readable } = require("stream");
const mongodb = require("mongodb");
const multer = require("multer");

const dbConnection = require("../backend/database/db");
const songRoutes = require("./routes/songRoutes");

//to solve cross origin error with different ports
const cors = require("cors");

//create instance of express
const app = express();

app.use(express.json());

//connect to db
dbConnection();

//routes
app.use("/api/songs", songRoutes);

app.use(function (err, req, res, next) {
  console.log(err);
  console.log('This is the invalid field ->', err.field);
  next(err);
});

//app.use("/testsongs", express.static("uploads"))

//listening for requests
app.listen(process.env.PORT, (request, response) => {
  console.log("listening on port", process.env.PORT);
});