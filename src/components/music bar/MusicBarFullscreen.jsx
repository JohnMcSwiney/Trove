import React, { useState, useRef, useEffect } from 'react'
import styles from './AudioPlayer.module.css'
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
import { AiOutlineShareAlt } from 'react-icons/ai'
import { FaHeart, FaShareSquare, FaRegHeart } from 'react-icons/fa'
import NoSong from './NoSong.png'

import 'react-tooltip/dist/react-tooltip.css'
import HeartIcon from '../../assets/Trv_icons/Trv_likeIcon_outline.svg'
import { RiFolderMusicFill, RiFolderMusicLine } from 'react-icons/ri'
import { BsSkipStart, BsSkipEnd, BsPlay, BsPause } from 'react-icons/bs'

import { Tooltip } from 'react-tooltip' //react tool tip used in explicit tag
import CardSong from '../cards/card_song/CardSong';
import './fullscreenMusicBar.css';

import Trv_Chest from '../../assets/Trv_icons/Tvr_lib_icon.ico'

// Hardcoded data
import queue from "../../data/albumsongs.json"

const json = `
{
    "artist": "Ice Cube",
    "title": "It Was A Good Day",
    "content_type": "audio/mp3",
    "song_url": "https://storage.googleapis.com/trv_test/TroveMusic/rap/ice_cube/the_predator/it_was_a_good_day/07_it_was_a_good_day.mp3",
    "img_url": "https://storage.googleapis.com/trv_test/TroveMusic/rap/ice_cube/the_predator/cover/cover.jpg",
    "duration": 280,
    "hot-spot_start": 23,
    "genre": "rap",
    "genres": ["rap", "feel_good"],
    "explicit": true
}
`
const obj = JSON.parse(json)

const MusicBarFullscreen = () => {
  
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
  const animationRef = useRef()
  const volumeRef = useRef()

  


  useEffect(() => {
    const seconds = Math.floor(audioPlayer.current.duration)
    setDuration(seconds) // 45.26
    progressBar.current.max = seconds
  }, [audioPlayer?.current?.loadedmetadata, audioPlayer?.current?.readyState])

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
    changePlayerCurrentTime()
    animationRef.current = requestAnimationFrame(whilePlaying) //potential memory leak
  }

  const changeRange = () => {
    audioPlayer.current.currentTime = progressBar.current.value
    changePlayerCurrentTime()
  }

  const changePlayerCurrentTime = () => {
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

  //https://storage.cloud.google.com/trv_test_music/TroveMusic/country/wavepool_abortion/wavepool_abortion/blood_everywhere/wavepool%20abortion%20-%20wavepool%20abortion%20-%2010%20blood%20everywhere.mp3
  const songURL =
    'https://storage.googleapis.com/trv_test/TroveMusic/rap/ice_cube/the_predator/it_was_a_good_day/07_it_was_a_good_day.mp3'

  const toggleLiked = () => {
    setIsLiked(!isLiked)
  }

  return (
    <>
      {/* player-container musicbar */}
      <div className='fullscreenMusicBar'>
        <div className='fullsc-musicbar-wrap bg-trv-sm-Play-bg'>
          <audio
            ref={audioPlayer}
            src={obj.song_url}
            preload='metadata'
          ></audio>
          {/* Attempting to change on scroll */}
          <div id='fcplayerbox' className='fullscreen-player-info-container '>
            {/* Progress Bar */}
            {/* hidden now - this is queue */}
            {/* <div
              className='fullscreen-progressbarContainer'
              onMouseDown={toggleMute}
              onMouseUp={toggleMute}
            >
              <input
                className='fullscreen-progressBar'
                type='range'
                ref={progressBar}
                defaultValue='0 '
                onMouseDown={togglePlayPause}
                onMouseUp={togglePlayPause}
                onChange={changeRange}
              />
            </div> */}
            {/*  */}


            {/* <div className='fullscreen-song-img '>
              <img src={obj.img_url} className="fullscreen-img"></img>
              {obj.explicit ? (
                <div className='explicit-containter'>
                  <MdExplicit
                    data-tooltip-id='my-tooltip'
                    data-tooltip-content={
                      'Explicit: This song includes prophane language'
                    }
                    className='explicitActions'
                    data-tooltip-variant='light'
                  />
                  <Tooltip
                    className='tooltip-style'
                    place='bottom'
                    id='my-tooltip'
                    delayShow={100}
                  />
                </div>
              ) : (
                <p />
              )}
              {/* explicit-containter 
            </div> */}

            {/* <div className='fullscreen-song-txt-container-container '>
              <div className='like-btn '>
                <button onClick={toggleLiked}>
                  {isLiked ? <FaHeart className='text-white' /> : <FaRegHeart />}
                </button>
              </div>
              <div className='fullscreen-song-info-txt-container'>
                <div className='fc-song-txt'>
                  <a>{obj.title}</a>
                </div>
                <div className='fc-artist-txt'>
                  <a>{obj.artist}</a>
                </div>
              </div>
              <div className='like-btn'>
                <button onClick={toggleLiked}>
                  <AiOutlineShareAlt />
                </button>
              </div>
            </div> */}

            {/* <div className='fullscreen-control-container'>
              <button className='fullscreen-mediabtn1'>
                <BsSkipStart />
              </button>
              <button className='fullscreen-playbtnstyle' onClick={togglePlayPause}>
                {isPlaying ? <BsPause /> : <BsPlay className='FullscreenBsPlayStyleLg' />}
              </button>
              <button className='fullscreen-mediabtn1'>
                <BsSkipEnd />
              </button>
            </div> */}


          </div>
          {/* Queue */}
          <div className="brihgleggmoie">
            <h6 className='queueHeader'>Song Queue:</h6>
            {
              queue && queue.map((item, index) => {
                return (
                  <CardSong
                    key={index}
                    {...item}
                  />
                )
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
    </>
  )
}

export default MusicBarFullscreen
