const mongoose = require('mongoose');
const MyTrove = require('../../models/myTrove model/myTrove-model');

//every one has only 1 myTrove profile and they will edit it instead of showing all of their taste profile
const getMyTrove = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ mess: `You have not created a MyTrove Profile` })
    }

    const myTrove = await MyTrove.findById(id);

    if (!myTrove) {
        return res.status(400).json({ mess: `You have not created a MyTrove Profile` })
    }

    res.status(200).json(myTrove);
}

const updateMyTrove = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ mess: `You have not created a MyTrove Profile` })
    }

    const myTrove = await MyTrove.findByIdAndUpdate({ _id: id }, {
        ...req.body
    })

    if (!myTrove) {
        return res.status(400).json({ mess: `You have not created a MyTrove Profile` })
    }

    res.status(200).json(myTrove);
}

const createMyTrove = async (req, res) => {

    const { myTroveOwner, likedSongs, dislikedSongs, likedGenres } = req.body;

    const myTrove = new MyTrove({ myTroveOwner, likedSongs, dislikedSongs, likedGenres });
    try {
        await myTrove.save();
        res.status(201).json(myTrove);
    } catch (err) {
        res.status(500).json({ mess: err.mess });
    }
}

const deleteMyTrove = async (req, res) => {
    const { id } = req.body;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ mess: `No such MyTrove Profile` })
    }

    const myTrove = await MyTrove.findOneAndDelete({ _id: id });

    if (!myTrove) {
        return res.status(400).json({ mess: `No such MyTrove Profile` })
    }
    res.status(200).json(myTrove);
}


module.exports = {
    getMyTrove,
    updateMyTrove,
    createMyTrove,
    deleteMyTrove
}
