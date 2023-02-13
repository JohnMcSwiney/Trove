const User  = require('../models/user model/user-model')
const jwt = require('jsonwebtoken')

const createToken = (_id)=> {
    return jwt.sign({_id: _id},process.env.SECRET, {expiresIn: "3d"})
}


//login user
const loginUser = async (req,res) =>{
    const {userName, password} = req.body;

    try{
        const user = await User.login(userName, password);
        //create a token
        const token = createToken(user._id);

        res.status(200).json({userName, token});

    }catch(err){
        res.status(400).json({err:err.message});
    }
}

//sign up user

const signupUser = async(req,res)=>{

    const {email,userName, password,isAdmin,displayedName} = req.body;

    try{ 
        const user = await User.signup(email,userName, password);

        //create a token
        const token = createToken(user._id);

        res.status(200).json({email,userName, token});
    }catch(err){
        res.status(400).json({err:err.message});
    }
}
module.exports={
    loginUser,
    signupUser
}