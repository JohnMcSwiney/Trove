import React, { useState, useRef, useEffect } from 'react'
import { StickyContainer, Sticky } from 'react-sticky';
import { AudioPlayer } from './components/audioplayer/AudioPlayer';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './containers/header/Header';
import MusicBar from './components/music bar/MusicBar';
import NavBar from './components/nav bar/NavBar';

import {Home, Search,MyTrove, MyAccount} from './pages'




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
      </Routes>
      

      
        <MusicBar/>
        <NavBar/>
      
      <script src="/index2.js"></script>
    </div>

    </BrowserRouter>
  );
}

export default App;
