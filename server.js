const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const app = express();

app.use(cors());
mongoose.set("strictQuery", true);
mongoose
  .connect(process.env.DB_URL, { useNewUrlParser: true })
  .then(() => {
    console.log("Database connected");
  })
  .catch((error) => {
    console.log("Database connect failer error: ".error);
  });

app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
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

const artistRoute = require("./routes/artist-route/artist-route");
app.use("/api/artists", artistRoute);
const songRoutes = require("./routes/song-route/song-route");
app.use("/api/songs", songRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Listening to port ` + process.env.PORT);
});
