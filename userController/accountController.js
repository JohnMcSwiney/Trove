const User = require("../models/user model/user-model");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const Cookie = require("js-cookie");
const crypto = require("crypto");
const maskEmailsPhones = require("mask-email-phone");
require("dotenv").config();
const config = require('../config');

const handleErrors = (err) => {
  console.log(err.message, err.code);
};

// hashing email

const createToken = (_id) => {
  return jwt.sign({ _id: _id }, config.SECRET, { expiresIn: "1d" });
};

//login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const verify = await User.findOne({ email: email });

    if (!verify) {
      return res.status(400).json({ error: "You haven't signed up" });
    }

    const user = await User.login(email, password);
    //create a token
    const token = createToken(user._id);

    const listener = {
      email,
      token,
      id: user._id,
      displayName: user.displayName,
      useImg: user.imageURL,
      dob: user.dob,
      likedSongs: user.likedSongs,
      likedArtists: user.likedArtists,
    };
    // Mask the email before sending it in the response
    listener.email = maskEmailsPhones(listener.email);
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      expires: new Date(Date.now() + 86400 * 1000), // Set the cookie to expire in 1 day
    });

    res.cookie("user", listener, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      expires: new Date(Date.now() + 86400 * 1000), // Set the cookie to expire in 1 day
    });

    res.status(200).json(listener);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//sign up user

const signupUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.signup(email, password);

    //create a token
    const token = createToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      expires: new Date(Date.now() + 86400 * 1000), // Set the cookie to expire in 1 day
    });

    const listener = {
      email,
      token,
      id: user._id,
      displayName: user.displayName,
      useImg: user.imageURL,
      dob: user.dob,
      likedSongs: user.likedSongs,
      likedArtists: user.likedArtists,
    };

    res.cookie("user", listener, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      expires: new Date(Date.now() + 86400 * 1000), // Set the cookie to expire in 1 day
    });

    listener.email = maskEmailsPhones(listener.email);
    //provide its provider
    user.provider = "TroveMusic";
    console.log(user.provider);
    user.save();
    //send email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: config.GOOGLE_USER ,
        pass: config.GOOGLE_PASSWORD,
      },
    });

    const mailOptions = {
      from: config.AUTH_EMAIL_ACCOUNT,
      to: email,
      subject: "Welcome to TroveMusic!",
      html: `
            <p>Hi ${email},</p>
            <p>Thank you for signing up for My Awesome App!</p>
            <p>We're thrilled to have you join our community.</p>
           <p>The Trove Music Team</p>
            
          `,
    };

  
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        handleErrors(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });

    res.status(200).json({
      email,
      token,
      id: user._id,
      displayName: user.displayName,
      useImg: user.imageURL,
      dob: user.dob,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const logoutUser = (req, res) => {
  res.clearCookie("token");
  res.clearCookie("user");
  res.status(200).json({ message: "Logged out successfully" });
};

module.exports = {
  loginUser,
  signupUser,
  logoutUser,
};
