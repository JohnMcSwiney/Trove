const mongoose  = require('mongoose');

const Genre = require('../../models/genre model/genre-model');

const getAllGenre = async (req,res)=> {
    const genres = await Genre.find({}).sort();
    res.status(200).json(genres);
}

const createGenre = async (req,res)=> {
    const {genre} = req.body;

    const newGenre =new Genre (req.body);
    
    try{
        await newGenre.save();
        res.status(201).json(newGenre);
    }catch(err){
        res.status(500).json({mess:err.mess});
    }
}

const updateGenre = async (req,res)=> {
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({err:'No such genre'})
    }

    const genre = Genre.findOneAndUpdate({_id: id},{
        ...req.body
    });

    if(!genre){
        return res.status(404).json({err:'No such genre'})
    }
    res.status(200).json(genre);
}

const deteleGenre = async (req,res)=> {
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({err:'No such genre'})
    }

    const genre = Genre.findOneAndDelete({_id: id});

    if(!genre){
        return res.status(404).json({err:'No such genre'})
    }
    res.status(200).json(genre);
}

module.exports = {
    getAllGenre,
    updateGenre,
    createGenre,
    deteleGenre
}