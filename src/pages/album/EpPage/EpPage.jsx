import React from 'react'

import './EpPage.css'
// import NavBar from './nav bar/NavBar';
// import epsongs from '../../../data/epsongs.json'
// import EpSong from './EpSong'

//fetching
import { useParams } from 'react-router-dom'

import LoadingSearch from '../../../components/loadingitems/loadingSearch/LoadingSearch'
import SearchSongCard2 from '../../../components/cards/search_items/searchSongCard/searchSongCard2'
import { MusicContext } from '../../../contexts/MusicContext'
import { Navigate, useNavigate, Link } from 'react-router-dom'
import { BsFillPlayFill } from 'react-icons/bs'
import { escapeSelector } from 'jquery'

import { BsPlay, BsPause } from 'react-icons/bs'

import AddPlaylist_ToQueue from "../../playlist/addPlaylist_ToQueue";
// User's Top Genres

export default function EpPage () {
  let { id } = useParams()
  console.log(id);
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

  const [ep, setEp] = React.useState(null);
  const [done, setDone] = React.useState(true);
  const [artist, setArtist] = React.useState(null);
  const [artistName, setArtistName] = React.useState(null);
  const [epSongList, setEpSongList] = React.useState([]);
  const [test, setTest] = React.useState(false);
  const [test2, setTest2] = React.useState(false);
  const [clicks, setClicks] = React.useState(0);
 

  React.useEffect(() => {
    // console.log()
    const fetchEp = async () => {
      const epResponse = await fetch(`/api/eps/${id}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      })
      const epJson = await epResponse.json()
      if (epResponse.ok) {
        setEp(epJson)
        console.log(epJson);
      } else {
        // setDone(false);
      }
    }

    fetchEp()
  }, [id])

  const handlePlayEp = () => {
    
      setTest(true)
      // fetchEpSongs()
    if(ep){
      setTimeout(() => {
        updatePlay_list(ep.songList)
        // console.log(epSongList)
        setTimeout(() => {
        updateCurrentSong(ep.songList[0]);
        updatePlay_listPosition(0)
        }, 200)
      }, 400)
    }
     

    
  }
  const togglePlayPause = () => {
    toggleIsPlay_G();
  }
console.log(ep);

  return (
    <section className='ep-containter-ver2'>
      <div className='bg-fglass--1--playlist ep'>
        <div className='playlist--info'>
        <div className='playPauseQueueBtnCont'>
          {clicks !== 0 && play_list === ep?.songList ? (
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
            handlePlayEp
            }>
            <BsFillPlayFill className='playIconPlayList'  />
          </button>
        )}
        <div>
          
        </div>
        <AddPlaylist_ToQueue input ={ep?.songList} className='AddPlaylist_ToQueue'/>
        </div>
          {!done ? (
            <LoadingSearch />
          ) : (
            <div className='playlist--song--cover'>
              <img src={ep && ep.epArt} alt='playlist' />
            </div>
          )}
          {!done ? (
            <LoadingSearch />
          ) : (
            <div className='playlist--stats--info'>
              <div className='playlist--release--info'>
                <h6>Ep</h6>
                {/* <div className="playlist--release--filler--div">|</div><h5>2014</h5> */}
                <div className='playlist--release--filler--div'>|</div>
                <h4>By: {ep?.artist?.artistName}</h4>
              </div>
              <h3>{ep && ep.epName}</h3>
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
            
              {ep &&
              <ul className='playlist--songlist--container'>
              {
                ep.songList.map((song, index) => {
                  //fetchEpSong(song);
                  // console.log(song.title);
                  return (
                    <li className='playlist--song--container'>
                      <h1>{index + 1}</h1>
                      <SearchSongCard2 key={song._id} song={song} />
                      {/* {song._id} */}
                    </li>
                  )
                })}
                </ul>
              }
            
          </div>
        )}
      </div>
      <div onLoad={handlePlayEp}>

</div>
    </section>
  )
}
