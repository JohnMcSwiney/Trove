const jwt = require('jsonwebtoken')
const User = require('../../models/user model/user-model')
const requireAuth =  async(req,res,next) => {

    //verify authentification
    const {authorization}= req.headers;

    if(!authorization){
            res.status(401).json({error:'Authorization token required'});
    }
    // example of a token 'Bearer asdjkadhajka.dajhdjahdkjah.adhakjsdkhajdha'
    const token = authorization.split(' ')[1];

    //verify that token
    try{
        const {_id} = jwt.verify(token, process.env.SECRET);
        req.user = await User.findOne({_id}).select('_id');
        next();
    }catch(err){
        console.log(err);
        res.status(401).json({err:'Request is not authorized'});
    }
}

module.exports = requireAuth