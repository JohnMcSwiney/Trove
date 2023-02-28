import React from "react"

import './CreatePlaylist.css';

// To create a playlist
export default function CreatePlaylist(props) {
    
    return(
    <section>
        {/* HEADER */}
          <div className="createplaylist--header">
                <img className="createplaylist--back" src="../../assets/backpage.png" alt="back--button"  />
                <h1>Create Playlist</h1> 
                <div className="createplaylist--circle--border"> 
                    <div className="createplaylist--artist--icon">
                    <img width="215vmin" src="../assets/artist_icon.png" alt="genre"/>
                    </div>
                </div>
            </div>

        {/* PLAYLIST'S INFO */}
            <div className="createplaylist--info">
                <div className="createplaylist--song--cover">
                        <img src="../assets/default_upload.png" alt="playlist"/>
                </div>
                <div className="createplaylist--stats--info">
                        <h5>Playlist Name</h5>
                        <input type="text" placeholder="Playlist Name"/>
                       <div className="createplaylist--release--info">
                        {/* <h5>2014</h5> */}
                        <input type="textarea" id="playlistdesc" placeholder="Add Description (Optional)" name="playlist description"/>
                        {/* <h6>PLAYLIST</h6> */}
                        </div>
                        {/* <h4>Creator Username</h4> */}
                </div>
            </div>

            <div className="createplaylist--addsongs">
                <div className="createplaylist--searchbar">
                <input type="text" id="searchbar" placeholder="Search Songs"/>

                <div className="createplaylist--addedsongs">
                    
                </div>
            </div>

            </div>
    </section>

    )

}