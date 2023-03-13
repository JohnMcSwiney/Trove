const express = require("express");
const router = express.Router();
const passport = require("passport");
const FacebookStrategy = require("passport-facebook").Strategy;
const User = require("../../models/user model/user-model");

const app = express();
const cors = require("cors");
app.use(
  cors({
    origin: "*",
  })
);
const session = require("express-session");
app.use(
  session({
    secret: process.env.secret,
    resave: false,
    saveUninitialized: false,
  })
);
const crypto = require("crypto");

function generateRandomPassword() {
  return (
    crypto.randomBytes(5).toString("hex") +
    crypto.randomBytes(5).toString("hex")
  );
}
require("dotenv").config();

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: "http://localhost:8080/auth/facebook/callback",
      profileFields: ["id", "emails", "displayName", "photos"],
    },
    async function (accessToken, refreshToken, profile, cb) {
      const user = await User.findOne({
        email: profile.emails[0].value,
        provider: "facebook",
      });

      if (!user) {
        console.log("Adding new facebook account to DB..");
        const password = generateRandomPassword();
        const newUser = new User({
          email: profile.emails[0].value,
          password: password,
          provider: profile.provider,
          providerId: profile.id,
          displayName: profile.displayName,
          imageURL: profile.photos ? profile.photos[0].value : null,
          isVerified: true,
        });
        console.log(newUser);
        await newUser.save();
        newUser.login(newUser.email, newUser.password);
        return cb(null, profile);
      } else {
        console.log("Facebook account already exists in the database...");
        return cb(null, profile);
      }
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

app.use(passport.initialize());
app.use(passport.session());

router.get("/", passport.authenticate("facebook", { scope: ["email"] }));

router.get(
  "/callback",
  passport.authenticate("facebook", {
    failureRedirect: "/login",
    successRedirect: "/auth/facebook/success",
  })
);

router.get("/success", (req, res) => {
  if (req.session.passport && req.session.passport.user) {
    // Get user info from session
    const userInfo = {
      id: req.session.passport.user.id,
      displayName: req.session.passport.user.displayName,
      provider: req.session.passport.user.provider,
    };
    // Redirect to home page
    res.redirect("http://localhost:3000");
  } else {
    // Handle error here
    res.redirect("/error");
  }
});

router.get("/error", (req, res) =>
  res.status(400).send("Error logging in via Facebook..")
);

router.get("/signout", (req, res) => {
  try {
    req.session.destroy(function (err) {
      console.log("session destroyed.");
    });
    res.render("auth");
  } catch (err) {
    res.status(400).send({ message: "Failed to sign out fb user" });
  }
});

module.exports = router;
