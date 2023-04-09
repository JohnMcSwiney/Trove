const User = require("../../models/user model/user-model");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const { request } = require("express");
const Playlist = require("../../models/playlist model/playlist-model");
//get all users
const getAllUser = async (req, res) => {
  const users = await User.find({}).sort({ createdAt: -1 });
  res.status(200).json(users);
};
//get a user
const getAUser = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such user" });
  }
  const user = await User.findById(id)
    .populate({
      path: "likedSongs",
      populate: { path: "artist", selecte: "artistName" },
    })
    .populate({
      path: "likedArtists",
      select: "artistName",
    });

  if (!user) {
    return res.status(404).json({ error: "No such user" });
  } else {
    res.status(200).json(user);
  }
};

//create a new user
const createUser = async (req, res) => {
  const {
    email,
    password,
    displayedName,
    isAdmin,
    imageURL,
    favourites,
    isVerified,
    dob,
  } = req.body;
  const user = new User(req.body);
  const condition1 = await User.findOne({ email });

  if (condition1) {
    return res.status(400).json({ error: "User name already exists" });
  }

  const condition2 = await User.findOne({ email });

  if (condition2) {
    return res.status(400).json({ error: "Email already exists" });
  }
  try {
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE USER ACCOUNT TAB
const updateUserAccountTab = async (req, res) => {
  const { id } = req.params;
  const success = "Update successfully";

  const { displayName, dob, imageURL } = req.body;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "No such user" });
    }
    const user = await User.findById(id);

    user.displayName = displayName;
    user.dob = dob;

    if (imageURL) {
      user.imageURL = imageURL;
    }

    console.log(user.dob);
    console.log(user.displayName);
    console.log(user.imageURL);
    if (!displayName || displayName === null) {
      user.displayName = "My account";
    }

    await user.save();

    res.status(200).json({ success });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// UPDATE USER PASSWORD only
const updateUserPassword = async (req, res) => {
  const { id } = req.params;

  const { password, newPassword, confirmNewPassword } = req.body;
  const success = "Updated password successfully";
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "No such user" });
    }
    const user = await User.findById(id);

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ error: "Password is not correct" });
    }

    if (newPassword.length < 8) {
      return res
        .status(400)
        .json({ error: "Passwords should be a minimum of 8 characters " });
    }

    const isConfirm = newPassword === confirmNewPassword;
    console.log(isConfirm);
    if (!isConfirm) {
      return res
        .status(400)
        .json({ error: "Confirm password and password do not match" });
    }

    if (password === newPassword) {
      return res.status(400).json({
        error: "Can not set the new password as the current password",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(newPassword, salt);

    //update user password

    user.password = hash;
    await user.save();
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GOOGLE_USER,
        pass: process.env.GOOGLE_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const mailOptions = {
      from: process.env.GOOGLE_USER,
      to: user.email,
      subject: "Change Password Successfully With TroveMusic",
      html: `
            <p>Hi ${user.email},</p>
            <p>Your action of changing password is successfully, let us know if you did not attempt to change password</p>
            <p>The Trove Music Team</p>
          `,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
    res.status(200).json({ success });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//// UPDATE USER EMAIL only
const updateUserEmail = async (req, res) => {
  const { id } = req.params;
  const success = "Updated email successfully";

  const { currentEmail, newEmail, cPassword } = req.body;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "No such user" });
    }
    const user = await User.findById(id);

    const isMatch = await bcrypt.compare(cPassword, user.password);

    if (!isMatch) {
      return res.status(400).json({ error: "Password is not correct" });
    }

    const emailMatch = user.email === currentEmail;
    if (!emailMatch) {
      return res.status(400).json({ error: "Current email is not correct" });
    }

    const sameEmail = currentEmail === newEmail;
    if (sameEmail) {
      return res
        .status(400)
        .json({ error: "Current email and new email are the same" });
    }

    user.email = newEmail;
    await user.save();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GOOGLE_USER,
        pass: process.env.GOOGLE_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const mailOptions = {
      from: process.env.GOOGLE_USER,
      to: newEmail,
      subject: "Change Email Successfully With TroveMusic",
      html: `
            <p>Hi ${newEmail},</p>
            <p>Your action of changing Email is successfully, let us know if you need help</p>
            <p>The Trove Music Team</p>
          `,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });

    res.status(200).json({ success });
  } catch (error) {
    res.status(500).json({ error: "Please try again" });
  }
};

// forget password

const resetUserPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user) {
      const token = jwt.sign(
        { _id: user._id, timestamp: Date.now() },
        process.env.SECRET,
        { expiresIn: "1h" }
      );

      const resetLink = `${req.protocol}://${req.get(
        "host"
      )}/reset-password/${token}`;
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.GOOGLE_USER,
          pass: process.env.GOOGLE_PASSWORD,
        },
        tls: {
          rejectUnauthorized: false,
        },
      });

      const mailOptions = {
        from: process.env.GOOGLE_USER,
        to: email,
        subject: "Reset your password",
        html: `
            <p>Hello ${user.displayName},</p>
            <p>No need to worry, you can reset your Trove Music password by clicking the link below: </p>
            <a href="${resetLink}">Reset password</a>
            <p>If you didn't request a password reset, feel free to delete this email and carry on enjoying your music!</p>
            <p>Hope you are doing great</p>	
            <p>The Trove Music Team</p>
          `,
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });
    }

    res.status(201).json({
      message:
        "We've sent you an email. Just follow the instructions to reset your password.",
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getAllUser,
  getAUser,
  updateUserPassword,
  updateUserEmail,
  updateUserAccountTab,
  resetUserPassword,
};
