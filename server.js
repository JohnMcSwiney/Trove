require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoute = require("./routes/user/user-route");
const artistRoute = require("./routes/artist/artist-route");
const albumRoute = require("./routes/album/album-route");
const songRoute = require("./routes/song-route/song-route");
const collectionRoute = require("./routes/collection/collection");
const epRoute = require("./routes/ep-route/ep-route");
const adminRoute = require("./routes/admin login/admin-login");
const app = express();
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
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

// const checkAuth = (req, res, next) => {
//   const token = req.cookies.token;
//   console.log(token);
//   if (!token) {
//     return res.redirect("/login"); // make it to frontend login for admin
//   }
//   jwt.verify(token, process.env.SECRET, (err, decoded) => {
//     if (err) {
//       res.clearCookie("token");
//       return res.redirect("/login"); // make it to frontend login for admin
//     }
//     req.admin = decoded;
//     next();
//   });
// };

// app.use(cookieParser);
// app.use(checkAuth);
app.use("/api/admins", adminRoute);
app.use("/api/users", userRoute);
app.use("/api/albums", albumRoute);
app.use("/api/songs", songRoute);
app.use("/api/collections", collectionRoute);
app.use("/api/artists", artistRoute);
app.use("/api/eps", epRoute);

app.listen(process.env.PORT, "0.0.0.0", () => {
  console.log(`Listening to port`, process.env.PORT);
});
