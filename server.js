require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");

//For admin
const userRouter = require("./admin routes/user-route/user-route");
const albumRouter = require("./admin routes/album-route/album-route");
const artistRouter = require("./admin routes/artist-route/artist-route");
const collectionRouter = require("./admin routes/collection-route/collection-route");
const myTroveRouter = require("./admin routes/myTrove-route/myTrove-route");

// const tastepRouter = require("./admin routes/tastep-route/tastep-route");
const playlistRouter = require("./admin routes/playlist-route/playlist-route");
const songRouter = require("./admin routes/song-route/song-route");
//For User
const userlogin = require("./user routes/user-login-route/user");
const session = require("express-session");

const app = express();
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
    resave: false,
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

//FOR USER
app.use("/api/user", userlogin);

//FOR globals
//user
app.use("/api/users", userRouter);

// album
app.use("/api/albums", albumRouter);

//artist
app.use("/api/artists", artistRouter);

//collection
app.use("/api/collections", collectionRouter);

//taste profile
app.use("/api/mytrove", myTroveRouter);

// //playlist
app.use("/api/playlists", playlistRouter);

//song
app.use("/api/songs", songRouter);

app.listen(process.env.PORT, "0.0.0.0", () => {
  console.log(`Listening to port ` + process.env.PORT);
});
