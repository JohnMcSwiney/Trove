/*
This is for the actual taste profile but I did not want to mess up the home page by 
messing with the other one so I made this to replace it when we change things up



for the page

/tasty

*/

import React, { useState} from 'react';
import DiscoveryGame from '../discoverygame/DiscoveryGame';
import Hardcodedgsongs from '../discoverygame/hardcodedgsongs';


const TasteyProfile = () => {

  const [likeArray, setlikeArray] = useState();
  const [dislikeArray, setdislikeArray] = useState();

  const [likedSongArray, setlikedSongArray] = useState([]);
  const [dislikedSongArray, setdislikedSongArray] = useState([]);

  return (
    <div>
        <div className="TPlike">Likes: {likeArray}</div>

        <div className="TPdislike">Dislikes: {dislikeArray}</div>


        <div className="TPlikedSongs">{likedSongArray}{Hardcodedgsongs[0].songName}</div>

        <div className="TPdislikedSongs">{dislikedSongArray}</div>


    </div>
  )
}

export default TasteyProfile;