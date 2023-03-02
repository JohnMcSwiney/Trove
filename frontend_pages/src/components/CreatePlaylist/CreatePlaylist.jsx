import React from "react"

import './CreatePlaylist.css';
import NavBar from './nav bar/NavBar';
import albumsongs from "../../data/albumsongs.json"
import PlaylistSong from "./PlaylistSong";

// To create a playlist
export default function CreatePlaylist(props) {
    const default_album = "../assets/default_playlistcover.png";
    const [previewCover, setPreviewCover] = React.useState(default_album);
    
    const [imageFile, setImageFile] = React.useState();
    const handleImageFileChange = (e) => {
        setImageFile(e.target.files[0]);
        setPreviewCover(URL.createObjectURL(e.target.files[0]));
  
    };

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
                        <img src={previewCover} alt="playlist"/>
                        <label className="createplaylist--custom-file-upload">
                        <input type="file" name="cover" value="" accept="image/*" className="createplaylist--gradient--btn createplaylist--image--btn createplaylist--hide--file" onChange={handleImageFileChange}/> 
                            Choose Image <img src="../../assets/upload_icon.png" id="upload--icon" alt="upload_icon"/>
                        </label>
                </div>
                <div className="createplaylist--stats--info">
                        <h5>Playlist Name</h5>
                        <input type="text" id="playlisttitle" placeholder="Playlist Name"/>
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

            <div className="createplaylist--songs">
            {
                    albumsongs && albumsongs.map((item, index)=>{
                    return(
                        <PlaylistSong
                        key={index}
                        {...item}

                        />
                
                
                ) })}
            </div>

            <NavBar />
    </section>

    )

}