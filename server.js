require('dotenv').config()
const express = require('express');
const stytch = require('stytch')
const cors = require('cors')
//For admin
const userRouter = require('./admin routes/user-route/user-route');
const albumRouter = require('./admin routes//album-route/album-route');
const artistRouter = require('./admin routes//artist-route/artist-route');
const collectionRouter = require('./admin routes//collection-route/collection-route');
const tastepRouter = require('./admin routes//tastep-route/tastep-route');
const playlistRouter = require('./admin routes//playlist-route/playlist-route');
const songRouter = require('./admin routes//song-route/song-route');

//For User
const userlogin = require('./user routes/user-login-route/user');




const app = express();
app.use(cors());
const mongoose = require('mongoose')
mongoose.set('strictQuery', true);
mongoose.connect(process.env.DB_URL, {useNewUrlParser: true})
    .then(()=>{
        console.log('Database connected')
    })
    .catch(error=>{
        console.error('Database connect failed, error: ', error)
    })
//middle ware
app.use(express.json());
app.use((req,res,next) =>{
    console.log(req.path, req.method);
    next();
})


//FOR USER
app.use('/api/user', userlogin)

// app.use('api/user/album')



//FOR ADMIN
//user
app.use('/api/users', userRouter);

// album
app.use('/api/albums',albumRouter);

//artist
app.use('/api/artists',artistRouter);

//collection
app.use('/api/collections',collectionRouter);

//taste profile
app.use('/api/tasteps',tastepRouter);

// //playlist
app.use('api/playlists',playlistRouter);

//song
app.use('/api/songs', songRouter);



app.listen(process.env.PORT, '0.0.0.0', ()=> {
    console.log(`Listening to port `+process.env.PORT )
})