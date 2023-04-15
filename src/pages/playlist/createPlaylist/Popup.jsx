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
        <div className="createplaylist--modal">
          
          <div className="createplaylist--delsong">
                    <img src="../assets/xsongsymbol.png" alt="deletesongicon" onClick={handleClick} />
          </div>
          {/* <span className="createplaylist--close" onClick={handleClick}>&times;    </span> */}
          <input type="text" id="searchbar" value={props.search} name="songSearch" className="searchBox " onChange={((e) => props.setSearch(e.target.value))}/>
          {/* <p>I'm A Pop Up!!!</p> */}

          <div className="playlist--songs 
          createplaylist--add
          ">
          
            {
               !props.done ? <LoadingSearch /> :
                    <div>
                      {props.searchResult.songs && props.search.length > 0 && (
                      <ul className='playlist--songlist--container'>
                        {props.searchResult.songs.map((song, index) => (
                          <li className='playlist--song--container'>
                          <PlaylistSong key={song._id} song={song} setSongData={props.setSongData}
                          handleActionSong={props.handleActionSong}
                          songActionImg={props.songActionImg}
                          songAction={"add"}
                          />
                          </li>
                        ))}
                      </ul>
                    )}
                    </div>


                    // props.albumSongs && props.albumSongs.map((item, index)=>{
                    // if(item.title.includes(props.search) && props.search != "") {
                    //   return(
                    //     <PlaylistSong
                    //     key={index}
                    //     {...item}
                    //     index={index}
                    //     song={item}
                    //     handleRemoveSong={props.handleRemoveSong}
                    //     addPlaylistSongs={props.addPlaylistSongs}
                    //     songActionImg={props.songActionImg}
                    //     songAction={"add"}
                    //     />
                    //     ) }})
                        }
                        
            </div>
          </div>
        
       );

}