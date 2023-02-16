import React from 'react'

import TasteProfile from '../components/taste Profile/TasteProfile';
import CardArtist from '../components/card_artist/CardArtist';
import CardAlbum from '../components/card_album/CardAlbum';
import MusicBar from '../components/music bar/MusicBar';
import NavBar from '../components/nav bar/NavBar';
import Header from '../containers/header/Header';

import './home.css';


const Home = () => {
  
  return (
    <div>
      <Header headerTxt={["Trove", "Music"]} 
              displayBack={1}
              displayHamburger={1}
              displayTitle={1}/>
        <main className="row-span-1 md:col-span-2 relative">
        <TasteProfile/>
        

          <h4 className="mainHeadertxt txt-white pad-t-10 mar-l-5">Artists you love:</h4>
          <div className='cardartist1 grid grid-flow-col overflow-scroll pad-t-5'>
          <CardArtist/>      
          </div>

          <h4 className="mainHeadertxt txt-white pad-t-10 mar-l-5">Albums to listen to:</h4> 
          <div  className='grid grid-flow-col overflow-scroll pad-l-5'>
          <CardAlbum />
          </div>
          
      </main>

      <MusicBar />
        {/* send in a value of 0 - 3 to change the tab, send in any other value for no active tabs*/}
      <NavBar activeTab={0} />

    </div>
  )
}

export default Home