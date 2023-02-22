import React from 'react'

import TasteProfile from '../components/taste Profile/TasteProfile';
import CardArtist from '../components/card_artist/CardArtist';
import CardAlbum from '../components/card_album/CardAlbum'




const Home = () => {
  
  return (
    <div className='container'>
        <main className="home-main row-span-1 md:col-span-2 relative home-height">
        <TasteProfile/>
        

          <h4 className="mainHeadertxt">Artists you love:</h4>
          <div className='cardartist1 grid grid-flow-col overflow-scroll '>
          <CardArtist/>      
          </div>

          <h4>Suggesting Albums</h4>
          <div className='grid grid-flow-col overflow-scroll '>
         
          <CardAlbum />
          </div>
          
      </main>

    </div>
  )
}

export default Home