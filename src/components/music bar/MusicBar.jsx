import React, {
  useState,
  useRef,
  useEffect,
  createContext,
  useContext
} from 'react'
import { Navigate, useNavigate, Link } from 'react-router-dom'
import { Tooltip } from 'react-tooltip' //react tool tip used in explicit tag
import clearQueueBtn from './clearQueueBtn'
import CardSong from '../cards/card_song/CardSong'
import Queue_CardSong from '../cards/card_song/queue_CardSong'
import Song from '../../components/song detail/Song'

import styles from './AudioPlayer.module.css'
import './fullscreenMusicBar.css'
import './musicbar.css'

import { CgArrowLongRightR } from 'react-icons/cg'
import { CgArrowLongLeftR } from 'react-icons/cg'
import { BsPlayCircle, BsPauseCircle, BsSlashLg } from 'react-icons/bs'
import { MdExplicit, MdOutlineQueueMusic, MdQueueMusic } from 'react-icons/md'
import {
  BiVolumeFull,
  BiVolumeLow,
  BiVolume,
  BiVolumeMute,
  BiAddToQueue
} from 'react-icons/bi'
import {
  TbRepeatOff,
  TbRepeatOnce,
  TbRepeat,
  TbArrowsShuffle
} from 'react-icons/tb'
import { FaHeart, FaShareSquare, FaRegHeart, FaSlash } from 'react-icons/fa'
import NoSong from './NoSong.png'
import 'react-tooltip/dist/react-tooltip.css'
import { AiOutlineShareAlt } from 'react-icons/ai'
import HeartIcon from '../../assets/Trv_icons/Trv_likeIcon_outline.svg'
import { RiFolderMusicFill, RiFolderMusicLine } from 'react-icons/ri'
import { BsSkipStart, BsSkipEnd, BsPlay, BsPause } from 'react-icons/bs'
import {IoIosArrowDown} from 'react-icons/io'

// Hardcoded data
// import queue from '../../data/albumsongs.json'

import Trv_Chest from '../../assets/Trv_icons/Tvr_lib_icon.ico'
//
import { useLikeSong } from '../../hooks/user-hooks/useLikeSong'
import { useUnlikeSong } from '../../hooks/user-hooks/useUnlikeSong'

import { MusicContext } from '../../contexts/MusicContext'
import ClearQueueBtn from './clearQueueBtn'
import RemoveFromQueueBtn from "../QueueBtns/removeFromQueue";

const MusicBar = () => {
  const [newSong, setNewSong] = useState()
  // const isFullscreen = props.fcOptionIn;
  const [isFullscreen, setFullscreen] = useState(false)
  //context
  const {
    displayMusicBar,
    updateDisplayMusicBar,

    currentSong,
    updateCurrentSong,

    play_list,
    play_listPosition,
    updatePlay_list,
    clearPlay_list,
    updatePlay_listPosition,

    queue,
    queuePosition,
    advanceQueue,
    addToQueue,
    updateQueuePosition,
    clearQueue,

    loopLevel,
    updateLoopLevel,

    isPlay_Global,
    toggleIsPlay_G,
    setIsPlay_Global,
  } = React.useContext(MusicContext)
  //state
  //testing play/pause
  // const [isPlaying, setIsPlaying] = useState(false)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isLoaded, setIsLoaded] = useState(false)
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [volumeLevel, setVolumeLevel] = useState(0)
  const [isMuted, setIsMuted] = useState(true)
  //isMuted is totally screwed... but it works. So i'm just gonna leave it as it is <3 sorry if it's confusing (I don't actually know what's happening lol)
  const [prevVolume, updatePrevVol] = useState(0.5)
  const [isLiked, setIsLiked] = useState(false)
  const [isExplicit, setExplicit] = useState(true)
  const [loopState, setLoopState] = useState(0)
  const [isLooping, setLooping] = useState(false)
  const [isShuffle, setShuffle] = useState(false)

  const [hasPlay_List, setHasPlay_List] = useState(false)
  const [queueType, setQueueType] = useState(0)
  // const [play_ListPosition, setPlay_ListPosition] = useState(0);
  const [musicBarPlay_list, setMusicBarPlay_list] = useState([])
  const [list_length, setList_length] = useState(0)

  //refrences
  const audioPlayer = useRef() //reference audio component
  const progressBar = useRef() //reference progress bar
  const FCprogressBar = useRef() //reference FCprogress bar two running always to be swapped between
  const animationRef = useRef() //reference progress bar 'before'
  const volumeRef = useRef() //reference volume bar

  useEffect(() => {
    if (currentSong) {
      if (isLoaded === false) {
        audioPlayer?.current?.pause()
        setLoopState(0)
      }
      //Maybe use another context file to update the music context file.
      //current song or something? Idk writing this down for future testing
      if (hasPlay_List === false) {
        if (musicBarPlay_list.length === 0) {
          console.log('no playlist')
          updatePlay_list(play_list)
          console.log(play_list)
          // console.log(queue);
        } else {
          setHasPlay_List(true)
        }
      } else {
      }

      const seconds = Math.floor(audioPlayer?.current?.duration)
      setDuration(seconds) // 45.26
      progressBar.current.max = seconds
      FCprogressBar.current.max = seconds
    }
  }, [audioPlayer?.current?.loadedmetadata, audioPlayer?.current?.readyState])

  // Music Player Functions
  const calculateTime = secs => {
    const minutes = Math.floor(secs / 60)
    const returnedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`
    const seconds = Math.floor(secs % 60)
    const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`

    return `${returnedMinutes} : ${returnedSeconds}`
  }

  useEffect(() => {
    changeVolumeLevel();

    if(isPlay_Global === true){
      console.log("isPlay_Global : true (in musicBar useEffect)")
      audioPlayer.current.play()
    } else {
      console.log("isPlay_Global : false (in musicBar useEffect)")
      audioPlayer.current.pause()
      cancelAnimationFrame(animationRef.current)
    }


  },[isPlay_Global])
  const togglePlayPause = () => {
    toggleIsPlay_G();
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
    progressBar.current.value = 0
    FCprogressBar.current.value = 0
    audioPlayer.current.currentTime = 0
    audioPlayer.current.currentTime = 0
    changePlayerCurrentTime()
    setTimeout(() => {
      document.getElementById('playPauseBtn').click()
    }, 500)
  }

  const whilePlaying = () => {
    if (displayMusicBar === false && isPlaying === true) {
      // togglePlayPause();
      audioPlayer.current.volume = 0
      audioPlayer.current.pause()
      cancelAnimationFrame(animationRef.current)
      return
    } else if (displayMusicBar == false) {
      return
    }
    if (isPlaying === true) {
      // progressBar.current?.value = audioPlayer.current.currentTime;
      FCprogressBar.current.value = audioPlayer?.current?.currentTime
      changePlayerCurrentTime()
      //animationRef.current = requestAnimationFrame(whilePlaying) //potential memory leak
    } else {
    }
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
    setCurrentTime(FCprogressBar.current.value)
  }

  const changeVolumeLevel = () => {
    setIsMuted(true)
    // console.log(audioPlayer.current.volume);
    // console.log(volumeRef.current.value);
    audioPlayer.current.volume = volumeRef.current.value / 100
  }

  const changeLoopLevel = () => {
    const currentLoopLvl = loopLevel
    const newLooplvl = currentLoopLvl + 1
    switch (newLooplvl) {
      case 1:
        // Loop album
        updateLoopLevel(newLooplvl)
        break
      case 2:
        // Loop song
        setLooping(true)
        updateLoopLevel(newLooplvl)
        break
      default:
        console.log(`default`)
        updateLoopLevel(1)
    }
  }
  const shareSong = () => {
    console.log(`share btn`)
  }


  const userID = JSON.parse(localStorage.getItem("user")) ? JSON.parse(localStorage.getItem("user")).id : null;

  const [userInfo, setUserInfo] = useState([]);

  

  // Fetches the like song data
    const fetchUserInfo = async () => {
      const response = await fetch(`/api/users/${userID}`);
      const data = await response.json();
      setUserInfo(data);



    
      let likedata = userInfo.likedSongs;
  
      // sets the song to show the correct value when changeing between songs
      if(currentSong){
        let myValue = currentSong._id;

      if (likedata.some(item => item._id === myValue)) {
        
        
        setIsLiked(true)
      } else {
        
        
        setIsLiked(false)
      }
      
    }
    };
    

  
  React.useEffect(() => {
    
    
    fetchUserInfo();
    
  }, [currentSong]);


  const { like, likeError, likeIsLoading } = useLikeSong()
  const { unlike, unlikeError, unlikeIsLoading } = useUnlikeSong()


  //toggels when a song is liked when the like / dislike function is clicked in the music player
  const toggleLiked = () => {
    
    if (!isLiked) {
      like()
      setIsLiked(true)
      
    } else {
      
      unlike()
      setIsLiked(false)
    }
  
  }
  const handleRewind = () => {
    const currentTimeInSong = audioPlayer.current.currentTime

    if (currentTimeInSong < 5) {
      console.log(`rewind to prev`)

      if (play_listPosition === 0) {
        toBeginningOfSong()
        console.log('at start of playlist')
        // updateQueuePosition(0);
      } else {
        try {
          updatePlay_listPosition(play_listPosition - 1)
          // updateCurrentSong(play_list[queuePosition]);
        } catch {
          console.error('Cannot decrement futher')
        }
      }
    } else {
      console.log(`rewind to 0`)
      if (isPlaying === true) {
        document.getElementById('playPauseBtn').click()
      }
      toBeginningOfSong()
    }
    // updateSong();
  }
  const handleForward = () => {
    console.log('forward!')
    if (loopLevel === 2) {
      toBeginningOfSong()
      togglePlayPause()
      return;
    }
    if (queue.length > 0) {
      if(queue.length === 1){
        if(currentSong._id === queue[0]._id ){
          clearQueue();
          updatePlay_listPosition(play_listPosition);
          return;
        }else {
          advanceQueue();
        }
       
      }
      if(currentSong._id === queue[0]._id && currentSong._id === queue[1]._id){
        console.log(currentSong._id + " qp1 " + queue[0]._id );
        console.log(currentSong._id + " qp2 " + queue[1]._id);
        advanceQueue();
        return;
      }
      
      console.log('queue has songs') 
      console.log(queue.length)
      advanceQueue() 
      
    } 
    else{
      if (play_list.length === play_listPosition + 1) {
        console.log('at end of playlist')
        if (loopLevel === 1) {
          console.log('loop is on - restarting play_list')
          updatePlay_listPosition(0)
        }
      } else if (play_listPosition === 0) {
        updatePlay_listPosition(1)
        // updateCurrentSong(play_list[queuePosition]);
      } else {
        try {
          updatePlay_listPosition(play_listPosition + 1)
          // updateCurrentSong(play_list[queuePosition]);
        } catch {
          console.error('Cannot increment futher')
        }
      }
      console.log(play_listPosition)
      // updateSong();
    }
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
      <>
      
        <audio
          loop={isLooping}
          ref={audioPlayer}
          src={currentSong?.songUrl}
          preload='metadata'
          autoPlay='true'
          id='audio'
          onChange={() => {
            changeRange()
            // animationRef.current = requestAnimationFrame(whilePlaying);
          }}
          onLoadedMetadata={() => {
            updateDisplayMusicBar(true)
            setLoopState(0)
            setIsLoaded(true)
            toBeginningOfSong()
            changeRange()
            // animationRef.current = requestAnimationFrame(whilePlaying);
            toBeginningOfSong()
            if(isPlay_Global === false){
              togglePlayPause()
            }
            
            
          }}
          // onLoadedData = {
          //   (animationRef.current = requestAnimationFrame(whilePlaying))
          // }
          onEnded={() => {
            // (animationRef.current = requestAnimationFrame(whilePlaying))
            handleForward()
          }}
          onTimeUpdate={() => {
            (animationRef.current = requestAnimationFrame(whilePlaying))
            
          }}

          
        ></audio>

        {/* Full Screen / Queue */}
        <div
          className={isFullscreen === true ? 'fullscreenMusicBar' : 'hidden'}
        >
          <div className='fullsc-musicbar-wrap'>
            {/* Attempting to change on scroll */}
            <h2>Currently Playing</h2>
            <div id='fcplayerbox' className='fullscreen-player-info-container '>
              <button
                className='FCplaybtnstyle'
                id='playPauseBtn'
                onClick={togglePlayPause}
              >
                {isPlaying ? <BsPause /> : <BsPlay className='BsPlayStyleLg' />}
              </button>

              <div className='fullscreen-song-img '>
                <div className='fullscreen-img'>
                  <img src={currentSong?.imgUrl}></img>
                </div>
                <button className='exitBtn' onClick={toggleFC}>
                  <IoIosArrowDown className='exitItem'/>
                </button>
                <div className='fullscreen-song-txt-container-container '>
                  <div className='fullscreen-song-info-txt-container'>
                    <div className='fc-song-txt'>
                      <a>{currentSong?.title}</a>
                    </div>
                    <div className='fc-artist-txt'>
                      <a>{currentSong?.artist?.artistName}</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='queueBtnsCont'>
              <ClearQueueBtn />
            </div>
            {/* Queue & Play_list */}
            <div className='brihgleggmoie'>
              <h6 className='queueHeader bg-fglass-b'>Song Queue:</h6>
              <div className='queueContainerV2'>
                {queue &&
                  queue.map((song, index) => {
                    if (
                      index === 0 &&
                      currentSong?._id === song?._id
                    ) {
                      return;
                    } else {
                      if (queue.length === 0) {
                        console.log('empty')
                        return;
                      }else if(currentSong?._id === queue?._id) {
                        // console.log(queue[0]);
                        return;
                      }
                      // console.log(index + ' Queue Song: ' + song._id)
                      // return;
                      return (
                        <div className='inactiveSong-Q-card bg-Q-card hoverCardCss'>
                          <Queue_CardSong
                            key={song?._id}
                            song={song}
                            index={index -1}
                          />
                          <RemoveFromQueueBtn index={index}/>
                        </div>
                      )
                    }
                  })}
                {play_list => {
                  return (
                    <div className='mytrove-splitter'>
                      <h2>Play_List</h2>
                    </div>
                  )
                }}

                {play_list &&
                  play_list.map((song, index) => {
                    // console.log("play_listPos: " + play_ListPosition + " index " + index )
                    if (index < play_listPosition) {
                      return;
                    }  else {
                      if(currentSong?._id !== play_list[index]?._id){
                        return (
                          <div className='inactiveSong-Q-card bg-fglass-b hoverCardCss'>
                            <Queue_CardSong
                              key={song?._id}
                              song={song}
                              index={index}
                            />
                          </div>
                        )
                      }
                      
                    }
                  })}
              </div>
            </div>
          </div>
        </div>

        {/* Regular Player */}
        
        <div
          className={
            displayMusicBar === true
              ? 'player-container musicbar'
              : 'player-container musicbar '
          }
        >
          {/* transform: translateY(200px); */}
          <div
            className={
              displayMusicBar === true
                ? 'musicbar-wrap bg-trv-sm-Play-bg '
                : 'musicbar-wrap bg-trve-sm-Play-bg translate-down '
            }
          >
            {/* This style is in the fullscreen css file - idk there was a bug <3 */}

            <div className='volumeContainter-ver2'>
              <input
                type='range'
                ref={volumeRef}
                defaultValue='50'
                className='volumeBar'
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
              <a className='progress-time-time-container ord1'>
                {calculateTime(currentTime)}
              </a>

              <div
                className='progressbarContainer-ver2 '
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
              <a className='progress-time-time-container ord3'>
                {duration && !isNaN(duration) && calculateTime(duration)}
              </a>
            </div>

            <div className='player-info-container-ver2 '>
              {/*  */}
              <div className='like-btn '>
                <button onClick={() => {toggleLiked();}}>
                  {isLiked ? (
                    <FaHeart className='text-white' />
                  ) : (
                    <FaRegHeart />
                  )}
                </button>
              </div>

              <div className='song-img '>
                <img src={currentSong?.imgUrl} onClick={toggleFC}></img>
              </div>

              <div className='song-txt-container-container '>
                <div className='song-info-txt-container' onClick={toggleFC}>
                  <div className='song-txt'>
                    <a>{currentSong?.title}</a>
                  </div>
                  <div className='artist-txt'>
                    <a onClick={redirectArtist} id='artistTextLink'>
                      {currentSong?.artist?.artistName}
                    </a>
                  </div>
                </div>
              </div>

              <div className='control-container'>
                <button onClick={handleRewind}>
                  <BsSkipStart />
                </button>
                <button
                  className='playbtnstyle'
                  id='playPauseBtn'
                  onClick={() => {togglePlayPause();  }}
                >
                  {isPlay_Global ? (
                    <BsPause />
                  ) : (
                    <BsPlay className='BsPlayStyleLg' />
                  )}
                </button>
                <button onClick={handleForward}>
                  <BsSkipEnd />
                </button>
              </div>
              <div className='fillerDivPlayer'></div>
              {/* Loop and Queue */}
              <div className='otherItemBtnContainer'>
                {/* import {TbRepeatOff, TbRepeatOnce, TbRepeat} from 'react-icons/tb' */}
                <button
                  className={loopLevel === 0 ? 'loopBtn' : 'hiddenBtn'}
                  onClick={changeLoopLevel}
                >
                  <TbRepeatOff className='loopLvl1' />
                </button>
                <button
                  className={loopLevel === 1 ? 'loopBtn' : 'hiddenBtn'}
                  onClick={changeLoopLevel}
                >
                  <TbRepeat className='loopLvl2' />
                </button>
                <button
                  className={loopLevel === 2 ? 'loopBtn' : 'hiddenBtn'}
                  onClick={() => updateLoopLevel(0)}
                  onMouseDown={() => setLooping(false)}
                  // onMouseUp={() => console.log(isLooping)}
                >
                  <TbRepeatOnce className='loopLvl3' />
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
    </>
  )
}

export default MusicBar
