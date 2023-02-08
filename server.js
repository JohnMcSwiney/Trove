require("dotenv").config();
const express = require("express");
const dbConnection = require("./database/db");
const songRoutes = require("./routes/songRoutes");
const albumRoutes = require("./routes/albumRoutes");


//to solve cross origin error with different ports
const cors = require("cors");

//create instance of express
const app = express();

app.use(express.json());

//connect to db
dbConnection();

//routes
app.use("/api/songs", songRoutes);

app.use("/api/albums", albumRoutes);


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