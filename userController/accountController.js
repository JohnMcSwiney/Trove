const User  = require('../models/user model/user-model')
const jwt = require('jsonwebtoken')
const stytch = require('stytch')
const express = require('express')
require('dotenv').config()
// const createToken = (_id)=> {
//     return jwt.sign({_id: _id},process.env.SECRET, {expiresIn: "1h"})
// }

const client =  new stytch.Client({
    project_id: process.env.STYTCH_PROJECT_ID,
    secret:process.env.STYTCH_SECRET,
    env: stytch.envs.test
    //diploy will be live
})
//login user
const loginUser = async (req, res) => {
    const email = req.body.email;
    const params = {
      email,
      login_magic_link_url: "http://localhost:3000/auth",
      signup_magic_link_url: "http://localhost:3000/auth",
    };
  
    const response = await client.magicLinks.email.loginOrCreate(params);

    let user = await User.findOne({email: response.email});
    console.log(user);
    
    if(!user){
         const newUser = new User({
            email,
            displayName: response.name,
            imageURL: response.image_url
        });
        await newUser.save();
    }else{
        const img = user.imageURL ? await client.files.get(user.imageURL):null;

    res.json({
        email:user.email,
        displayName:user.displayName,
        isArtist: user.isArtist,
        img: img
    })
    }
    res.json(response);
}
const loginAuth = async (req,res)=>{
    try{
        const token = req.body.token;
        const sessionToken= await client.magicLinks.authenticate(token, {session_duration_minutes: 60});
        console.log(sessionToken)
    }catch(err){
        res.json(err)
    }

}

const logoutUser = async (req, res) => {
    try {
      // Clear session token
      const sessionToken = req.headers.sessiontoken;
      await client.sessions.delete({ session_token: sessionToken });
  
      // Clear cookies
      res.clearCookie('sessiontoken');
  
      res.status(200).send('Logged out successfully.');
    } catch (err) {
      res.status(500).send(err);
    }
  };
module.exports={
    loginUser,
    loginAuth,
    logoutUser
}