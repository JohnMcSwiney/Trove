require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");

const userRouter = require("./admin routes/user-route/user-route");
const albumRouter = require("./admin routes/album-route/album-route");
const artistRouter = require("./admin routes/artist-route/artist-route");
// const curatedPlaylistRouter = require("./admin routes/curatedPlaylist-route/curatedPlaylist-route");

// const tastepRouter = require("./admin routes/tastep-route/tastep-route");
const playlistRouter = require("./admin routes/playlist-route/playlist-route");
const songRouter = require("./admin routes/song-route/song-route");
const discoveryGameRouter = require("./admin routes/discoveryGame-route/discoveryGame-route");

//For User login
const userlogin = require("./user routes/user-login-route/user");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const app = express();

app.use(cookieParser());
const cors = require("cors");
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "PUT", "PATCH", "POST", "DELETE"],
  })
);

app.use(
  session({
    secret: process.env.secret,
    resave: true,
    saveUninitialized: false,
  })
);
mongoose.set("strictQuery", true);
mongoose
  .connect(process.env.DB_URL, { useNewUrlParser: true })
  .then(() => {
    console.log("Database connected");
  })
  .catch((error) => {
    console.error("Database connect failed, error: ", error);
  });
//middle ware
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

//facebook login

const facebookLogin = require("./user routes/facebook-route/facebook-auth");
app.use("/auth/facebook", facebookLogin);

//deployment tasks

const path = require("path");
app.use(express.static(path.join(__dirname, "build")));

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(9000);

//FOR USER
app.use("/api/user", userlogin);

//For searching bar
const searchRoute = require("./admin routes/search-route/search-route");
app.use("/api/search/", searchRoute);

//FOR globals
//user
app.use("/api/users", userRouter);

// album
app.use("/api/albums", albumRouter);

//artist
app.use("/api/artists", artistRouter);

//curated playlists
// app.use("/api/curated", curatedPlaylistRouter);

// //playlist
app.use("/api/playlists", playlistRouter);

//eps
const epRouter = require("./admin routes/ep-route/ep-route");
app.use("/api/eps/", epRouter);
//song
app.use("/api/songs", songRouter);

app.use("/api/DG", discoveryGameRouter);

app.listen(process.env.PORT, "0.0.0.0", () => {
  console.log(`Listening to port ` + process.env.PORT);
});
