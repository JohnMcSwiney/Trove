import React from 'react'

import TasteProfile from '../components/taste Profile/TasteProfile'
import YourArtists from '../components/your artist/YourArtists';
import LastestRecipe from '../components/lastest recipe/LastestRecipe';

const Home = () => {
  return (
    <div>
        <main className="row-span-1 md:col-span-2 relative">
        <TasteProfile/>
        <YourArtists/>
        <LastestRecipe/>
      </main>

    </div>
  )
}

export default Home