import React from "react"

import './CreatePlaylist.css';
import NavBar from './nav bar/NavBar';
import albumsongs from "../../data/albumsongs.json"
import PlaylistSong from "./PlaylistSong";
import PopUp from "./Popup"; 

// To create a playlist
export default function CreatePlaylist(props) {
    const default_album = "../assets/default_playlistcover.png";
    const [previewCover, setPreviewCover] = React.useState(default_album);
    const [albumSongs, setAlbumSongs] = React.useState(albumsongs);
    
    const [imageFile, setImageFile] = React.useState();
    const handleImageFileChange = (e) => {
        setImageFile(e.target.files[0]);
        setPreviewCover(URL.createObjectURL(e.target.files[0]));
  
    };

    function handleRemoveSong(index) {
        console.log(index);
        const newList = albumSongs.filter((item) => item.idno != index);

        
        setAlbumSongs(newList);

    }

    const [modalIsOpen, setIsOpen] = React.useState(true);
    
    function togglePop() {
        setIsOpen(prevModalIsOpen => !prevModalIsOpen);
        console.log("OPENED!")

    }


    function handleAddSongsClick() {

    
    }


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
        {modalIsOpen ? <div className="createplaylist--popupmask"></div> : null }
        {modalIsOpen ? <PopUp togglePop={togglePop} albumSongs={albumSongs} /> : null}
            <div className="createplaylist--info">
                <div className="createplaylist--song--cover">
                        <img src={previewCover} alt="playlist"/>
                        <label className="createplaylist--custom-file-upload">
                        <input type="file" name="cover" value="" accept="image/*" className="createplaylist--gradient--btn createplaylist--image--btn createplaylist--hide--file" onChange={handleImageFileChange}/> 
                            Choose Image <img src="../../assets/upload_icon.png" id="upload--icon" alt="upload_icon"/>
                        </label>
                </div>
                <div className="createplaylist--stats--info">
                        <input type="text" id="playlisttitle" placeholder="Playlist Name"/>
                       <div className="createplaylist--release--info">
                        {/* <h5>2014</h5> */}
                        <input type="textarea" id="playlistdesc" placeholder="Add Description (Optional)" name="playlist description"/>
                        {/* <h6>PLAYLIST</h6> */}
                        </div>
                        {/* <h4>Creator Username</h4> */}

                        
                        
                </div>
              
            </div>
            <div className="createplaylist--createbtn">
                    <input type="submit" value="Create" className="createplaylist--gradient--btn createplaylist--submit--btn" /> 
                </div>

            <div className="createplaylist--addsongs">
                <div className="createplaylist--searchbar" >
                {/* <input type="text" id="searchbar" placeholder="Search Songs"/> */}
                <input type="button" value="Add Songs" className="createplaylist--gradient--btn createplaylist--addsongsbtn"   onClick={togglePop}/> 
                <div className="createplaylist--addedsongs">

            </div>

            </div>

            <div className="createplaylist--songs">
            {
                    albumSongs && albumSongs.map((item, index)=>{
                    return(
                        <PlaylistSong
                        key={index}
                        {...item}
                        index={index}
                        handleRemoveSong={handleRemoveSong}
                        />
                
                
                ) })}
            </div>

            </div>

            
            <NavBar />

    </section>

    )

}