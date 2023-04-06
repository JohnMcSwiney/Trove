import React from "react"

import './FollowersPage.css';
// import NavBar from './nav bar/NavBar';
// import followers from "../data/followers.json"
import Follower from "./Follower";
import { useParams } from "react-router-dom";
// import AlbumSong from "./AlbumSong";

// User's Top Genres
export default function FollowersPage(props) {

    let { id } = useParams();
    const [artist, setArtist] = React.useState(null);


    React.useEffect(() => {
        const findArtist = async () => {
          const response = await fetch(`/api/artists/${id}`);
          const artistJson = await response.json();
    
          if (!response.ok) {
            console.log(artistJson.error);
          }
    
          if (response.ok) {
            setArtist(artistJson);
          }
        };
        findArtist();
      }, [id]);


    return (
        <section>
            {/* HEADER */}
            {/* FOLLOWER INFO */}
            <div className="followers--info">
                    <div className="followers--stats--info">
                        <h3>{artist?.artistName}</h3>
                    </div>
            </div> 

            <div className="followers--count">
                <h5>{artist?.followers.length} {artist?.followers.length > 1 ? "FOLLOWERS" : "FOLLOWER"}</h5>

            </div>

            {/* <Follower /> */}
            <div className="followers--list">
            {
                    // followers && followers.map((item, index)=>{
                    // return(
                    //     <Follower
                    //     key={index}
                    //     {...item}

                    //     />
                    // ) })

                    artist && artist.followers.map((item, index)=>{
                        return(
                            <Follower
                            key={index}
                            follower={item}
                            {...item}
                            
    
                            />
                            ) })
                }
            </div>

            {/* <NavBar /> */}
        </section>

    )

}