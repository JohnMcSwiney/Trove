import React from "react"

import './FollowersPage.css';
// import NavBar from './nav bar/NavBar';
import followers from "../data/followers.json"
import Follower from "./Follower";
// import AlbumSong from "./AlbumSong";

// User's Top Genres
export default function FollowersPage(props) {

    return (
        <section>
            {/* HEADER */}
            <div className="followers--header">
                <img className="followers--back" src="../../assets/backpage.png" alt="back--button"  />
                <h1>Followers</h1> 
                <div className="followers--circle--border"> 
                    <div className="followers--artist--icon">
                    <img width="215vmin" src="../assets/artist_icon.png" alt="genre"/>
                    </div>
                </div>
            </div>

            {/* FOLLOWER INFO */}
            <div className="followers--info">
                    <div className="followers--stats--info">
                        <h3>USERNAME</h3>
                    </div>
            </div> 

            <div className="followers--count">
                <h5>333 FOLLOWERS</h5>

            </div>

            {/* <Follower /> */}
            <div className="followers--list">
            {
                    followers && followers.map((item, index)=>{
                    return(
                        <Follower
                        key={index}
                        {...item}

                        />
                
                
                ) })}
            </div>

            {/* <NavBar /> */}
        </section>

    )

}