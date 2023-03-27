const User = require("../../models/users/user");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");

//get all users
const getAllUser = async (req, res) => {
  try {
    // Get all users
    const users = await User.find({}).sort({ createdAt: -1 });

    // Get the date 30 days ago
    const MonthDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

    // Get all users created after the date 30 days ago
    const newUsers = await User.find({
      createdAt: { $gte: MonthDaysAgo },
    }).sort({ createdAt: -1 });

    // Get the number of users created before the date 30 days ago
    const oldUsersCount = await User.countDocuments({
      createdAt: { $lt: MonthDaysAgo },
    });

    // Calculate the total increase or decrease in users
    const totalDiff =
      oldUsersCount >= 0 ? newUsers.length - oldUsersCount : newUsers.length;

    const percentageChange =
      oldUsersCount > 0
        ? ((totalDiff / oldUsersCount) * 100).toFixed(2)
        : "N/A";

    const changeType = totalDiff >= 0 ? "increase" : "decrease";
    res.status(200).json({ users, totalDiff, percentageChange, changeType });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
//get a user
const getAUser = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ err: "No such user" });
  }
  const user = await User.findById(id)
    .populate({
      path: "likedSongs",
      populate: { path: "artist", select: "artistName" },
    })
    .populate({
      path: "likedArtists",
      select: "artistName",
    });

  if (!user) {
    return res.status(404).json({ err: "No such user" });
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
    return res.status(400).json({ err: "User name already exists" });
  }

  const condition2 = await User.findOne({ email });

  if (condition2) {
    return res.status(400).json({ err: "Email already exists" });
  }
  try {
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
//update a new user ONLY FOR GENERAL, dont know how to use it at all

const updateUser = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ err: "No such user" });
  }

  const user = await User.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!user) {
    return res.status(404).json({ err: "No such user" });
  }
  res.status(200).json(user);
};

// UPDATE USER ACCOUNT TAB
const updateUserAccountTab = async (req, res) => {
  // const userInfo = localStorage.getItem("user");
  // const id = JSON.parse(userInfo).id;
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ err: "No such user" });
  }

  const { displayName, dob } = req.body;
  // , dob

  try {
    const user = await User.findById(id);

    user.displayName = displayName;
    user.dob = dob;

    console.log(user.dob);
    console.log(user.displayName);
    if (!displayName || displayName === null) {
      user.displayName = "My account";
    }
    await user.save();
    res
      .status(200)
      .json({ message: `we just update your account, ${displayName} !` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// UPDATE USER PASSWORD only
const updateUserPassword = async (req, res) => {
  // const userInfo = localStorage.getItem("user");
  // const id = JSON.parse(userInfo).id;

  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ err: "No such user" });
  }

  //const { password, newPassword } = req.body;

  const { password, newPassword } = req.body;

  try {
    const user = await User.findById(id);

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ error: "Password is not correct" });
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
          `,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(err);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
    res.status(200).json({ message: "Password changed successfully" });
  } catch (err) {
    res.status(500).json({ error: "Please try again" });
  }
};

//// UPDATE USER EMAIL only
const updateUserEmail = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ err: "No such user" });
  }

  const { newEmail, password } = req.body;

  try {
    const user = await User.findById(id);

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ err: "Password is not correct" });
    }

    //update user password

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
          `,
    };

    transporter.sendMail(mailOptions, function (err, info) {
      if (err) {
        console.log(err);
      } else {
        console.log("Email sent: " + info.response);
      }
    });

    res.status(200).json({ message: "Email changed successfully" });
  } catch (err) {
    res.status(500).json({ error: "Please try again" });
  }
};

//Delete a user
const deleteUser = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ err: "No such user" });
  }

  const user = await User.findOneAndDelete({ _id: id });

  if (!user) {
    return res.status(404).json({ err: "No such user" });
  }
  res.status(200).json(user);
};

module.exports = {
  getAllUser,
  getAUser,
  createUser,
  updateUser,
  updateUserPassword,
  updateUserEmail,
  updateUserAccountTab,
  deleteUser,
};
