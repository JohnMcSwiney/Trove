import React, { useState, useEffect } from "react";
import "./UserAccStyle.css";
import tempImg from "./temp-imgs/derek.png";
import CardPlaylist from "../../components/cards/card_playlist/CardPlaylist";
import FeaturedArtist from "../../components/featured_artist/FeaturedArtist";
import GenreCard from "../../components/cards/card_genre/CardGenre";

import {Likeid, Dislikeid} from "../../components/discoverygame/DiscoveryGame";

import { useAuthContext } from "../../hooks/user-hooks/useAuthContext";
import { NavLink } from "react-router-dom";
const MyTrove = () => {
  const [index, setIndex] = React.useState(0);
  const [likeArray, setlikeArray] = useState();
  const [dislikeArray, setdislikeArray] = useState();

  const [likes, setLikes] = useState([]);
  const { user } = useAuthContext();
  const userID = JSON.parse(localStorage.getItem("user")).id;

  const [playlists, setPlaylists] = useState([]);

  React.useEffect(() => {
    const fetchPlaylists = async () => {
      const response = await fetch(`/api/playlists/mylist/${userID}`);
      // const response = await fetch(`/api/playlists`);
      const data = await response.json();

      setPlaylists(data);
      console.log(data);
    };
    fetchPlaylists();
  }, []);
  console.log(playlists);
  return (
    <div className="container">
      <div className="myTrvcontainer ">
        <div className="pfp_name_follower_cont">
          <div className="borderuserimg">
            <img src={user?.imageURL} className="user-img"></img>
          </div>
          <div className="name_follower_cont">
            <div className="txt-container">
              <h1>{user?.displayName}</h1>
            </div>
            {/* <div className="follower_cont">
              <div>
                <h2>{tempUser1.followers}</h2>
                <h1>Followers</h1>
              </div>
              <button>Follow</button>
            </div> */}
          </div>
        </div>

        <div className="account-splitter"></div>

        <div className="account-showcase-lg">
          <h1>{user?.displayedName}'s Favourite Artist: </h1>

          <div className="CardCont">
            {/* <FeaturedArtist
              artist={{
                name: "PitBull",
                imgUrl:
                  "https://storage.googleapis.com/trv_test/TempUsers/U0001/pitbullpic.jpg",
                bio: `Pitbull, also known as 'Mr. Worldwide', is a rapper, singer, and songwriter from Miami, Florida. His music blends hip-hop, pop, and Latin influences, creating a sound that is uniquely his own. Pitbull's career took off in the early 2000s, thanks in part to his energetic mixtapes and collaborations with other artists.
        
                    Pitbull's music is known for its upbeat, party-ready sound, as well as his signature catchphrase, '¡Dale!', which means 'Let's go!' in Spanish. He has released a string of hit singles and albums, including 'I Know You Want Me (Calle Ocho)', 'Give Me Everything', and 'Timber', featuring Kesha. He has also worked with a wide range of artists from various genres, such as Jennifer Lopez, Enrique Iglesias, Ne-Yo, and Christina Aguilera, among many others.
        
                    Pitbull has earned the nickname 'Mr. Worldwide' due to his global popularity and the fact that his music is loved by fans all around the world. He has toured extensively throughout North America, Europe, Latin America, and Asia, performing at major events such as the World Cup and the Olympics. His music has even been used in movies, TV shows, and commercials, further expanding his reach and influence.
        
                    In addition to his music career, Pitbull is also involved in various business ventures, including his own record label, Mr. 305 Inc., and his partnership with Voli Vodka. He is also known for his philanthropic work, supporting initiatives related to education, health, and disaster relief.
        
                    With his unique sound, catchy hooks, and positive energy, Pitbull has become one of the most beloved and recognizable artists in the music industry, earning the title of 'Mr. Worldwide' in the process.`,
              }}
            /> */}
          </div>
        </div>
        <div className="account-splitter"></div>
        <div className="account-showcase">
          <h1>Created Playlists:</h1>

          {playlists &&
            playlists.length > 0 &&
            playlists.map((playlist) => (
              <div className="CardCont">
                <CardPlaylist key={playlist._id} playlist={playlist} />
              </div>
            ))}
        </div>
        <div className="account-splitter"></div>
        <div className="account-showcase">
          <h1>Top Genre(s):</h1>
          <div className="CardCont">
            <GenreCard color={"#fc6ff1"} name={"Pop"} percent={"50%"} />

            <GenreCard color={"#ff930f"} name={"Rap"} percent={"25%"} />

            <GenreCard color={"#ff3b0f"} name={"Rock"} percent={"25%"} />
          </div>
        </div>
        <div className="account-splitter"></div>
        <div className="account-showcase">
          <div className="TPlikedSongs">
            <h1>Liked Songs</h1>
            <ul>
              {likes.map((item) => (
                <li key={item.id}>
                  {item.songName} - {item.author}
                </li>
              ))}
            </ul>
          </div>

          {/* <div className="TPDislikedSongs">
            <h1>Disliked Songs</h1>
            <ul>
              {dislikes.map((item) => (
                <li key={item.id}>
                  {item.songName} - {item.author}
                </li>
              ))}
            </ul>
          </div> */}

          <br />
        </div>
        <div className="account-splitter"></div>
        <div className="account-showcase">
          <h1></h1>
        </div>
      </div>
    </div>
  );
};

export default MyTrove;
