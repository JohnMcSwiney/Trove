import React from "react"

import './AlbumPage.css';
import NavBar from './nav bar/NavBar';
import albumsongs from "../../data/albumsongs.json"
import AlbumSong from "./AlbumSong";

// User's Top Genres
export default function AlbumPage(props) {

    return (
        <section>
            {/* HEADER */}
            <div className="album--header">
                <img className="album--back" src="../../assets/backpage.png" alt="back--button"  />
                <h1>Album</h1> 
                <div className="album--circle--border"> 
                    <div className="album--artist--icon">
                    <img width="215vmin" src="../assets/artist_icon.png" alt="genre"/>
                    </div>
                </div>
            </div>

            {/* ALBUM COVER / INFO */}
            <div className="album--info">
                <div className="album--song--cover">
                        <img src="../assets/reccover.jpg" alt="albumcover"/>
                </div>
                <div className="album--stats--info">
                        <h3>Album Name</h3>
                        <h6><span>POP</span></h6>
                       <div className="album--release--info">
                        <h5>2014</h5>
                        <h6>ALBUM</h6>
                        </div>
                        <h4>Artist Name</h4>
                </div>
            </div>

            {/* SONGS */}
            <div className="album--songs">
            {
                    albumsongs && albumsongs.map((item, index)=>{
                    return(
                        <AlbumSong
                        key={index}
                        {...item}

                        />
                
                
                ) })}
            </div>

            <NavBar />
        </section>

    )

}