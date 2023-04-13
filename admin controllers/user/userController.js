const User = require("../../models/user model/user-model");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const Playlist = require("../../models/playlist model/playlist-model");
const config = require("../../config")
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
        user: config.GOOGLE_USER ,
        pass: config.GOOGLE_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const mailOptions = {
      from: config.GOOGLE_USER || "dannguyen0826@gmail.com",
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
        user: config.GOOGLE_USER,
        pass: config.GOOGLE_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const mailOptions = {
      from: config.GOOGLE_USER,
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
      // Generate reset code
      const resetCode = Math.floor(100000 + Math.random() * 900000).toString();

      // Save reset code in user's document in the database
      user.resetCode = resetCode;
      await user.save();

      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: config.GOOGLE_USER,
          pass: config.GOOGLE_PASSWORD,
        },
        tls: {
          rejectUnauthorized: false,
        },
      });

      const mailOptions = {
        from: config.GOOGLE_USER || "dannguyen0826@gmail.com",
        to: email,
        subject: "Reset your password",
        html: `
            <p>Hello ${user.displayName},</p>
            <p>No need to worry, you can reset your Trove Music password by entering the following reset code on the reset password page: </p>
            <p><strong>${resetCode}</strong></p>
            <p>If you didn't request a password reset, feel free to ignore this email and carry on enjoying your music!</p>
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

      res.status(201).json({
        message:
          "We've sent you an email with a reset code. Please check your email and enter the code on the reset password page.",
      });
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const verifyResetCode = async (req, res) => {
  const { email, resetCode } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user) {
      // Check if reset code matches
      if (user.resetCode === resetCode) {
        // Reset code matches, allow user to update password
        // You can implement your password update logic here
        // ...
        
        // Reset the resetCode in user's document to null after successful password update
        user.resetCode = null;
        await user.save();

        res.status(200).json({ message: "Reset code verified successfully. You can now update your password." });
      } else {
        // Reset code does not match
        res.status(401).json({ error: "Reset code does not match" });
      }
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateNewPassword = async(req, res)=> {
    const {email, password} =req.body;

    const user = await User.findOne({email: email});
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    //update user password
    user.password = hash;
    await user.save();
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: config.GOOGLE_USER,
        pass: config.GOOGLE_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const mailOptions = {
      from: config.GOOGLE_USER,
      to: email,
      subject: "Changed password successfully",
      html: `
          <p>Hello ${user.displayName},</p>
          <p>Changed password successfully</p>
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

    res.status(201).json({
      message:
        "Changed password Successfully",
    });
}


module.exports = {
  getAllUser,
  getAUser,
  updateUserPassword,
  updateUserEmail,
  updateUserAccountTab,
  resetUserPassword,
  verifyResetCode,
  updateNewPassword
};
