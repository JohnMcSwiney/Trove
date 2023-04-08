const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");

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

const loginArtist = require("./routes/login-route/login-route");

app.use("/api/artist", loginArtist);

const artistRoute = require("./routes/artist-route/artist-route");
app.use("/api/artists", artistRoute);
const songRoutes = require("./routes/song-route/song-route");
app.use("/api/songs", songRoutes);
const albumRoutes = require("./routes/album-route/album-route");
app.use("/api/albums", albumRoutes);
const epRoutes = require("./routes/ep-route/ep-route");
app.use("/api/eps", epRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Listening to port ` + process.env.PORT);
});
