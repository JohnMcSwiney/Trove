import React, { useState, useRef, useEffect } from 'react'
import { StickyContainer, Sticky } from 'react-sticky';
import { AudioPlayer } from './components/audioplayer/AudioPlayer';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './containers/header/Header';
import MusicBar from './components/music bar/MusicBar';
import NavBar from './components/nav bar/NavBar';
import 'bootstrap/dist/css/bootstrap.min.css'
import {Home, Search,MyTrove, MyAccount, Login,Signup, Artist, ArtistLogin, UploadMusic, DiscoveryGame} from './pages'

function App() {
  
  return (

    <BrowserRouter>

    <div className=" text-gray-500 font-body">
      
      <Header/>
    <div className='body-wrap'>
      <NavBar/>
      <div className='clone-nav'></div>
      <Routes>
    
        <Route path='/' element={<Home/>}></Route>
        <Route path='/search' element = {<Search/>}></Route>
        <Route path='/mytrove' element = {<MyTrove/>}> </Route>
        <Route path='/uploadmusic' element ={<UploadMusic/>}></Route>
          
       
        <Route path = '/myaccount' element = {<MyAccount/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/signup' element ={<Signup/>}></Route>
        <Route path='/artist' element ={<Artist/>}></Route>
        <Route path='/login-artist' element ={<ArtistLogin/>}></Route>
        <Route path='/discoverygame' element={<DiscoveryGame/>}></Route>
        {/* <Route path='/upload' element= {<UploadMusic/>}></Route> */}

        
      </Routes>
      
        </div>
        <MusicBar/>
     
       
    </div>
   
    </BrowserRouter>
  );
}

export default App;
