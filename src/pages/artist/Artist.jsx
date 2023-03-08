import React, { useState} from 'react';
import './Artist.css';
import tempImg from './temp-imgs/artistPicPlaceholder.png';
import CardPlaylist from '../../components/cards/card_playlist/CardPlaylist';
import CardAlbum from '../../components/cards/card_album/CardAlbum';

import FeaturedArtist from '../../components/featured_artist/FeaturedArtist';
import GenreCard from '../../components/cards/card_genre/CardGenre';


import DiscoveryGame from '../../components/discoverygame/DiscoveryGame';

import Popup from 'reactjs-popup'

const Artist = () => {
  
  const [likeArray, setlikeArray] = useState();
  const [dislikeArray, setdislikeArray] = useState();

  const [likedSongArray, setlikedSongArray] = useState([]);
  const [dislikedSongArray, setdislikedSongArray] = useState([]);

  const tempArtist1 = {
    userId: "A0001",

    email: "User1@email.com",

    displayedName: "Artist",

    imageURL: "https://storage.googleapis.com/trv_test/TempUsers/U0001/derek.png",

    followers: 124,
    followersList: '',
    // do regular users have followers? Are playlists users make public?

    bio: `Pitbull, also known as 'Mr. Worldwide', is a rapper, singer, and songwriter from Miami, Florida. His music blends hip-hop, pop, and Latin influences, creating a sound that is uniquely his own. Pitbull's career took off in the early 2000s, thanks in part to his energetic mixtapes and collaborations with other artists.
        
                    Pitbull's music is known for its upbeat, party-ready sound, as well as his signature catchphrase, '¡Dale!', which means 'Let's go!' in Spanish. He has released a string of hit singles and albums, including 'I Know You Want Me (Calle Ocho)', 'Give Me Everything', and 'Timber', featuring Kesha. He has also worked with a wide range of artists from various genres, such as Jennifer Lopez, Enrique Iglesias, Ne-Yo, and Christina Aguilera, among many others.
        
                    Pitbull has earned the nickname 'Mr. Worldwide' due to his global popularity and the fact that his music is loved by fans all around the world. He has toured extensively throughout North America, Europe, Latin America, and Asia, performing at major events such as the World Cup and the Olympics. His music has even been used in movies, TV shows, and commercials, further expanding his reach and influence.
        
                    In addition to his music career, Pitbull is also involved in various business ventures, including his own record label, Mr. 305 Inc., and his partnership with Voli Vodka. He is also known for his philanthropic work, supporting initiatives related to education, health, and disaster relief.
        
                    With his unique sound, catchy hooks, and positive energy, Pitbull has become one of the most beloved and recognizable artists in the music industry, earning the title of 'Mr. Worldwide' in the process.`,
              
    topGenres: [
      { id: 'G03', name: 'Pop', percentage: 0.5 },
      { id: 'G02', name: 'Rap', percentage: 0.25 },
      { id: 'G01', name: 'Rock', percentage: 0.25 }
    ],
    //I think this should be calculated in the backend somewhere. If this is too much of a hassle don't make it, we'll remove it

    // createdOn: new Date("2023-02-14"),
    playlists: [
      {
        url: ''
      }
    ]
  }
  const userFollowers = 124;

  return (
    <div className='myTrvcontainer '>
      <div className='pfp_name_follower_bio_cont'>
        <div className='test-container'>
        <div className='borderuserimg'>
          <img src={tempArtist1.imageURL} className='user-img'></img>
        </div>
        <div className='name_follower_cont'>
          <div className='txt-container'>
            <h1>{tempArtist1.displayedName}</h1>
          </div>
          <div className='follower_cont'>
            <div>
              <h2>{tempArtist1.followers}</h2><h1>Followers</h1>
            </div>
            <button>Follow</button>
          </div>

        </div>
        </div>

        <div className='artist-profile-bio-cont'>
        <p className='artist-profile-bio'>{tempArtist1.bio}</p>
        <Popup
          trigger={<button className='btn'> Show More </button>}
          modal
          closeOnDocumentClick
        >
          {close => (
            <div className='bioOnClickCont'>
              <div className='modalTitle'>
                {tempArtist1.displayedName}
                <span>'s Artist Bio </span>
                <button
                  onClick={() => {
                    close()
                  }}
                >
                  X
                </button>
              </div>
              <div className='bioContBio'>
                <span>{tempArtist1.bio}</span>
              </div>
            </div>
          )}
        </Popup>
      </div>
      </div>
      
      <div className='account-splitter'></div>

      <div className='artist-showcase-lg'>
        <h1>{tempArtist1.displayedName}'s Top Songs: </h1>
        <div className='CardCont'>
          
        </div>
      </div>

      <div className='account-splitter'></div>
        <div className='artist-showcase'>
          <h1>Albums:</h1>
          <div className='CardCont'>
          <CardAlbum />
          </div>
          
        </div> 

      <div className='account-splitter'></div>
      <div className='artist-showcase'>
      <h1>Created Playlists:</h1>
        <div className='CardCont'>
          <CardPlaylist />
        </div>

      </div>
      <div className='account-splitter'></div>
      
      <div className='account-splitter'></div>
      <div className='artist-showcase'>
        <h1></h1>
      </div>


    </div>
  )
}

export default Artist