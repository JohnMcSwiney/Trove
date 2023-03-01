import React from "react"

import './AlbumPage.css';
// import NavBar from './nav bar/NavBar';
import albumsongs from "../data/albumsongs.json"
import AlbumSong from "./AlbumSong";

// User's Top Genres
export default function AlbumPage() {

    return (
        <section>
            {/* HEADER */}

            {/* ALBUM COVER / INFO */}
            <div className="album--info">
                <div className="album--song--cover">
                        <img src="../../assets/reccover.jpg" alt="albumcover"/>
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

            {/* <NavBar /> */}
        </section>
    )

}