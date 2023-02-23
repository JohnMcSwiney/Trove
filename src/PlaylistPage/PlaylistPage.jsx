import React from "react"

import './PlaylistPage.css';
// import NavBar from './nav bar/NavBar';
import albumsongs from "../data/albumsongs.json"
import PlaylistSong from "./PlaylistSong";

// User's Top Genres
export default function PlaylistPage(props) {

    return (
        <section>
            {/* HEADER */}
            <div className="playlist--header">
                <img className="playlist--back" src="../../assets/backpage.png" alt="back--button"  />
                <h1>Playlist</h1> 
                <div className="playlist--circle--border"> 
                    <div className="playlist--artist--icon">
                    <img width="215vmin" src="../assets/artist_icon.png" alt="genre"/>
                    </div>
                </div>
            </div>

            {/* ALBUM COVER / INFO */}
            <div className="playlist--info">
                <div className="playlist--song--cover">
                        <img src="../assets/reccover.jpg" alt="playlist"/>
                </div>
                <div className="playlist--stats--info">
                        <h3>Playlist Name</h3>
                       <div className="playlist--release--info">
                        <h5>2014</h5>
                        <h6>PLAYLIST</h6>
                        </div>
                        <h4>Creator Username</h4>
                </div>
            </div>

            {/* SONGS */}
            {/* <div className="album--song">
                <div className="album--tiny--cover">
                        <img src="../assets/reccover.jpg" alt="albumcover"/>
                </div>                
                <div className="album--song--info">
                        <h5>Fireball</h5>
                        <h6>Pitbull</h6>
                </div>
                <div className="album--song--options">
                        <img src="../assets/heart.png" id="album--song--heart" alt="heart"/>
                        <img src="../assets/share.png" id="album--song--share" alt="share"/>
                        <img src="../assets/more.png" id="album--song--more" alt="more"/>
                </div>           

            </div> */}

            <div className="playlist--songs">
            {
                    albumsongs && albumsongs.map((item, index)=>{
                    return(
                        <PlaylistSong
                        key={index}
                        {...item}

                        />
                
                
                ) })}
            </div>

            {/* <NavBar /> */}
        </section>

    )

}