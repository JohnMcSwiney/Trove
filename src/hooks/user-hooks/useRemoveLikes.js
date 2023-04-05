import { useState } from "react";

export const useRemoveLikes  = () => {

    const [unlikeError, setUnlikeError] = useState(null);
    const [unlikeIsLoading, setunLikeIsLoading] = useState(false)
    const user = localStorage.getItem("user");
    const userID = user ? JSON.parse(user).id : null;
    
      
    const handleRemoveSong = async (songId) => {
    
      setunLikeIsLoading(true);
      setUnlikeError(null);
    
      console.log(songId);
      const response = await fetch(`/api/songs/removelike/${songId._id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userID }),
      });
      const json = await response.json();
    
      if (!response.ok) {
        setUnlikeError(json.error);
        
      }
    
      if (response.ok) {
        const user = localStorage.getItem("user");
        const likedSongs = user ? JSON.parse(user).likedSongs || [] : [];
        const songIndex = likedSongs.indexOf(songId._id);

        console.log(" testeroni" + likedSongs)

        if (songIndex !== -1) {
          likedSongs.splice(songIndex, 1);
          localStorage.setItem(
            "user",
            JSON.stringify({ ...JSON.parse(user), likedSongs })
            
          );
          
        }
      }
      
      setunLikeIsLoading(false);
      
    };
    
return { handleRemoveSong, unlikeError, unlikeIsLoading };
};