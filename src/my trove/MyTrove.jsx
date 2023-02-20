import React from 'react'
import './UserAccStyle.css';
import tempImg from './temp-imgs/derek.png';
import CardPlaylist from '../components/card_playlist/CardPlaylist';
const MyTrove = () => {
  const userFollowers = 124;
  return (
    <div>
      <div className='container'>
      <div className='pfp_name_follower_cont'>
        <div className='borderuserimg'>
            <img src={tempImg} className='user-img'></img>
        </div>
        <div className='name_follower_cont'>
          <div className='txt-container'>
              <h1>Oath</h1>
          </div>
          <div className='follower_cont'>
            <div>
            <h2>{userFollowers}</h2><h1>Followers</h1>
            </div>
            <button>Follow</button>
          </div>
          
        </div>
        
      </div>
      <div className='account-splitter'></div>
      <div className='account-showcase'>
        <h1>Created Playlists:</h1>
        <div className='CardCont'>
          <CardPlaylist/>
        </div>
      </div>
      <div className='account-splitter'></div>
      <div className='account-showcase'>
        <h1>Top Genre(s):</h1>
      </div>
      
      
    </div>

    </div>
  )
}

export default MyTrove