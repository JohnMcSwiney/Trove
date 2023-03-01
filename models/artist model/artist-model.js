const mongoose = require("mongoose");

const artistSchema = mongoose.Schema({
  artistName: {
    type: String,
    maxLength: 50,
    require: [true, `Please provide your name or nickname`],
  },

  email: {
    type: String,
    required: [true, `Please provide email`],
    unique: true,
  },

  password: {
    type: String,
  },

  isArtist: {
    type: Boolean,
    default: false,
  },
  artistFollowers: {
    type: Number,
  },
  albumList: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Artist",
      default: null,
    },
  ],
  albumArtURL: {
    type: String,
  },

  songList: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Song",
      default: null,
    },
  ],
  isPublished: {
    type: Boolean,
  },
  publishDate: {
    type: Date,
  },

  dob: {
    type: Date,
  },

  gender: {
    type: String,
  },
});

//static methods

artistSchema.statics.signup = async function (
  email,
  confirmEmail,
  password,
  confirmPassword,
  artistName,
  dob,
  gender
) {
  if (!email || !password) {
    throw Error("All fields must be filled");
  }

  if (!validator.isEmail(email)) {
    throw Error("Email is not valid");
  }

  const emailCheck = await this.findOne({ email });
  if (emailCheck) {
    throw Error("Email already in use");
  }
  if (password !== confirmPassword) {
    throw Error("Password or confirm password is not correct");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  const artist = await this.create({
    email,
    password: hash,
    artistName,
    dob,
    gender,
  });
};

module.exports = mongoose.model("Artist", artistSchema);

//static methods for login

artistSchema.statics.login = async function (email, password) {
  if (!password || email) {
    throw Error("Please fill both to login");
  }

  const artist = await this.findOne({ email });

  if (!artist) {
    throw Error("Incorrect email or password");
  }

  const match = await bcrypt.compare(password, artist.password);

  if (!match) {
    throw Error("Incorrect email or password");
  }

  return artist;
};
