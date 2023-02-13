import React, { useState, useRef, useEffect } from 'react'
import logo from './logo.svg';
import { StickyContainer, Sticky } from 'react-sticky';
import { AudioPlayer } from './components/audioplayer/AudioPlayer';

import Header from './containers/header/Header';
import TasteProfile from './components/taste Profile/TasteProfile';
import './App.css';
import YourArtists from './components/your artist/YourArtists';
import LastestRecipe from './components/lastest recipe/LastestRecipe';
import MusicBar from './components/music bar/MusicBar';





function App() {
  
  return (


    <div className="MainBg text-gray-500 font-body" style={{ height: '3000px' }}>
      <Header/>
      {/*Body*/}
      <main className="row-span-1 md:col-span-2 relative">
        <TasteProfile/>
        <YourArtists/>
        <LastestRecipe/>
      </main>
      {/* Player Footer */}
      <footer className="
      bg-gradient-to-b from-transparent to-trv-Black text-white text-center 
      fixed inset-x-0 bottom-0 px-1/4 pb-0
      grid grid-flow-col grid-rows-2 grid-cols-3 gap-y-0.5
      w-full
      phone_sm:w-full
      m-0
      phone_sm:h-32
      phone_lg:h-44
      sm:h-38 md:h-28 lg:h-32
      md:grid-rows-1 items-center
      ">
        <MusicBar/>
      </footer>
      <script src="/index2.js"></script>
    </div>
  );
}

export default App;
