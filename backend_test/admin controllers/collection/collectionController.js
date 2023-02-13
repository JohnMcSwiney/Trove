const mongoose = require('mongoose');
const Collection =  require('../../models/collection model/collection-model')

const getAllCollection = async (req,res)=>{
    const collections = await Collection.find({}).sort({createdAt:-1});
    res.status(200).json(collections);
}

const getCollection = async(req,res)=>{
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({mess:'No such collection'})
    }

    const collection  = await Collection.findById(id);

    if(!collection){
        return res.status(400).json({mess:'No such collection'})
    }

    res.status(200).json(collection);

}

const createCollection = async (req,res)=> {
    const {collectionName,collectionImg,collectionDescription,songlist} = req.body;

    const collection  = new Collection(req.body);

    try{
        await collection.save();
        res.status(201).json(collection);
    }catch(err){
        res.status(400).json({mess: err.mess});
    }
}

const updateCollection = async(req,res) => {
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({mess:'No such collection'})
    }

    const collection = await Collection.findByIdAndUpdate({_id: id},{
        ...req.body
    })

    if(!collection){
        return res.status(400).json({mess:'No such collection'})
    }
    res.status(200).json(collection);
}

const deleteCollection = async(req,res)=> {
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({mess:'No such collection'})
    }

    const collection  = await Collection.findOneAndDelete({_id: id});
    if(!collection){
        return res.status(400).json({mess:'No such collection'})
    }
    res.status(200).json(collection);

}

module.exports = {
    getAllCollection,
    getCollection,
    createCollection,
    updateCollection,
    deleteCollection
}