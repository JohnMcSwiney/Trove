const express = require("express");
require("dotenv").config();

const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

mongoose.set("strictQuery", true);
mongoose
  .connect(process.env.DB_URL, { useNewUrlParser: true })
  .then(() => {
    console.log("Database connected");
  })
  .catch((error) => {
    console.log("Database connect failer error: ".error);
  });
app.listen(process.env.PORT, () => {
  console.log("Listenting to " + process.env.PORT);
});
