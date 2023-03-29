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

const updateUser = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ err: "No such user" });
  }

  const { displayName, avatar, dob, email, password } = req.body;
  console.log(password)
  try {
    const user = await User.findById(id);
    user.displayName = displayName;
    user.dob = dob;
    user.imageURL = avatar;
    user.email = email;

    const isMatch = await bcrypt.compare(password, user.password);
    console.log(user.password, "is match" , isMatch)
    let salt;
    let hash;
    if (!isMatch) {
      salt = await bcrypt.genSalt(10);
      hash = await bcrypt.hash(password, salt);
    }

    user.password = hash;
    await user.save();
    const success = "Updated User successfully";
    res.status(200).json({ success });
  } catch (error) {
    res.status(500).json({ error: error.message });
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
  deleteUser,
};
