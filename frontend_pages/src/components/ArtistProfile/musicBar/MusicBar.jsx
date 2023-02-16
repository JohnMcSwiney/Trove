import React from 'react'
import './musicbar.css'
// import sample from '../../imgs/logo.png'
const MusicBar = () => {
  return (
    <div className='trove__mp '>
       {/* <img src={sample} className='trove__mp_img'/> */}
        < div className='trove__mp_song'>
          {/* <h7>Song Title</h7> */}
          <p>Artist</p>
        </div>

        <div className="trove__mp_player">
        <h1>A</h1>
        </div>

        <div className="trove__mp_tools">
        <h1>A</h1>
        </div>

     </div>
  )
}

export default MusicBar