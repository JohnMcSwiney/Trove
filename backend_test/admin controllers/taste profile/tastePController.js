const mongoose = require('mongoose');
const TasteProfile = require('../../models/tasteprofile model/tastep-model');

//every one has only 1 taste profile and they will edit it instead of showing all of their taste profile
const getTaste = async (req,res)=> {
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({mess: `You have not created a Taste Profile`})
    }

    const taste = await TasteProfile.findById(id);

    if(!taste){
        return res.status(400).json({mess: `You have not created a Taste Profile`})
    }

    res.status(200).json(taste);
}

const updateTaste = async (req,res)=>{
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({mess: `You have not created a Taste Profile`})
    }

    const taste = await TasteProfile.findByIdAndUpdate({_id: id}, {
        ...req.body
    })

    if(!taste){
        return res.status(400).json({mess: `You have not created a Taste Profile`})
    }

    res.status(200).json(taste);
}

const createTaste= async (req,res)=> {

        const {profileOwner,likedSongs,dislikedSongs,likedGenres} = req.body;

        const taste = new TasteProfile ({profileOwner,likedSongs,dislikedSongs,likedGenres});
        try{
            await taste.save();
            res.status(201).json(taste);
        }catch(err){
            res.status(500).json({mess:err.mess});
        }
}

const deleteTaste = async (req,res)=>{
        const {id} = req.body;
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({mess: `No such Taste Profile`})
        }

        const taste = await TasteProfile.findOneAndDelete({_id: id});

        if(!taste){
            return res.status(400).json({mess: `No such Taste Profile`})
        }
        res.status(200).json(taste);
}


module.exports = {
    getTaste,
    updateTaste,
    createTaste,
    deleteTaste
}
