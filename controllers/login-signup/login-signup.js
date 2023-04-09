const Admin = require("../../models/admin/admin");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const validator = require("validator");
const bcrypt = require("bcrypt");

const createToken = (id) => {
  return jwt.sign({ _id: id }, process.env.SECRET, { expiresIn: "2h" });
};

// admin login

const adminLogin = async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  try {
    const admin = await Admin.findOne({ email: email });

    if (!admin) {
      return res
        .status(400)
        .json({ error: "This site required authorized to sign in" });
    }
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid email or password" });
    }
    const token = createToken(admin._id);
    const authAdmin = { adminID: admin._id, token, adminName: admin.adminName };
    res.cookie("authAdmin", authAdmin, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      expires: new Date(Date.now() + 7200 * 1000), // Set the cookie to expire in 2h
    });

    res.status(200).json(authAdmin);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const createAdmin = async (req, res) => {
  const { email, password, adminName } = req.body;
  console.log(req.body);

  try {
    if (!email || !password || !adminName) {
      res.status(500).json({ error: "All fields are required" });
    }

    if (!validator.isEmail(email)) {
      res.status(500).json({ error: "Please enter a valid email" });
    }

    const adminFound = await Admin.findOne({ email: email });

    if (adminFound) {
      res.status(500).json({ error: "One of the admin is using this email" });
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const admin = await Admin.create({
      email,
      password: hash,
      adminName,
    });
    // const token = createToken(admin._id);
    // res.cookie("token", token, {
    //   httpOnly: true,
    //   secure: true,
    //   sameSite: "strict",
    //   expires: new Date(Date.now() + 86400 * 1000), // Set the cookie to expire in 1 day
    // });
    const success = `Created admin ${adminName} successfully`;
    res.status(201).json({ admin, success });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const logoutAdmin = (req, res) => {
  res.clearCookie("authAdmin");
  res.status(200).json({ message: "Logged out successfully" });
};

module.exports = {
  adminLogin,
  createAdmin,
  logoutAdmin,
};
