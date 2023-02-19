const User = require('../../models/user model/user-model');
const mongoose = require('mongoose')
//get all users
const getAllUser = async(req, res)=>{
     const users=await User.find({}).sort({createdAt:-1});
     res.status(200).json(users)
}
//get a user
const getAUser = async (req,res)=>{
 const {id} = req.params
 if(!mongoose.Types.ObjectId.isValid(id)){
  return res.status(404).json({err:'No such user'})
 }
 const user  = await User.findById(id);

 if(!user){
  return res.status(404).json({err: "No such user"});
 }else{
  res.status(200).json(user)
 }


}

//create a new user
const createUser = async (req, res) => {
    const {email, password, displayedName,isAdmin,imageURL, favourites, isVerified} = req.body;
    const user = new User(req.body);
    const condition1 = await User.findOne({ email });

    if(condition1){
       return res.status(400).json({err:'User name already exists'})
    }

    const condition2 = await User.findOne({ email });

    if(condition2){
      return res.status(400).json({err:'Email already exists'})
    }
    try {
      await user.save()
      res.status(201).json(user)
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  }
//update a new user

const updateUser  = async (req,res)=>{
  const {id} = req.params;
  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({err:'No such user'})
  }

  const user  = await User.findOneAndUpdate({_id: id},{
    ...req.body 
  })

  if(!user){
    return res.status(404).json({err:'No such user'})
  }
  res.status(200).json(user);
}
//Delete a user
const deleteUser =async (req, res) => {
  const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
      return res.status(404).json({err:'No such user'})
    }

    const user  = await User.findOneAndDelete({_id: id})

    if(!user){
      return res.status(404).json({err:'No such user'})
    }
    res.status(200).json(user);
  }

  module.exports = {
    getAllUser,
    getAUser,
    createUser,
    updateUser,
    deleteUser
  }