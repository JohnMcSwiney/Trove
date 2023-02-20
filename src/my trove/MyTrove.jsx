import React from 'react'
import './UserAccStyle.css';
import tempImg from './temp-imgs/derek.png';
import CardPlaylist from '../components/card_playlist/CardPlaylist';
import FeaturedArtist from '../components/featured_artist/FeaturedArtist';


const MyTrove = () => {
  const tempUser1 =  {
    userId: "U0001",

    email:"User1@email.com",

    displayedName:"Oath",

    imageURL:"https://storage.googleapis.com/trv_test/TempUsers/U0001/derek.png",
    
    followers: 124,
    followersList: '',
    // do regular users have followers? Are playlists users make public?
    
    topGenres: [
      {id:'G03', name:'Pop', percentage: 0.5 },
      {id:'G02', name:'Rap', percentage: 0.25 },
      {id:'G01', name:'Rock', percentage: 0.25 }
    ],
    //I think this should be calculated in the backend somewhere. If this is too much of a hassle don't make it, we'll remove it

    // createdOn: new Date("2023-02-14"),
    playlists:[
      {
        url:''
      }
    ]
  
  
  }

  const userFollowers = 124;

  return (
    <div>
      <div className='myTrvcontainer'>
      <div className='pfp_name_follower_cont'>
        <div className='borderuserimg'>
            <img src={tempUser1.imageURL} className='user-img'></img>
        </div>
        <div className='name_follower_cont'>
          <div className='txt-container'>
              <h1>Oath</h1>
          </div>
          <div className='follower_cont'>
            <div>
            <h2>{tempUser1.followers}</h2><h1>Followers</h1>
            </div>
            <button>Follow</button>
          </div>
          
        </div>
        
      </div>
      <div className='account-splitter'></div>
      <div className='account-showcase'>
        <h1></h1>
        
        <div className='CardCont'>
          <FeaturedArtist/>
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