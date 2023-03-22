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
import Song from '../../components/song detail/Song'

import styles from './AudioPlayer.module.css'
import './fullscreenMusicBar.css'
import './musicbar.css'

import { CgArrowLongRightR } from 'react-icons/cg'
import { CgArrowLongLeftR } from 'react-icons/cg'
import { BsPlayCircle } from 'react-icons/bs'
import { BsPauseCircle } from 'react-icons/bs'
import { MdExplicit, MdOutlineQueueMusic, MdQueueMusic } from 'react-icons/md'
import {
  BiVolumeFull,
  BiVolumeLow,
  BiVolume,
  BiVolumeMute,
  BiAddToQueue
} from 'react-icons/bi'
import {TbRepeatOff, TbRepeatOnce, TbRepeat} from 'react-icons/tb'
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
//
import { useLikeSong } from '../../hooks/user-hooks/useLikeSong'
import { useUnlikeSong } from '../../hooks/user-hooks/useUnlikeSong'

import { MusicContext } from '../../contexts/MusicContext'

const MusicBar = () => {
  const [newSong, setNewSong] = useState()
  // const isFullscreen = props.fcOptionIn;
  const [isFullscreen, setFullscreen] = useState(false)
  //context
  const { currentSong, currentSongData, playlists } =
    React.useContext(MusicContext)
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
  const [loopState, setLoopState] = useState(0)
  const [isLooping, setLooping] = useState(true)
  //refrences
  const audioPlayer = useRef() //reference audio component
  const progressBar = useRef() //reference progress bar
  const FCprogressBar = useRef() //reference progress bar
  const animationRef = useRef()
  const volumeRef = useRef()


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
  const toBeginningOfSong = () => {
    progressBar.current.value = 0;
    FCprogressBar.current.value = 0;
    audioPlayer.current.currentTime = 0;
    audioPlayer.current.currentTime = 0;
    changePlayerCurrentTime()
    setTimeout(() => {
      document.getElementById('playPauseBtn').click();
    }, 500)
      
    
    
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
  const changeLoopLevel = () => {
    
    const currentLoopLvl = loopState;
    const newLooplvl = currentLoopLvl + 1;
    switch (newLooplvl) {
      case 1:
        // Loop album
        setLoopState(newLooplvl);
        break;
      case 2:
        // Loop song
        setLooping(true);
        setLoopState(newLooplvl);
        break;
      default:
        console.log(`default`);
        setLoopState(1)
    }
  }
  const shareSong = () => {
    console.log(`share btn`)
  }
  const showQueue = () => {
    console.log(`show queue`)
  }

  const { like, likeError, likeIsLoading } = useLikeSong()
  const { unlike, unlikeError, unlikeIsLoading } = useUnlikeSong()
  const toggleLiked = () => {
    setIsLiked(!isLiked)
    if (!isLiked) {
      like()
    } else {
      unlike()
    }
  }
  const handleRewind = () => {
    const currentTimeInSong = audioPlayer.current.currentTime;
    
    if (currentTimeInSong < 5) {
        console.log(`rewind to prev`)
    } else {
        console.log(`rewind to 0`)
        if (isPlaying === true) {
          document.getElementById('playPauseBtn').click();
        }
        toBeginningOfSong();
    }
    
  }
  const handleForward = () => {
    console.log('forward')
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
    navigate(`/artist/${currentSong.artist._id}`)
  }

  // Like and dislike function

  const fetchUnlike = async () => {
    const response = await fetch(`/api/songs/removelike/${currentSong._id}`, {
      method: 'POST'
    })
    const json = response.json()
  }

  return (
    <>
      {
        <>
          <audio
            loop={isLooping}
            ref={audioPlayer}
            src={currentSong?.songUrl}
            preload='metadata'
            autoPlay='true'
            onChange={() => {
              // changeRange()
              animationRef.current = requestAnimationFrame(whilePlaying)
            }}
            onLoadedMetadata={() => {
              toBeginningOfSong()
              changeRange()
              setIsPlaying(true)
              animationRef.current = requestAnimationFrame(whilePlaying)
            }}
            isPlaying={animationRef.current = requestAnimationFrame(whilePlaying)}
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

                {/* <div
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
                </div> */}
                {/*  */}
                <h2>Currently Playing</h2>
                <div className='fullscreen-song-img '>
                  <img
                    src={currentSong?.imgUrl}
                    className='fullscreen-img'
                  ></img>

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
                  {/* <div className='like-btn '>
                    <button onClick={toggleLiked}>
                      {isLiked ? (
                        <div>
                          <FaHeart className='text-white' />
                        </div>
                      ) : (
                        <div>
                          <FaRegHeart />

                        </div>
                      )}
                    </button>
                  </div> */}
                  <div className='fullscreen-song-info-txt-container'>
                    <div className='fc-song-txt'>
                      <a>{currentSong?.title}</a>
                    </div>
                    <div className='fc-artist-txt'>
                      <a>{currentSong?.artist.artistName}</a>
                    </div>
                  </div>
                  {/* <div className='like-btn'>
                    <button onClick={toggleLiked}>
                      <AiOutlineShareAlt />
                    </button>
                  </div> */}
                </div>
                {/* 
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
                </div> */}
              </div>
              {/* Queue */}
              <div className='brihgleggmoie'>
                <h6 className='queueHeader'>Song Queue:</h6>
                {queue &&
                  queue.map((item, index) => {
                    return <CardSong key={index} {...item} />
                  })}
              </div>
              {/* <div className='volumeContainter'>
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
              </div> */}
            </div>
          </div>

          {/* Regular Player */}
          <div
            className={
              isFullscreen === false
                ? 'player-container musicbar'
                : 'player-container musicbar'
            }
          >
            <div className='musicbar-wrap bg-trv-sm-Play-bg'>
              {/* This style is in the fullscreen css file - idk there was a bug <3 */}

              <div className='volumeContainter-ver2'>
                <input
                  type='range'
                  ref={volumeRef}
                  defaultValue='50'
                  onChange={changeVolumeLevel}
                  min='0'
                  max='100'
                  step='5'
                ></input>
                <button onClick={toggleMute}>
                  {isMuted ? <BiVolumeFull /> : <BiVolumeMute />}
                </button>
              </div>

              {/* Progress Bar */}
              {/* time visible on fullscreen*/}
              <div className='progress-time-container'>
                <div className='player-time-time-container-1'>
                  {calculateTime(currentTime)}
                </div>

                <div
                  className='progressbarContainer '
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

                <div className='player-time-time-container-2'>
                  {duration && !isNaN(duration) && calculateTime(duration)}
                </div>
              </div>

              <div className='player-info-container-ver2 '>
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
                    <div className='song-txt'>
                      <a>{currentSong?.title}</a>
                    </div>
                    <div className='artist-txt'>
                      <a onClick={redirectArtist} id='artistTextLink'>
                        {currentSong?.artist.artistName}
                      </a>
                    </div>
                  </div>
                </div>

                <div className='control-container'>
                  <button onClick={handleRewind}>
                    <BsSkipStart />
                  </button>
                  <button className='playbtnstyle' id='playPauseBtn' onClick={togglePlayPause}>
                    {isPlaying ? (
                      <BsPause />
                    ) : (
                      <BsPlay className='BsPlayStyleLg' />
                    )}
                  </button>
                  <button onClick={handleForward}>
                    <BsSkipEnd />
                  </button>
                </div>
                {/* Loop and Queue */}
                <div className='otherItemBtnContainer'>
                {/* import {TbRepeatOff, TbRepeatOnce, TbRepeat} from 'react-icons/tb' */}
                  <button className={loopState === 0 ? "loopBtn loopLvl1" : "hiddenBtn"} onClick={changeLoopLevel}>
                      <TbRepeatOff/>
                  </button>
                  <button className={loopState === 1 ? "loopBtn loopLvl2" : "hiddenBtn"} onClick={changeLoopLevel}>
                      <TbRepeat/>
                  </button>
                  <button className={loopState === 2 ? "loopBtn loopLvl2" : "hiddenBtn"} 
                  onClick={() => setLoopState(0)}
                  onMouseDown={() => setLooping(false)}
                  // onMouseUp={() => console.log(isLooping)}
                  >
                      <TbRepeatOnce/>
                  </button>
                  <button className='fcBtn' onClick={toggleFC}>
                    Queue
                    <MdQueueMusic className='queueMusicIcon' />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      }
    </>
  )
}

export default MusicBar
