import React from 'react'

import './AlbumPage.css'
// import NavBar from './nav bar/NavBar';
import albumsongs from '../../../data/albumsongs.json'
import AlbumSong from './AlbumSong'

//fetching
import { useParams } from 'react-router-dom'

import LoadingSearch from '../../../components/loadingitems/loadingSearch/LoadingSearch'
import SearchSongCard2 from '../../../components/cards/search_items/searchSongCard/searchSongCard2'
import { MusicContext } from '../../../contexts/MusicContext'
import { Navigate, useNavigate, Link } from 'react-router-dom'
import { BsFillPlayFill } from 'react-icons/bs'
import { escapeSelector } from 'jquery'

// User's Top Genres
export default function AlbumPage () {
  let { id } = useParams()
  const {
    currentSong,
    updateCurrentSong,
    play_list,
    updatePlay_list,
    updateQueue,
    addToQueue,
    updateQueuePosition
  } = React.useContext(MusicContext)

  const [album, setAlbum] = React.useState(null)
  const [done, setDone] = React.useState(true)
  const [artist, setArtist] = React.useState(null)
  const [artistName, setArtistName] = React.useState(null)
  const [albumSongList, setAlbumSongList] = React.useState([])
  const [test, setTest] = React.useState(false);
  const [test2, setTest2] = React.useState(false);
  React.useEffect(() => {
    const fetchAlbum = async () => {
      const albumResponse = await fetch(`/api/albums/${id}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      })
      const albumJson = await albumResponse.json()
      if (albumResponse.ok) {
        setAlbum(albumJson)
        // console.log(albumJson);
      } else {
        // setDone(false);
      }
    }

    fetchAlbum()
  }, [id])

  React.useEffect(() => {
    const fetchArtist = async () => {
      const artistResponse = await fetch(`/api/artists/${album?.artist}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      })
      const artistJson = await artistResponse.json()
      if (artistResponse.ok) {
        setArtist(artistJson)
        // console.log(artist);
      } else {
        // setDone(false);
      }
    }
    fetchArtist()
  }, [album])

  const fetchAlbumSongs = async () => {
    // if(album && albumSongList?.length <= album?.songList.length){
    if (test === true) {
      console.log(albumSongList)
      if (albumSongList?.length <= album?.songList.length) {
        let songListin = album.songList
        for (const id of songListin) {
          const contents = await fetch(`/api/songs/${id}`)
            .then(response => response.json())
            .then(json => {
              if (albumSongList?.length <= album?.songList.length - 1) {
                albumSongList.push(json)
              }
            })
        }
      }
    }
  }
  React.useEffect(() => {
    if (albumSongList.length === album?.songList.length - 1){
      console.log("List filled");
      setTest2(true);
    }
    if(test2 === true){
      console.log("Test2 these nuts");
    }
    // if (albumSongList && test === true) {
    //   updatePlay_list(albumSongList)
    //   // updateCurrentSong(albumSongList[0]);
    //   updateQueuePosition(0)
    // }


  }, [test,test2])
  const handlePlayAlbum = () => {
    
      setTest(true)
      fetchAlbumSongs()
    
      setTimeout(() => {
        updatePlay_list(albumSongList)
        setTimeout(() => {
        updateCurrentSong(albumSongList[0]);
        updateQueuePosition(0)
        }, 400)
      }, 400)

    
  }
  // const navigate = useNavigate()
  // function redirectEditPlaylist () {
  //   navigate(`/editplaylist/${playlist._id}`)
  // }

  return (
    <section className='album-containter-ver2'>
      <div className='bg-fglass--1--playlist'>
        <div className='playlist--info'>
          <button className='playlist--playbtn' onClick={handlePlayAlbum}>
            <BsFillPlayFill className='playIconPlayList' />
          </button>
          {!done ? (
            <LoadingSearch />
          ) : (
            <div className='playlist--song--cover'>
              <img src={album && album.albumArt} alt='playlist' />
            </div>
          )}
          {!done ? (
            <LoadingSearch />
          ) : (
            <div className='playlist--stats--info'>
              <div className='playlist--release--info'>
                <h6>{album && album.releaseType}</h6>
                {/* <div className="playlist--release--filler--div">|</div><h5>2014</h5> */}
                <div className='playlist--release--filler--div'>|</div>
                <h4>By: {artist?.artistName}</h4>
              </div>
              <h3>{album && album.albumName}</h3>
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
              {albumSongList?.length === album?.songList.length &&
                albumSongList?.map((song, index) => {
                  //fetchAlbumSong(song);
                  // console.log(song.title);
                  return (
                    <li className='playlist--song--container'>
                      <h1>{index + 1}</h1>
                      <searchSongCard2 key={song._id} song={song} />

                      {/* <p className="hiddens">  {song._id}</p> */}
                      {/* 
                      <p> {song.title}</p> */}
                    </li>
                  )
                })}
            </ul>
          </div>
        )}
      </div>

      {/* <NavBar /> */}
    </section>
  )
}
