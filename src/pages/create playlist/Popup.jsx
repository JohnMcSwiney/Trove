import React from "react";
import PlaylistSong from "./PlaylistSong";

export default function PopUp(props) { 
      function handleClick() {
        props.togglePop();
       };

      const [songSearched, setSongSearched] = React.useState({
        title: ""
      });

      function handleChange(event) {
        const {name, value} = event.target
        setSongSearched( prevSongSearched => ({...prevSongSearched, title: value}))
      }
     
       return (
        <div className="createplaylist--modal">
          <div className="createplaylist--modal_content">
          <div className="createplaylist--delsong">
                    <img src="../assets/xsongsymbol.png" alt="deletesongicon" onClick={handleClick} />
          </div>
          {/* <span className="createplaylist--close" onClick={handleClick}>&times;    </span> */}
          <input type="text" id="searchbar" value={songSearched.title} name="songSearch" placeholder="Search Songs" onChange={handleChange}/>
          {/* <p>I'm A Pop Up!!!</p> */}

          <div className="createplaylist--songs createplaylist--add">
            {
              
                    props.albumSongs && props.albumSongs.map((item, index)=>{
                    if(item.title.includes(songSearched.title) && songSearched.title != "") {
                      return(
                        <PlaylistSong
                        key={index}
                        {...item}
                        index={index}
                        song={item}
                        handleRemoveSong={props.handleRemoveSong}
                        addPlaylistSongs={props.addPlaylistSongs}
                        songActionImg={props.songActionImg}
                        songAction={"add"}
                        />
                        ) }})}
            </div>
          </div>
        </div>
       );

}