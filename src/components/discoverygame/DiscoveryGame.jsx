import React, { useState, useRef, useEffect } from 'react'
import { useSwipeable } from 'react-swipeable'
import { FaPlay } from 'react-icons/fa'
import { FaPause } from 'react-icons/fa'

import { BiArrowToLeft } from 'react-icons/bi'
import {
  BiVolumeFull,
  BiVolumeLow,
  BiVolume,
  BiVolumeMute
} from 'react-icons/bi'
import { BsXLg, BsCheckLg } from 'react-icons/bs'
import { MdOutlineArrowBackIos, MdOutlineArrowForwardIos } from 'react-icons/md'
import Song from '../../components/song detail/Song'
import tempImg from './NoSong.png'
import tempImg2 from '../../assets/testImgs/roast_turkey_dinner.jpg'
import tempImg3 from '../../assets/testImgs/chicken.jpg'

import { AudioPlayer } from '../audioplayerOLD/AudioPlayer'

import './DGstyle.css'

// import DGdata from "../../data/hardcodedTestData/hardcodeDGsongs";

import Slider from 'react-slick'

import MyTrove from '../../pages/my trove/MyTrove'

import LikeData from '../../data/likeTemp'
import { useAuthContext } from '../../hooks/user-hooks/useAuthContext'
// import {AuthContext} from "../../hooks/user-hooks/useAuthContext";

// import "~slick-carousel/slick/slick.css";
// import "~slick-carousel/slick/slick-theme.css";

// import styles from '../audioplayer/AudioPlayer.module.css'

const DiscoveryGame = () => {
  //state

  const [state, setState] = React.useState(0)

  const [index, setIndex] = React.useState(0)
  const [accept, setAccept] = React.useState(0)
  const [deny, setDeny] = React.useState(0)
  const [dGData, setDGData] = React.useState([])
  const [volumeLevel, setVolumeLevel] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isLoaded, setIsLoaded] = useState(false)
  const [duration, setDuration] = useState(0)
  const [foobar, setFoobar] = useState('these')
  const [currentTime, setCurrentTime] = useState(0)

  const [likedslides, setLikedslides] = useState([])

  const [isMuted, setIsMuted] = useState(true)
  //isMuted is totally screwed... but it works. So i'm just gonna leave it as it is <3 sorry if it's confusing (I don't actually know what's happening lol)
  const [prevVolume, updatePrevVol] = useState(0.5)
  const [isLiked, setIsLiked] = useState(false)
  const [likedIds, setLikedIds] = useState([])
  const [dislikedIds, setDisikedIds] = useState([])

  const [currentUserLoaded, setCurrentUserLoaded] = useState(false)
  //reference
  const audioPlayer = useRef() //reference to the audio player
  const DGprogressBar = useRef() //reference to the progress bar
  const animationRef = useRef() //reference to the animation
  const musicSlides = useRef()
  const DGvolumeRef = useRef()
  const hardCodeId = '640f32ff50d15ac45201358c'

  //for likes   ([{ id: slides[state].id, songName: slides[state].songName, author: slides[state].author }])

  //fetch all song
  const [songs, setSongs] = useState([])
  const [songsLoaded, updateSongsLoaded] = useState(false)
  const [needLoadsong, setneedLoadsong] = useState(false)
  const user = useAuthContext()
  React.useEffect(() => {
    // function getdgSongs () {
    console.log('in fetch all songs useEffect')

    if (songsLoaded === true) {
      return
    }
    const fetchAllSong = async () => {
      if (songsLoaded === true) {
        return
      } else {
      }
      if (songs.length === 0) {
        // fetch(`api/DG/${hardCodeId}`)
        let temp
        setneedLoadsong(true)
        await fetch(`api/DG/${user.id}`)
          .then(response => response.json())
          .then(json => {
            temp = json
          })
        setneedLoadsong(false)
        if (!songsLoaded) updateSongs(temp)
      } else {
        return
      }
    }

    fetchAllSong()
  }, [])

  function updateSongs (songsIn) {
    if (songsLoaded !== true) {
      if (songs == 0) {
        updateSongsLoaded(true)
        setSongs(songsIn)
      }
    }
  }
  // React.useEffect(() => {
  //     if (songs.length !== 0 && songsLoaded === false) {
  //       updateSongsLoaded(true)
  //     } else {
  //       return;
  //     }

  // }, [songs])
  //
  // useEffect(() => {
  //   const alikedsong = JSON.parse(localStorage.getItem('likedSongs'))

  //   if (alikedsong) {
  //     setLikedslides(alikedsong)
  //   } else {
  //     setLikedslides(LikeData)
  //   }
  // }, [])
  // const fillDGData = songsIn => {
  //   setDGData(songs)
  //   console.log('dgData ')
  //   console.log(dGData)
  // }
  const handleAddLikedSongs = () => {
    const newLike = { _id: songs[state]._id }

    const updateLikes = [...likedslides, newLike]

    setLikedslides(updateLikes)

    localStorage.setItem('likedSongs', JSON.stringify(updateLikes))

    fetch(`/api/songs/liked/${newLike}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ likedslides })
    })
  }

  // useEffect(() => {
  //   if(dGData.length !== 0){
  //     const seconds = Math.floor(audioPlayer.current.duration)
  //     setDuration(seconds)
  //     DGprogressBar.current.max = seconds
  //     setIndex(musicSlides.current)
  //     changeVolumeLevel(10)
  //   } else {
  //     console.log("audioplayer handler useEffect");
  //     return;
  //   }

  // }, [audioPlayer?.current?.loadmetadata, audioPlayer?.current?.readyState])

  /* maybe replacing useEffect 
    const onLoadedMetaData = () =>
    setTotalAudioTime(audioPlayer.current?.duration); 
    */

  const calculateTime = secs => {
    const minutes = Math.floor(secs / 60)
    const returnedMinutes = minutes < 10 ? `0${minutes}` : minutes
    const seconds = Math.floor(secs % 60)
    const returnedSeconds = seconds < 10 ? `0${seconds}` : seconds
    return `${returnedMinutes}:${returnedSeconds}`
  }

  const togglePlayPause = () => {
    if (songs) {
      const prevValue = isPlaying
      setIsPlaying(!prevValue)
      changeVolumeLevel()
      if (!prevValue) {
        console.log('test- this is the if true')
        audioPlayer.current.play()
        animationRef.current = requestAnimationFrame(whilePlaying) //fix this
      } else {
        console.log('test- this is the if false')
        audioPlayer.current.pause()
        cancelAnimationFrame(animationRef.current)
      }
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
      DGvolumeRef.current.value = prevVolume * 100
      // console.log(`current vol:` + (volumeLevel * 1000));
    } else {
      console.log(`isMuted ` + isMuted)
      console.log(`muting!`)
      // console.log(`previous vol: ` + volumeLevel);
      audioPlayer.current.volume = 0
      setVolumeLevel(0)
      DGvolumeRef.current.value = 0
      // console.log(`current vol:` + volumeLevel);
    }
  }
  const whilePlaying = () => {
    // console.log('whilePlaying')
    if (songs.length !== 0) {
      // console.log('whilePlaying in da if statement')
      DGprogressBar.current.value = audioPlayer.current?.currentTime
      changePlayerCurrentTime()
      animationRef.current = requestAnimationFrame(whilePlaying) //potential memory leak
    }
  }
  const changeRange = () => {
    if(songs.length !== 0){
      audioPlayer.current.currentTime = DGprogressBar.current.value
      changePlayerCurrentTime()
    }
    
  }
  const changePlayerCurrentTime = () => {
    DGprogressBar.current.style.setProperty(
      '--seek-before-width',
      `${(DGprogressBar.current.value / duration) * 100}%`
    )
    setCurrentTime(DGprogressBar.current.value)
  }
  const changeVolumeLevel = input => {
    setIsMuted(true)
    audioPlayer.current.volume = DGvolumeRef.current.value / 100
  }
  const handleSwipe2 = direction => {
    console.log(direction)
  }
  const swipeableProps = useSwipeable({
    trackMouse: true,
    // Dislike
    onSwipedLeft: () => {
      handleSwipe2('dislike')
      // if (state === songs.length - 1) return
      // setIndex(prevIndex => (prevIndex + 1) % songs.length)
      // setAccept(accept + 1)
      // dislikedIds.push(
      //   songs[state]._id,
      //   songs[state].title,
      //   songs[state].artist
      // )

      gotoNext()
      setState(state + 1)
    },
    // Like
    onSwipedRight: () => {
      handleSwipe2('like')
      // if (state === songs.length - 1) return
      // setIndex(prevIndex => (prevIndex + 1) % songs.length)
      // setDeny(deny + 1)
      // likedIds.push(
      //   songs[state]._id,
      //   songs[state].title,
      //   songs[state].artist
      // )
      gotoNext()
      setState(state + 1)
      // handleAddLikedSongs()
    }
  })
  {
    /* slider */
  }
  const settings = {
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    swipe: false,
    swipeToSlide: false,
    infinite: false,
    className: 'test',
    centerMode: true,
    // centerPadding: '1vmin',
    focusOnSelect: true
  }
  // const slides == dGdata;
  const [slides, setSlides] = React.useState([])
  // if (dGData !== undefined) {
  //   setSlides(dGData);
  // }
  const printIndex = index => {
    setState(index)
    console.log(index)
  }
  const gotoNext = () => {
    musicSlides.current.slickNext()
  }

  {
    // currentUserLoaded === true
    // &&
    // dGData.length !== 0
    // ? (
    // )
    // : (
    //     // <div className='bg-fglass1'>
    //     //  bruh
    //     //         </div>
    //             )
    //           }

    // ild if statement
    // if(foobar !== "nuts"){
    //   setFoobar("nuts");
    // } else {
    //   return;
    // }

    console.log(songs)

    // function doSomething() {
    //   console.info("DOM loaded");
    // }

    // if (document.readyState === "loading") {
    //   // Loading hasn't finished yet

    //   document.addEventListener("DOMContentLoaded", doSomething);
    // } else {
    //   // `DOMContentLoaded` has already fired
    //   doSomething();
    // }
    return (
      <div className='Discovery-Container'>
        <div className='Discovery-Top-Container'>
          <Slider ref={musicSlides} {...settings} id='carousel'>
            {songs?.map((song, i = 0) => {
              return (
                <div className='test2'>
                  <div className='Discovery-Img-Container'>
                    <img
                      src={song?.imgUrl}
                      className='DGimg'
                      onClick={() => printIndex(i++)}
                    />
                  </div>
                </div>
              )
            })}
          </Slider>
          <div className='Discovery-Text-Container'>
            {/* Song title */}
            <h2 className='DGsongtxt'>
              {/* {dGData && dGData[state].title}  */}
              {songs.length !== 0 && songs[state]?.title}
              {/* title */}
            </h2>
            {/* Song Artist */}
            <h2 className='DGalbtxt'>
              {songs.length !== 0 && songs[state]?.artist.artistName}
              {/* artist */}
            </h2>
          </div>
          {/* Swipe Box */}
          <div className='Discovery-Swipe-Container' {...swipeableProps}>
            {/* dislike */}
            <button
              onClick={() => {
                handleSwipe2('click dislike')
                // if (state === slides.length - 1) return;
                // setIndex((prevIndex) => (prevIndex + 1) % slides.length);
                // setDeny(deny + 1);
                // dislikedIds.push(
                //   slides[state]._id,
                //   slides[state].title,
                //   slides[state].artist
                // );
                // gotoNext();
                // setState(state + 1);
              }}
              className='Discovery-Disike'
            >
              <BsXLg />
            </button>
            <div className='DGarrowcont'>
              <MdOutlineArrowBackIos className='DGarrow' />
              <MdOutlineArrowBackIos />
              <MdOutlineArrowBackIos />
            </div>
            <div className='DGarrowcont'>
              {' '}
              <MdOutlineArrowForwardIos />
              <MdOutlineArrowForwardIos />
              <MdOutlineArrowForwardIos />{' '}
            </div>

            {/* like */}
            <button
              onClick={() => {
                handleSwipe2('click like')
                // if (state === slides.length - 1) return;
                // setIndex((prevIndex) => (prevIndex + 1) % slides.length);
                // setAccept(accept + 1);
                // console.log(slides[state].id);
                // likedIds.push(
                //   slides[state]._id,
                //   slides[state].title,
                //   slides[state].artist
                // );
                // gotoNext();
                // setState(state + 1);
                // handleAddLikedSongs();
              }}
              className='Discovery-Like'
            >
              <BsCheckLg />
            </button>
          </div>
          <div className='Discovery-Player-Container'>
            {/* <div className={style.DGaudioPlayer}>  JACK */}
            <div className=''>
            
              <audio
                ref={audioPlayer}
                src={songs[state]?.songUrl}
                autoPlay
                preload='metadata'
                isPlaying={() => {
                  changeRange()
                  animationRef.current = requestAnimationFrame(whilePlaying)
                }
                  }
              ></audio>

            
              
              {/*testing maybe going in audio player to fix not loading the proggress bar on start up onLoadedMetaData={onLoadedMetaData}  */}

              {/*current time*/}
              {/* removed for testing */}
              {/* <div className={style.DGcurrentTime}>{calculateTime(currentTime)}</div> */}
              {/*progress bar*/}
              <div className='DGprogressBarContainer'>
                
                <input
                  type='range'
                  // className={style.DGprogressBar}
                  className='DGprogressBar'
                  defaultValue='0'
                  ref={DGprogressBar}
                  onChange={() => {
                    changeRange()
                    animationRef.current = requestAnimationFrame(whilePlaying)
                  }}
                />
              </div>
              <div className='DGpsbutsCont'>
                <button
                  onClick={togglePlayPause}
                  className='DGplayPause'
                  id='playPauseBtn'
                >
                  {isPlaying ? <FaPause /> : <FaPlay className='DGplay' />}
                </button>
              </div>
              <div className='DGvolumeContainter'>
    <button onClick={toggleMute}>
      {isMuted ? <BiVolumeFull /> : <BiVolumeMute />}
    </button>
    <input
      type='range'
      ref={DGvolumeRef}
      defaultValue='10'
      onChange={changeVolumeLevel}
      min='0'
      max='100'
      step='5'
    ></input>
  </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default DiscoveryGame
