import React from 'react';

import './Album.css';
// import NavBar from './nav bar/NavBar';
import albumsongs from "../../data/albumsongs.json"
import AlbumSong from "./AlbumSong";

const Album = () => {
  

    return (
    <section>
            {/* HEADER */}

            {/* ALBUM COVER / INFO */}
            <div className="trv-album--info">
                <div className="trv-album--song--cover">
                        <img src="../../assets/reccover.jpg" alt="trv-albumcover"/>
                </div>
                <div className="trv-album--stats--info">
                        <h3>Album Name</h3>
                        <h6><span>POP</span></h6>
                       <div className="trv-album--release--info">
                        <h5>2014</h5>
                        <h6>ALBUM</h6>
                        </div>
                        <h4>Artist Name</h4>
                </div>
            </div>

            {/* SONGS */}
            <div className="trv-album--songs">
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

export default Album