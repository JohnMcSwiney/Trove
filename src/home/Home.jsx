import React from 'react'

import TasteProfile from '../components/taste Profile/TasteProfile';
import CardArtist from '../components/card_artist/CardArtist';
import CardAlbum from '../components/card_album/CardAlbum'
import LastestRecipe from '../components/lastest recipe/LastestRecipe';

import './home.css';


const Home = () => {
  
  return (
    <div>
        <main className="row-span-1 md:col-span-2 relative">
        <TasteProfile/>
        

          <h4 className="mainHeadertxt txt-white pad-t-10 mar-l-5">Artists you love:</h4>
          <div className='cardartist1 grid grid-flow-col overflow-scroll pad-t-5'>
          <CardArtist/>      
          </div>

          <h4 className="mainHeadertxt txt-white pad-t-10 mar-l-5">Albums to listen to:</h4> 
          <div  className='grid grid-flow-col overflow-scroll pad-t-5'>
          <CardAlbum />
          </div>
          
      </main>

    </div>
  )
}

export default Home