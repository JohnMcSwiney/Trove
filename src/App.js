import React, { useState, useRef, useEffect } from 'react'
import { StickyContainer, Sticky } from 'react-sticky';
import { AudioPlayer } from './components/audioplayer/AudioPlayer';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './containers/header/Header';
import MusicBar from './components/music bar/MusicBar';
import NavBar from './components/nav bar/NavBar';

import {Home, Search,MyTrove, MyAccount, Login,Signup} from './pages'







function App() {
  
  return (

    <BrowserRouter>

    <div className="MainBg text-gray-500 font-body" style={{ height: '3000px' }}>
      <Header/>

      <Routes>
    
        <Route path='/' element={<Home/>}></Route>
        <Route path='/search' element = {<Search/>}></Route>
        <Route path='/mytrove' element = {<MyTrove/>}></Route>
        <Route path = '/myaccount' element = {<MyAccount/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/signup' element ={<Signup/>}></Route>
        {/* <Route path='/artist' element ={<Artist/>}></Route> */}
        {/* <Route path='/upload' element= {<UploadMusic/>}></Route> */}

        
      </Routes>
      

      
        <MusicBar/>
        {/* send in a value of 0 - 3 to change the tab, send in any other value for no active tabs*/}
        <NavBar activeTab={0} />
      
      <script src="/index2.js"></script>
    </div>

    </BrowserRouter>
  );
}

export default App;
