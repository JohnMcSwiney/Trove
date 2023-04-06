import React from 'react'
import { NavLink } from "react-router-dom";
// Create Playlist's Song Component
export default function PlaylistSong (props) {
  const [likedSong, setLikedSong] = React.useState('../assets/heart.png')

  function handleLike () {
    if (likedSong === '../assets/heart.png') {
      setLikedSong('../assets/likedHeart.png')
      console.log(props.song)
    } else {
      setLikedSong('../assets/heart.png')
    }
  }

  console.log(props.song)
  return (

     <div className='song-info-div'>
      
      <div className='song-img-div-ver2'>
        <img src={props.song.imgUrl} alt='playlistcover' />
        {/* <img src='../assets/playmask.png' id="playmask" alt="albumcover"/> */}
      </div>
      <div className='song-text-div'>
        <div
          className='titlesongcard'
          // onClick={() => {
          //     handlePlaySong()
        >
          {props.song.title}
        </div>
        <div className='artistsongcard'>
          <NavLink to={`/artist/${props.song.artist._id}`} className='song-art-link'>
            {props.song.artist.artistName}
          </NavLink>
        </div>
      </div>
      
      <div className="genreCont">
        {props.song.genre}
      </div>
      <div className="genreCont">
      <img
          src={props.songActionImg}
          alt='deletesongicon'
          onClick={() => props.handleRemoveSong(props.song, props.songAction)}
        />
      </div>
      {/* <div className='createplaylist--song--info'>
        {/* <h5>{props.song.title}</h5> 
        <h6>{props.song.artist?.artistName}</h6>
        {/* <h5><span>{props.duration}</span></h5> 
      </div> 
      */}
      {/* <div className="createplaylist--song--options">
                        <img src={likedSong} id="playlist--song--heart" alt="heart" onClick={ () =>  handleLike()} />
                        <img src="../assets/share.png" id="playlist--song--share" alt="share"/>
                        <img src="../assets/more.png" id="playlist--song--more" alt="more"/>
                </div>      */}
    </div>

   
  )
}
