const User  = require('../models/user model/user-model')
const jwt = require('jsonwebtoken')
const stytch = require('stytch')
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
    res.json(response);
}

// const authMiddleWare = (req, res, next)=> {
//     const sessionToken=req.headers.sessiontoken
//     client.sessions.authenticate({session_token: sessionToken})
//     .then(()=> {
//         next()
//     }).catch(err){
//         res.status(401).json({err:err.message})
//     }
// }

const loginAuth = async (req,res)=>{
    try{
        const token = req.body.token;
        const sessionToken= await client.magicLinks.authenticate(token, {session_duration_minutes: 120});
     
        res.json(sessionToken)
    }catch(err){
        res.json(err)
    }

}
module.exports={
    loginUser,
    loginAuth
}