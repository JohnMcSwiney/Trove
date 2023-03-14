import React, {
  useState,
  useRef,
  useEffect,
  createContext,
  useContext
} from 'react'
import { Navigate, useNavigate, Link } from 'react-router-dom'
import { Tooltip } from 'react-tooltip' //react tool tip used in explicit tag

import CardSong from '../cards/card_song/CardSong'
import Song from '../../components/song detail/Song';

import { MusicContext } from '../../contexts/MusicContext'

import styles from './AudioPlayer.module.css'
import './fullscreenMusicBar.css'
import './musicbar.css'

import { CgArrowLongRightR } from 'react-icons/cg'
import { CgArrowLongLeftR } from 'react-icons/cg'
import { BsPlayCircle } from 'react-icons/bs'
import { BsPauseCircle } from 'react-icons/bs'
import { MdExplicit, MdOutlineQueueMusic } from 'react-icons/md'
import {
  BiVolumeFull,
  BiVolumeLow,
  BiVolume,
  BiVolumeMute
} from 'react-icons/bi'
import { FaHeart, FaShareSquare, FaRegHeart } from 'react-icons/fa'
import NoSong from './NoSong.png'
import 'react-tooltip/dist/react-tooltip.css'
import { AiOutlineShareAlt } from 'react-icons/ai'
import HeartIcon from '../../assets/Trv_icons/Trv_likeIcon_outline.svg'
import { RiFolderMusicFill, RiFolderMusicLine } from 'react-icons/ri'
import { BsSkipStart, BsSkipEnd, BsPlay, BsPause } from 'react-icons/bs'

// Hardcoded data
import queue from '../../data/albumsongs.json'

import Trv_Chest from '../../assets/Trv_icons/Tvr_lib_icon.ico'

const MusicBar = () => {
  const [newSong, setNewSong] = useState();
  // const isFullscreen = props.fcOptionIn;
  const [isFullscreen, setFullscreen] = useState(false)
  //context
  const { currentSong, currentSongData, playlists } = React.useContext(MusicContext)
  //state
  const [isPlaying, setIsPlaying] = useState(false)
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [volumeLevel, setVolumeLevel] = useState(0)
  const [isMuted, setIsMuted] = useState(true)
  //isMuted is totally screwed... but it works. So i'm just gonna leave it as it is <3 sorry if it's confusing (I don't actually know what's happening lol)
  const [prevVolume, updatePrevVol] = useState(0.5)
  const [isLiked, setIsLiked] = useState(false)
  const [isExplicit, setExplicit] = useState(true)

  //refrences
  const audioPlayer = useRef() //reference audio component
  const progressBar = useRef() //reference progress bar
  const FCprogressBar = useRef() //reference progress bar
  const animationRef = useRef()
  const volumeRef = useRef()
  
  


  // const { currentSong, updateCurrentSong, currentSongData } =
  //   React.useContext(MusicContext);
  // const [currentSongforPlayer, setCurrentSongforPlayer] = React.useState(null);
  

  // const handlePlaySong = () => {
  //   if (currentSong && currentSong._id === song._id) {
  //     updateCurrentSong(null);

  //   } else {
  //     updateCurrentSong(song);
  //     currentSongData(song); // added songData to pass song's data

  //   }
  // };
  // const updateSong = () =>{
  //   console.log("updateSong Method");
  //   try{
  //     // setNewSong(currentSong);
  //   } catch{
  //     console.log("error thrown");
  //   }
    
  // }

  // try{
  //   console.log("contextFile ID: " + currentSong._id);

  //   if (!newSong || newSong === null){
  //     console.log("newSong is Null");
  //     updateSong();
  //   }else{
  //     // console.log(newSong._id + " his ass not null c???!?!??!??!!!?!");
  //   }
  // } catch{
  //   console.log("newSongID: error ");
  // }
 
  
   

  useEffect(() => {
    const seconds = Math.floor(audioPlayer.current.duration)
    setDuration(seconds) // 45.26
    progressBar.current.max = seconds
    FCprogressBar.current.max = seconds
    // const oldid = this.newSong.title
    // if (oldid != null && oldid === currentSong._id){
    //   try{
    //     console.log(newSong.title);
    //   } catch{
    //     console.log("new Song not updated");
    //   }
    // }
    
  }, [audioPlayer?.current?.loadedmetadata, audioPlayer?.current?.readyState])

  // 


  // Music Player Functions
  const calculateTime = secs => {
    const minutes = Math.floor(secs / 60)
    const returnedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`
    const seconds = Math.floor(secs % 60)
    const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`

    return `${returnedMinutes} : ${returnedSeconds}`
  }

  const togglePlayPause = () => {
    const prevValue = isPlaying
    setIsPlaying(!prevValue)
    changeVolumeLevel()
    if (!prevValue) {
      audioPlayer.current.play()
      animationRef.current = requestAnimationFrame(whilePlaying) //fix this
    } else {
      audioPlayer.current.pause()
      cancelAnimationFrame(animationRef.current)
    }
  }

  const toggleMute = () => {
    const prevValue = isMuted
    updatePrevVol(audioPlayer.current.volume)
    setIsMuted(!prevValue)
    if (!prevValue) {
      console.log(`isMuted ` + isMuted)
      console.log(`unmuting!`)
      // console.log(`previous vol: ` + prevVolume);
      audioPlayer.current.volume = prevVolume
      setVolumeLevel(audioPlayer.current.volume)
      volumeRef.current.value = prevVolume * 100
      // console.log(`current vol:` + (volumeLevel * 1000));
    } else {
      console.log(`isMuted ` + isMuted)
      console.log(`muting!`)
      // console.log(`previous vol: ` + volumeLevel);
      audioPlayer.current.volume = 0
      setVolumeLevel(0)
      volumeRef.current.value = 0
      // console.log(`current vol:` + volumeLevel);
    }
  }

  const whilePlaying = () => {
    progressBar.current.value = audioPlayer.current.currentTime
    FCprogressBar.current.value = audioPlayer.current.currentTime
    changePlayerCurrentTime()
    animationRef.current = requestAnimationFrame(whilePlaying) //potential memory leak
  }

  const changeRange = () => {
    audioPlayer.current.currentTime = progressBar.current.value

    audioPlayer.current.currentTime = FCprogressBar.current.value
    changePlayerCurrentTime()
  }

  const changePlayerCurrentTime = () => {
    FCprogressBar.current.style.setProperty(
      '--seek-before-width',
      `${(FCprogressBar.current.value / duration) * 100}%`
    )

    progressBar.current.style.setProperty(
      '--seek-before-width',
      `${(progressBar.current.value / duration) * 100}%`
    )
    setCurrentTime(progressBar.current.value)
  }

  const changeVolumeLevel = () => {
    setIsMuted(true)
    // console.log(audioPlayer.current.volume);
    // console.log(volumeRef.current.value);
    audioPlayer.current.volume = volumeRef.current.value / 100
  }
  const shareSong = () => {
    console.log(`share btn`)
  }
  const showQueue = () => {
    console.log(`show queue`)
  }

  const toggleLiked = () => {
    setIsLiked(!isLiked)
  }
  const toggleFC = event => {
    // if the user clickson the artist name it's ignored
    if (event.target.id == 'artistTextLink') {
      // ignored and the Navigate function takes over
    } else {
      setFullscreen(!isFullscreen)
    }
  }

  const navigate = useNavigate()
  const redirectArtist = () => {
    navigate(`./artist/${currentSong.artist._id}`)
  }

  return (
    <>
      {
        <>
          <audio
            ref={audioPlayer}
            src={currentSong?.songUrl}
            preload='metadata'
            onChange={() => {
              changeRange()
              animationRef.current = requestAnimationFrame(whilePlaying)
            }}
            onLoadedMetadata={() => {
                setIsPlaying(true);
              
              animationRef.current = requestAnimationFrame(whilePlaying)
            }}
          ></audio>

          {/* Full Screen */}
          <div
            className={isFullscreen === true ? 'fullscreenMusicBar' : 'hidden'}
          >
            <div className='fullsc-musicbar-wrap bg-trv-sm-Play-bg'>
              {/* Attempting to change on scroll */}
              <div
                id='fcplayerbox'
                className='fullscreen-player-info-container '
              >
                {/* Progress Bar */}
                <div
                  className='fullscreen-progressbarContainer'
                  onMouseDown={toggleMute}
                  onMouseUp={toggleMute}
                >
                  <input
                    className='fullscreen-progressBar'
                    type='range'
                    ref={FCprogressBar}
                    defaultValue='0 '
                    onMouseDown={togglePlayPause}
                    onMouseUp={togglePlayPause}
                    onChange={changeRange}
                  />
                </div>
                {/*  */}

                <div className='fullscreen-song-img '>
                  <img src={currentSong?.imgUrl} className='fullscreen-img'></img>

                  <button className='exitBtn' onClick={toggleFC}>
                    x
                  </button>

                  {/* {obj.explicit ? (
                    <div className="explicit-containter">
                      <MdExplicit
                        data-tooltip-id="my-tooltip"
                        data-tooltip-content={
                          "Explicit: This song includes prophane language"
                        }
                        className="explicitActions"
                        data-tooltip-variant="light"
                      />
                      <Tooltip
                        className="tooltip-style"
                        place="bottom"
                        id="my-tooltip"
                        delayShow={100}
                      />
                    </div>
                  ) : (
                    <p />
                  )} */}
                  {/* explicit-containter */}
                </div>

                <div className='fullscreen-song-txt-container-container '>
                  <div className='like-btn '>
                    <button onClick={toggleLiked}>
                      {isLiked ? (
                        <FaHeart className='text-white' />
                      ) : (
                        <FaRegHeart />
                      )}
                    </button>
                  </div>
                  <div className='fullscreen-song-info-txt-container'>
                    <div className='fc-song-txt'>
                      <a>{currentSong?.title}</a>
                    </div>
                    <div className='fc-artist-txt'>
                      <a>{currentSong?.artist.artistName}</a>
                    </div>
                  </div>
                  <div className='like-btn'>
                    <button onClick={toggleLiked}>
                      <AiOutlineShareAlt />
                    </button>
                  </div>
                </div>

                <div className='fullscreen-control-container'>
                  <button className='fullscreen-mediabtn1'>
                    <BsSkipStart />
                  </button>
                  <button
                    className='fullscreen-playbtnstyle'
                    onClick={togglePlayPause}
                  >
                    {isPlaying ? (
                      <BsPause />
                    ) : (
                      <BsPlay className='FullscreenBsPlayStyleLg' />
                    )}
                  </button>
                  <button className='fullscreen-mediabtn1'>
                    <BsSkipEnd />
                  </button>
                </div>
              </div>
              {/* Queue */}
              <div className='brihgleggmoie'>
                <h6 className='queueHeader'>Song Queue:</h6>
                {queue &&
                  queue.map((item, index) => {
                    return <CardSong key={index} {...item} />
                  })}
              </div>
              <div className='volumeContainter'>
                <button onClick={toggleMute}>
                  {isMuted ? <BiVolumeFull /> : <BiVolumeMute />}
                </button>
                <input
                  type='range'
                  ref={volumeRef}
                  defaultValue='50'
                  onChange={changeVolumeLevel}
                  min='0'
                  max='100'
                  step='5'
                ></input>
              </div>
            </div>
          </div>

          {/* Regular Player */}
          <div
            className={
              isFullscreen === false ? 'player-container musicbar' : 'hidden'
            }
          >
            <div className='musicbar-wrap bg-trv-sm-Play-bg'>
              {/* This style is in the fullscreen css file - idk there was a bug <3 */}
              <button className='fcBtn' onClick={toggleFC}></button>
              {/* Progress Bar */}
              <div
                className='progressbarContainer'
                onMouseDown={toggleMute}
                onMouseUp={toggleMute}
              >
                <input
                  className='progressBar'
                  type='range'
                  ref={progressBar}
                  defaultValue='0 '
                  onMouseDown={togglePlayPause}
                  onMouseUp={togglePlayPause}
                  onChange={changeRange}
                />
              </div>

              <div className='player-info-container '>
                {/*  */}
                <div className='like-btn '>
                  <button onClick={toggleLiked}>
                    {isLiked ? (
                      <FaHeart className='text-white' />
                    ) : (
                      <FaRegHeart />
                    )}
                  </button>
                </div>

                <div className='song-img '>
                  <img src={currentSong?.imgUrl} onClick={toggleFC}></img>
                  {/* {obj.explicit ? (
                    <div className="explicit-containter">
                      <MdExplicit
                        data-tooltip-id="my-tooltip"
                        data-tooltip-content={
                          "Explicit: This song includes prophane language"
                        }
                        className="explicitActions"
                        data-tooltip-variant="light"
                      />
                      <Tooltip
                        className="tooltip-style"
                        place="bottom"
                        id="my-tooltip"
                        delayShow={100}
                      />
                    </div>
                  ) : (
                    <p />
                  )} */}
                  {/* explicit-containter */}
                </div>

                <div className='song-txt-container-container '>
                  <div className='song-info-txt-container' onClick={toggleFC}>
                    <div className='song-txt'><a>{currentSong?.title}</a></div>
                    <div className='artist-txt'>
                      <a onClick={redirectArtist} id='artistTextLink'>
                        {currentSong?.artist.artistName}
                      </a>
                    </div>
                  </div>
                </div>

                <div className='control-container'>
                  <button>
                    <BsSkipStart />
                  </button>
                  <button className='playbtnstyle' onClick={togglePlayPause}>
                    {isPlaying ? (
                      <BsPause />
                    ) : (
                      <BsPlay className='BsPlayStyleLg' />
                    )}
                  </button>
                  <button>
                    <BsSkipEnd />
                  </button>
                </div>
                <div className='fillerDivPlayer'></div>
              </div>

              <div className='volumeContainter'>
                <button onClick={toggleMute}>
                  {isMuted ? <BiVolumeFull /> : <BiVolumeMute />}
                </button>
                <input
                  type='range'
                  ref={volumeRef}
                  defaultValue='50'
                  onChange={changeVolumeLevel}
                  min='0'
                  max='100'
                  step='5'
                ></input>
              </div>
            </div>
          </div>
        </>
      }
    </>
  )
}

export default MusicBar
