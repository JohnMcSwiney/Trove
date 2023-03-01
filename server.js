const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");
const session = require("express-session");
const MongoStore = require("connect-mongo");
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

app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.DB_URL }),
    cookie: { maxAge: 1000 * 60 * 60 * 24 }, // Set the cookie expiration time
  })
);

app.get("/api/session", (req, res) => {
  res.json({ artist: req.session.artist });
});

const loginArtist = require("./routes/login-route/login-route");
app.use("/api/artist", loginArtist);

app.listen(process.env.PORT, () => {
  console.log("Listenting to " + process.env.PORT);
});
