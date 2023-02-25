/*
This is for the actual taste profile but I did not want to mess up the home page by 
messing with the other one so I made this to replace it when we change things up



for the page

/tasty

*/

import React, { useState} from 'react';

const TasteyProfile = () => {

  const [likeArray, setlikeArray] = useState([]);
  const [dislikeArray, setdislikeArray] = useState([]);

  return (
    <div>
        <div className="like">Likes: {likeArray}</div>

        <div className="dislike">Dislikes: {dislikeArray}</div>


    </div>
  )
}

export default TasteyProfile;