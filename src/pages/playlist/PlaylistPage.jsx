import React from 'react'

import './PlaylistPage.css'
// import NavBar from './nav bar/NavBar';
import albumsongs from '../../data/albumsongs.json'
import PlaylistSong from './PlaylistSong'
import SearchSongCard2 from '../../components/cards/search_items/searchSongCard/searchSongCard2'
import { MusicContext } from '../../contexts/MusicContext'
import { Navigate, useNavigate, Link } from 'react-router-dom'
import { BsFillPlayFill } from 'react-icons/bs'
import LoadingSearch from '../../components/loadingitems/loadingSearch/LoadingSearch'
import { BsPlay, BsPause } from 'react-icons/bs'

import AddPlaylist_ToQueue from "./addPlaylist_ToQueue";
//fetching
import { useParams } from 'react-router-dom'

// User's Top Genres
export default function PlaylistPage (props) {
  let { id } = useParams()

  const userId = JSON.parse(localStorage.getItem('user')).id

  const {
    currentSong,
    updateCurrentSong,
    play_list,
    updatePlay_list,
    updateQueue,
    addToQueue,
    clearPlay_list,
    updatePlay_listPosition,
    isPlay_Global,
    toggleIsPlay_G,

  } = React.useContext(MusicContext)

  const [playlist, setPlaylist] = React.useState(null)
  const [playlistCreator, setPlaylistCreator] = React.useState(null)
  
  const togglePlayPause = () => {
    toggleIsPlay_G();
  }

  React.useEffect(() => {
    const fetchPlaylist = async () => {
      // const playlistResponse = await fetch(`/api/playlists/${id}`, {
      //   method: 'GET',
      //   headers: { 'Content-Type': 'application/json' }
      // })
      // const playlistJson = await playlistResponse.json()
      // if (playlistResponse.ok) {
      //   setPlaylist(playlistJson)
      // }
      setTimeout(() => {
        fetch(`/api/playlists/${id}`)
          .then(response => response.json())
          .then(json => {
            // setPlaylistCreator(json)
            setDone(true)
            setPlaylist(json)
            setPlaylistCreator(json._id)
          })
      }, 500)
    }
    fetchPlaylist()
  }, [id])


  const [done, setDone] = React.useState(false)
  const [clicks, setClicks] = React.useState(0);

  // // React.useEffect(() => {
  // //   const findPlaylistCreator = async () => {
  // //     // setDone(false);
  // //     fetch(`/api/users/${playlist.playlistCreator}`)
  // //       .then(response => response.json())
  // //       .then(json => {
  // //         setPlaylistCreator(json)
  // //       })
  // //   }
  // //   findPlaylistCreator()
    
  // //   if(playlist === undefined && clicks !== 1){
  // //     console.log(play_list);
  // //     setClicks(clicks+1);
  // //   }
  // //   if(playlist?.songList === play_list){
  // //     console.log("we have a match");
  // //   }
  // // }, [])

  

  const handlePlayPlaylist = () => {
    console.log("handlePlayPlaylist");  
    if(play_list !== playlist?.songList){
      setClicks(clicks+1);
      return;

    }
  }
  React.useEffect(() => {
    // This code will run after every render
    setPlaylistasPlay_list();
    
  }, [clicks]); // Only re-run the effect if count changes


  const setPlaylistasPlay_list = () =>{
    console.log('in playlist play_List method');
    if(clicks !== 0){
      if(play_list !== playlist?.songList ){
        if(playlist?.songList.length === 0 ){
          return;
        }
        else {
      
          console.log("setting Play_list")
          updatePlay_list(playlist?.songList);
        }
      }
    } 
  }
  const navigate = useNavigate()
  function redirectEditPlaylist () {
    navigate(`/editplaylist/${playlist._id}`)
  }
  return (
    <section className='playlist-containter-ver2'>
      {/* HEADER */}

      {/* ALBUM COVER / INFO */}
      <div className='bg-fglass--1--playlist'>
        <div className='playlist--info' 
        // onClick={handlePlayPlaylist()}
        >
          <div className='playPauseQueueBtnCont'>
          {clicks !== 0 && play_list === playlist?.songList ? (
            <button
            className='playlist--playbtn'
            // id='playPauseBtn'
            onClick={togglePlayPause}
          >
            {isPlay_Global ? (
              <BsPause />
            ) : (
              <BsPlay className='playIconPlayList' />
            )}
          </button>
          )
        :
        (
          <button className='playlist--playbtn' onClick={
            handlePlayPlaylist
            }>
            <BsFillPlayFill className='playIconPlayList'  />
          </button>
        )}
        <div>
          
        </div>
        <AddPlaylist_ToQueue input ={playlist?.songList} className='AddPlaylist_ToQueue'/>
        
        </div>
 


          
          
          {!done ? (
            <LoadingSearch />
          ) : (
            <div className='playlist--song--cover'>
              <img src={playlist && playlist.playlistCoverUrl} alt='playlist' />
            </div>
          )}
          {!done ? (
            <LoadingSearch />
          ) : (
            <div className='playlist--stats--info'>
              <div className='playlist--release--info'>
                <h6>Playlist</h6>
                {/* <div className="playlist--release--filler--div">|</div><h5>2014</h5> */}
                <div className='playlist--release--filler--div'>|</div>
                <h4>By: {playlist && playlist.playlistCreator.displayName}</h4>
              </div>
              <h3>{playlist && playlist.playlistName}</h3>
              <div className='playlist-editBtn--container'>
                <div className='editbtn--cont'>
                  {userId === playlist?.playlistCreator._id && (
                    <button
                      className='playlist--editbtn'
                      onClick={redirectEditPlaylist}
                    >
                      Edit
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* SONGS */}
      <div className='bg-fglass--2--playlist'>
        {!done ? (
          <LoadingSearch />
        ) : (
          <div className='playlist--songs'>
            <ul className='playlist--songlist--container'>
              {playlist &&
                playlist?.songList?.map((song, index) => {

                  // alert("song in .map: " + song.title);

                  // alert("playlist songlist in .map: " + );


                  // if (playlist?.songList?.includes(song._id)) {
                  //   alert("does it even go in here?")
                  //   playlist.songList.pop(song._id);
                  //   alert("found duplicate song, should be removed");
                  // }

                  // if (playlist?.songList?.some(item => item.id === song._id)) {
                  //   playlist.songList.pop(currentSong._id);
                  //   alert("found duplicate song, should be removed");
                  // }
                  return (
                    <li className='playlist--song--container'>
                      <h1>{index + 1}</h1>
                      <SearchSongCard2 key={song._id} song={song} />
                    </li>
                  )
                })}
            </ul>
          </div>
        )}
      </div>
                <div onLoad={handlePlayPlaylist}>

                </div>
      {/* <NavBar /> */}
    </section>
  )
}
