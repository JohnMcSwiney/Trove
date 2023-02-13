import React from 'react'

import TasteProfile from '../components/taste Profile/TasteProfile';
import CardArtist from '../components/card_artist/CardArtist';
import LastestRecipe from '../components/lastest recipe/LastestRecipe';

const Home = () => {
  return (
    <div>
        <main className="row-span-1 md:col-span-2 relative">
        <TasteProfile/>
        <div className="">

          <h4 className="mainHeadertxt">Artists you love:</h4>
          <div className='grid grid-flow-col overflow-scroll '>
            <CardArtist
              artist={{
                name: 'Ice Cube',
                picUrl: 'https://storage.googleapis.com/trv_test/TroveMusic/rap/ice_cube/the_predator/cover/cover.jpg'
              }} />
            <CardArtist
              artist={{
                name: 'Téa G',
                picUrl: 'https://storage.googleapis.com/trv_test/TroveMusic/pop/tea_g/see_it_through/cover/cover.jpg'
              }} />

            <CardArtist
              artist={{
                name: 'wavepool abortion',
                picUrl: 'https://storage.googleapis.com/trv_test/TroveMusic/country/wavepool_abortion/wavepool_abortion/artist_img.JPG'
              }} />
            <CardArtist
              artist={{
                name: 'custodian',
                picUrl: 'https://storage.googleapis.com/trv_test/TroveMusic/electronic/custodian/songs_2/cover/cover.jpg'
              }} />
            <CardArtist
              artist={{
                name: 'Poltergeist',
                picUrl: 'https://storage.googleapis.com/trv_test/TroveMusic/rock/poltergeist/cold_in_september/cover/cover.png'
              }} />



          </div>
        </div>
        <LastestRecipe/>
      </main>

    </div>
  )
}

export default Home