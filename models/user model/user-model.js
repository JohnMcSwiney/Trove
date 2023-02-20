const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator')

const userSchema = new mongoose.Schema({
    email:{
        type: String,
        required:true,
        unique:true
    }, 
    password:{
        type:String,
        required:true
    },

    imageURL: {
        type: String,
        
    },
    
    favouriteSongs: [
        {
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Song'
        }
    ],

    displayedName:{
        type:String,
        default:'My Account'
    },

    isAdmin:{
        type:Boolean,
        default:false
    },
    
    playlist : [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'playlist'
        }
    ],

    isVerified: {
        type: Boolean,
        default:false
    }

}, {timestamps:true})

//static sign up method

userSchema.statics.signup = async function (email ,password) {

    // validation

    if(!email || !password){
        throw Error ('All fields must be filled')
    }

    if(!validator.isEmail(email)){
        throw Error('Email is not valid')
    }

    // if(!validator.isStrongPassword(password)){
    //     throw Error('Password is not strong enough');
    //

    const condition2 = await this.findOne({ email });

    if(condition2){
        throw Error('Email already in use');
    }

    //mypassword into dakjda542
    // salt to make password to be different from the same password
    const salt = await bcrypt.genSalt(10);

    const hash = await bcrypt.hash(password,salt);

    const user = await this.create({ email, password: hash })
    
    return user;

}

//static login method

userSchema.statics.login = async function (email, password) {
    if( !password || !email){
        throw Error ('All fields must be filled')
    }

    const user = await this.findOne({ email });

    if(!user){
        throw Error('Incorrect email');
    }

    const match = await bcrypt.compare(password, user.password);

    if(!match){
        throw Error ('Incorrect password')
    }

    return user;
}



module.exports = mongoose.model("User",userSchema );