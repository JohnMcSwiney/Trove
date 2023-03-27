import React from 'react'

import './PlaylistPage.css'
// import NavBar from './nav bar/NavBar';
import albumsongs from '../data/albumsongs.json'
import PlaylistSong from './PlaylistSong'
import SearchSongCard2 from '../components/cards/search_items/searchSongCard/searchSongCard2'
import { MusicContext } from '../contexts/MusicContext'
import { Navigate, useNavigate, Link } from 'react-router-dom'
import { BsFillPlayFill } from 'react-icons/bs'

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
    addToQueue
  } = React.useContext(MusicContext)

  const [playlist, setPlaylist] = React.useState(null)
  React.useEffect(() => {
    const fetchPlaylist = async () => {
      const playlistResponse = await fetch(`/api/playlists/${id}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      })
      const playlistJson = await playlistResponse.json()
      if (playlistResponse.ok) {
        setPlaylist(playlistJson)
      }
    }
    fetchPlaylist()
  }, [id])

  const [playlistCreator, setPlaylistCreator] = React.useState(null)
  React.useEffect(() => {
    const findPlaylistCreator = async () => {
      const response = await fetch(`/api/users/${playlist.playlistCreator}`)
      const json = await response.json()

      if (!response.ok) {
        console.log(json.error)
      }

      if (response.ok) {
        setPlaylistCreator(json)
      }
    }
    findPlaylistCreator()
  }, [])
  
  const handlePlayPlaylist = () => {
    // console.log(playlist.songList);
    updatePlay_list(playlist.songList)
    updateCurrentSong(playlist.songList[0])
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
        <div className='playlist--info'>
          <button className='playlist--playbtn' onClick={handlePlayPlaylist}>
            <BsFillPlayFill className='playIconPlayList' />
          </button>
          <div className='playlist--song--cover'>
            <img src={playlist && playlist.playlistCoverUrl} alt='playlist' />
          </div>
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
        </div>
      </div>

      {/* SONGS */}
      <div className='bg-fglass--2--playlist'>
        <div className='playlist--songs'>
          <ul className='playlist--songlist--container'>
          {playlist &&
            playlist.songList.map((song, index) => {
              return <li className='playlist--song--container'><h1>{index+1}</h1><SearchSongCard2 key={song._id} song={song} /></li>
            })}
           </ul> 
        </div>
      </div>
      

      {/* <NavBar /> */}
    </section>
  )
}
