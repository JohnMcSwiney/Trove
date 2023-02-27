import React from 'react'
import './UserAccStyle.css';
import tempImg from './temp-imgs/derek.png';
import CardPlaylist from '../components/cards/card_playlist/CardPlaylist';
import FeaturedArtist from '../components/featured_artist/FeaturedArtist';
import GenreCard from '../components/cards/card_genre/CardGenre';


const MyTrove = () => {
  const tempUser1 = {
    userId: "U0001",

    email: "User1@email.com",

    displayedName: "Oath",

    imageURL: "https://storage.googleapis.com/trv_test/TempUsers/U0001/derek.png",

    followers: 124,
    followersList: '',
    // do regular users have followers? Are playlists users make public?

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
    <div className='container'>
      <div className='myTrvcontainer '>
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

        <div className='account-showcase-lg'>
          <h1>{tempUser1.displayedName}'s Favourite Artist: </h1>

          <div className='CardCont'>
            <FeaturedArtist
              artist = {{
                name: "PitBull",
                imgUrl: "https://storage.googleapis.com/trv_test/TempUsers/U0001/pitbullpic.jpg",
                bio: `Pitbull, also known as 'Mr. Worldwide', is a rapper, singer, and songwriter from Miami, Florida. His music blends hip-hop, pop, and Latin influences, creating a sound that is uniquely his own. Pitbull's career took off in the early 2000s, thanks in part to his energetic mixtapes and collaborations with other artists.
        
                    Pitbull's music is known for its upbeat, party-ready sound, as well as his signature catchphrase, '¡Dale!', which means 'Let's go!' in Spanish. He has released a string of hit singles and albums, including 'I Know You Want Me (Calle Ocho)', 'Give Me Everything', and 'Timber', featuring Kesha. He has also worked with a wide range of artists from various genres, such as Jennifer Lopez, Enrique Iglesias, Ne-Yo, and Christina Aguilera, among many others.
        
                    Pitbull has earned the nickname 'Mr. Worldwide' due to his global popularity and the fact that his music is loved by fans all around the world. He has toured extensively throughout North America, Europe, Latin America, and Asia, performing at major events such as the World Cup and the Olympics. His music has even been used in movies, TV shows, and commercials, further expanding his reach and influence.
        
                    In addition to his music career, Pitbull is also involved in various business ventures, including his own record label, Mr. 305 Inc., and his partnership with Voli Vodka. He is also known for his philanthropic work, supporting initiatives related to education, health, and disaster relief.
        
                    With his unique sound, catchy hooks, and positive energy, Pitbull has become one of the most beloved and recognizable artists in the music industry, earning the title of 'Mr. Worldwide' in the process.`
              }}
        />
          </div>

        </div>
        <div className='account-splitter'></div>
        <div className='account-showcase'>
          <h1>Created Playlists:</h1>
          <div className='CardCont'>
            <CardPlaylist />
          </div>
        </div>
        <div className='account-splitter'></div>
        <div className='account-showcase'>
          <h1>Top Genre(s):</h1>
          <div className='CardCont'>
            <GenreCard
              color={'#fc6ff1'}
              name={'Pop'}
              percent={'50%'}
            />

            <GenreCard
              color={'#ff930f'}
              name={'Rap'}
              percent={'25%'}
            />

            <GenreCard
              color={'#ff3b0f'}
              name={'Rock'}
              percent={'25%'}
            />


          </div>

        </div>
        <div className='account-splitter'></div>
        <div className='account-showcase'>
          <h1></h1>
        </div>
        <div className='account-splitter'></div>
        <div className='account-showcase'>
          <h1></h1>
        </div>


      </div>

    </div>
  )
}

export default MyTrove