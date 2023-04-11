const mongoose = require("mongoose");
const EP = require("../../models/ep model/ep-model");

const getAllEP = async (req, res) => {
  const eps = await EP.find({}).sort({ createdAt: -1 });
  res.status(200).json(eps);
};

const getEP = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ err: "No such ep" });
  }

  const ep = await EP.findById(id)
    .populate({
      path: "artist",
      select: "-password -email -dob; -gender", // Exclude password and email fields
    })
    .populate({
      path: "songList",
      populate: {
        path: "artist",
        select: "-password -email -dob; -gender",
      },
    })

    .populate({
      path: "songList",
      populate: {
        path: "featuredArtists",
        select: "-password -email -dob; -gender",
      },
    })
    .sort({ createdAt: -1 });

  if (!ep) {
    return res.status(400).json({ err: "No such ep" });
  }

  await EP.findOneAndUpdate({ _id: ep._id }, { $inc: { searchCount: 1 } });

  res.status(200).json(ep);
};

const getArtistEP = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "ep is not available" });
  }

  const eps = await EP.find({ artist: id })
    .populate({
      path: "artist",
      select: "-password -email -dob; -gender", // Exclude password and email fields
    })
    .populate({
      path: "songList",
      populate: {
        path: "artist",
        select: "-password -email -dob; -gender",
      },
    })

    .populate({
      path: "songList",
      populate: {
        path: "featuredArtists",
        select: "-password -email -dob; -gender",
      },
    })
    .sort({ createdAt: -1 });
  if (!eps) {
    return res.status(404).json({ error: "You don't have any song" });
  }
  res.status(200).json(eps);
};

module.exports = {
  getAllEP,
  getEP,
  getArtistEP,
};
