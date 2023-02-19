const User  = require('../models/user model/user-model')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')
require('dotenv').config();
const createToken = (_id)=> {
    return jwt.sign({_id: _id},process.env.SECRET, {expiresIn: "3d"})
}


//login user
const loginUser = async (req,res) =>{
    const {email, password} = req.body;

    try{
        const verify = await User.findOne({email: email})
        if(!verify.isVerified){
            return res.status(400).json({err:'Account is not verified'})
        }
            
        const user = await User.login(email, password)
        //create a token
        const token = createToken(user._id);

        res.status(200).json({email, token, id:user._id});
    
    }catch(err){
        res.status(400).json({err:err.message});
    }
}

//sign up user

const signupUser = async(req,res)=>{

    const {email, password,isAdmin,displayedName} = req.body;

    try{ 
        const user = await User.signup(email, password);

        //create a token
        const token = createToken(user._id);

        //send email
        const transporter = nodemailer.createTransport({
            service:"gmail",
            auth :{
                user:process.env.GOOGLE_USER,
                pass:process.env.GOOGLE_PASSWORD
            }
        });

        const mailOptions = {
            from:process.env.AUTH_EMAIL_ACCOUNT,
            to:email,
            subject: "Welcome to TroveMusic!",
            html:`
            <p>Hi ${email},</p>
            <p>Thank you for signing up for My Awesome App!</p>
            <p>We're thrilled to have you join our community.</p>
            <p>Please click the following link to verify your email address:</p>
            <a href="${process.env.APP_URL}/verify-email/${user._id}">${process.env.APP_URL}/verify-email/${user._id}</a>
          `
        };

        transporter.sendMail(mailOptions,function(error, info){
            if(error){
                console.log(error);
            }else{
                console.log('Email sent: ' + info.response);
            }
        })

        res.status(200).json({email,id: user._id, token, message: "You have successfully sign up !"});
    }catch(err){
        res.status(400).json({err:err.message});
    }
}

const verifyUser = async (req,res)=> {
    const {id} =req.params;
    try{
        const user  = await User.findOne({_id: id})
        if(!user){
            return res.status(404).json('User not found');
        }
        user.isVerified = true;
        await user.save();
        return res.render('verify-success');
    } catch (err) {
      console.error(err);
      return res.status(500).send('Internal Server Error');
    }
}
module.exports={
    loginUser,
    signupUser,
    verifyUser
}