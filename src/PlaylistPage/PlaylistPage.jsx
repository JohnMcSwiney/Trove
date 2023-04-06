import React from 'react'

import './PlaylistPage.css'
// import NavBar from './nav bar/NavBar';
import albumsongs from '../data/albumsongs.json'
import PlaylistSong from './PlaylistSong'
import SearchSongCard2 from '../components/cards/search_items/searchSongCard/searchSongCard2'
import { MusicContext } from '../contexts/MusicContext'
import { Navigate, useNavigate, Link } from 'react-router-dom'
import { BsFillPlayFill } from 'react-icons/bs'
import LoadingSearch from '../components/loadingitems/loadingSearch/LoadingSearch'

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
  } = React.useContext(MusicContext)

  const [playlist, setPlaylist] = React.useState(null)
  React.useEffect(() => {
    const findPlaylistCreator = async () => {
      // setDone(false);
      fetch(`/api/users/${playlist.playlistCreator}`)
        .then(response => response.json())
        .then(json => {
          setPlaylistCreator(json)
        })
    }
    findPlaylistCreator()
    
    if(playlist === undefined && clicks !== 1){
      console.log(play_list);
      setClicks(clicks+1);
    }
    if(playlist?.songList === play_list){
      console.log("we have a match");
    }
  }, [])
  
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
          })
      }, 500)
    }
    fetchPlaylist()
  }, [id])

  const [playlistCreator, setPlaylistCreator] = React.useState(null)
  const [done, setDone] = React.useState(false)
  const [clicks, setClicks] = React.useState(0);

  

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
    
    if(play_list !== playlist?.songList ){
      clearPlay_list();
      updatePlay_list(playlist?.songList);
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
          {/* for on load ^ then for on click v */}
          <button className='playlist--playbtn' onClick={
            handlePlayPlaylist
            }>
            <BsFillPlayFill className='playIconPlayList'  />
          </button>
          <AddPlaylist_ToQueue input ={playlist?.songList}/>
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
                playlist.songList.map((song, index) => {
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
