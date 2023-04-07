require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoute = require("./routes/user/user-route");
const artistRoute = require("./routes/artist/artist-route");
const albumRoute = require("./routes/album/album-route");
const songRoute = require("./routes/song-route/song-route");
const curatedPlaylistRoute = require("./routes/curatedPlaylist/curatedPlaylist-route");
const epRoute = require("./routes/ep-route/ep-route");
const adminRoute = require("./routes/admin login/admin-login");
const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "PUT", "PATCH", "POST", "DELETE"],
  })
);

mongoose.set("strictQuery", true);

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

app.use("/api/admins", adminRoute);
app.use("/api/users", userRoute);
app.use("/api/albums", albumRoute);
app.use("/api/songs", songRoute);
app.use("/api/curated", curatedPlaylistRoute);
app.use("/api/artists", artistRoute);
app.use("/api/eps", epRoute);

app.listen(process.env.PORT, "0.0.0.0", () => {
  console.log(`Listening to port`, process.env.PORT);
});
