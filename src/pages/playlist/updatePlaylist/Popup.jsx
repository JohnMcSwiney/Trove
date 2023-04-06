import React from "react";
import PlaylistSong from "./PlaylistSong";
import { Navigate, NavLink } from "react-router-dom";


//for searching songs
import LoadingSearch from "../../../components/loadingitems/loadingSearch/LoadingSearch";

export default function PopUp(props) { 
      function handleClick() {
        props.togglePop();
       };

      // const [songSearched, setSongSearched] = React.useState({
      //   title: ""
      // });

      // function handleChange(event) {
      //   const {name, value} = event.target
      //   setSongSearched( prevSongSearched => ({...prevSongSearched, title: value}))
      // }
     
       return (
        <div className="updateplaylist--modal">
          <div className="updateplaylist--modal_content">
          <div className="updateplaylist--delsong">
                    <img src="../assets/xsongsymbol.png" alt="deletesongicon" onClick={handleClick} />
          </div>
          {/* <span className="updateplaylist--close" onClick={handleClick}>&times;    </span> */}
          <input type="text" id="searchbar" value={props.search} name="songSearch" placeholder="Search Songs" onChange={((e) => props.setSearch(e.target.value))}/>
          {/* <p>I'm A Pop Up!!!</p> */}

          <div className="updateplaylist--songs updateplaylist--add">
            {
               !props.done ? <LoadingSearch /> :
                    <div>
                      {props.searchResult.songs && props.search.length > 0 && (
                      <div>
                        {props.searchResult.songs.map((song, index) => (
                          <PlaylistSong key={song._id} song={song} setSongData={props.setSongData}
                          handleRemoveSong={props.handleRemoveSong}
                          songActionImg={props.songActionImg}
                          songAction={"add"}
                          />
                        ))}
                      </div>
                    )}
                    </div>
                        }
            </div>
          </div>
        </div>
       );

}