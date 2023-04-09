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

import Slider from 'react-slick'

import MyTrove from '../../pages/my trove/MyTrove'

import LikeData from '../../data/likeTemp'
import { useAuthContext } from '../../hooks/user-hooks/useAuthContext'
import { MusicContext } from '../../contexts/MusicContext'
import { json } from 'react-router-dom'

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
  const [isLiked, setIsLiked] = useState("")
  const [likedIds, setLikedIds] = useState([])
  const [dislikedIds, setDisikedIds] = useState([])
  const [currentUserLoaded, setCurrentUserLoaded] = useState(false)
  const [dgLoops, updateDgLoops] = useState(0);
  //reference
  const audioPlayer = useRef() //reference to the audio player
  const DGprogressBar = useRef() //reference to the progress bar
  const animationRef = useRef() //reference to the animation
  const musicSlides = useRef()
  const DGvolumeRef = useRef()
  // const hardCodeId = '640f32ff50d15ac45201358c'

  //for likes   ([{ id: slides[state].id, songName: slides[state].songName, author: slides[state].author }])
  const [songs, setSongs] = useState([])
  const [songsLoaded, updateSongsLoaded] = useState(false)
  const [needLoadsong, setneedLoadsong] = useState(false)
  const user = useAuthContext()
  const { displayMusicBar, updateDisplayMusicBar, play_list,

    curr_DiscoveryDecision,
    setCurr_DiscoveryDecision,
    discovery_Decision_List,
    updateDiscovery_Decision_List,
    discovery_decision_add,
    clear_discovery_decision_list, } = React.useContext(MusicContext)

  // hides musicBar when discovery game is active
  // user needs to play more music to get it back
  if (displayMusicBar === true) {
    updateDisplayMusicBar(false);
  }

const hasEffectRun = React.useRef(false);

React.useEffect(() => {

    if (hasEffectRun.current) {
      return;
    }
    // function getdgSongs () {

    if (songsLoaded === true) {
      return;
      setState(0);
    }
    console.log("test " + dgLoops)
    // console.log(user.user.id);
    const fetchDGSongs = async () => {
      if (songsLoaded === true) {
        console.log("return p1");
        return
      } else if (songs.length === 0 || songs === [] || songsLoaded === false) {
        console.log("test")
        let temp
        setneedLoadsong(true)
        await fetch(`api/DG/${JSON.parse(localStorage.getItem('user')).id}`)
          .then(response => response.json())
          .then(json => {
            temp = json
          })
        setneedLoadsong(false)
        if (!songsLoaded) updateSongs(temp)
      } else {
        console.log(songs.length)
        console.log("return p2");
        return
      }
    }
    fetchDGSongs();
    hasEffectRun.current = true;
  }, [dgLoops])

  function updateSongs(songsIn) {
    if (songsLoaded !== true) {
      // if (songs === 0) {
      updateSongsLoaded(true)
      setSongs(songsIn)
      // }
    }
  }


  // * Discovery Game Music Player * //
  // ------------------------------- //
  // updates max for progress bar
  // toggle play/pause & toggle mute toggle their respective values
  // changeRange changes the progressbar while the song is playing
  // changeCurrentTime changes the before area of the progress bar <- chrome/safari
  // ------------------------------ //
  useEffect(() => {
    // changeVolumeLevel(50)
    if (songs.length !== 0) {
      const seconds = Math.floor(audioPlayer.current.duration)
      setDuration(seconds)
      DGprogressBar.current.max = seconds
      setIndex(musicSlides.current)
    } else {
      // console.log("NO SONGS!");
      return
    }
  }, [audioPlayer?.current?.loadmetadata, audioPlayer?.current?.readyState])

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
      // changeVolumeLevel()
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
    if (songs.length !== 0) {
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

  // * Discovery Swiping Elements * //
  //
  //
  const gotoNext = () => {
    musicSlides.current.slickNext()
  }
  const resetSlideIndex = () => {
    musicSlides.current.slickGoTo(0);
  }

  const handleSwipe2 = direction => {
    console.log("direction test: " + direction)

    switch (direction) {
      case 'like':
        console.log("switch like! (song:" + songs[state].title + " )");
        handleAddLikedSongs(direction);
        break;

      case 'dislike':
        console.log("switch dislike! (song:" + songs[state].title + " )");
        handleAddLikedSongs(direction);
        break;
      default:
        break;
    }
    // setIsLiked(direction);
    //discovery_decision_add(songs[state]._id, direction);
    if (state === 4) {
      console.log("we should really get you some new songs hey?");
      hasEffectRun.current = false;
      if (isPlaying === true) {
        togglePlayPause();
      }
      // Send the liked songs to TasteProfile here
      // <3 
      updateSongsLoaded(false);
      updateSongs([])

      updateDgLoops(dgLoops + 1);
      resetSlideIndex();
      setState(0);
      clear_discovery_decision_list();
    } else {
      gotoNext()
      setState(state + 1)

    }

  }
  const swipeableProps = useSwipeable({
    trackMouse: true,
    // like

    onSwipedLeft: () => {
      handleSwipe2('like')
      // if (state === songs.length - 1) return
      // setIndex(prevIndex => (prevIndex + 1) % songs.length)
      // setAccept(accept + 1)
      // dislikedIds.push(
      //   songs[state]._id,
      //   songs[state].title,
      //   songs[state].artist
      // )
      // handleAddLikedSongs(isLiked);
    },


    // dislike
    onSwipedRight: () => {
      handleSwipe2('dislike')
      // if (state === songs.length - 1) return
      // setIndex(prevIndex => (prevIndex + 1) % songs.length)
      // setDeny(deny + 1)
      // likedIds.push(
      //   songs[state]._id,
      //   songs[state].title,
      //   songs[state].artist
      // 
      // handleAddLikedSongs(isLiked);
    }
  })

  // useEffect(() => {
  //   const alikedsong = JSON.parse(localStorage.getItem('likedSongs'))

  //   if (alikedsong) {
  //     setLikedslides(alikedsong)
  //   } else {
  //     setLikedslides(LikeData)
  //   }
  // }, [])
  const handleAddLikedSongs = (direction) => {

    console.log("swipeDirection: " + direction);

    if (direction === "like") {

      let likedSongs = [5];

      likedSongs = [{ _id: songs[state]._id, direction: direction }];


      console.log("inside like");

      if (likedSongs.length > 5) {
        console.log("likedSongs cannot be greater than 5");
        throw new Error("likedSongs cannot be greater than 5");
      }

      setLikedslides(likedSongs);

      localStorage.setItem('likedSongs', JSON.stringify(likedSongs));

      // console.log("likedSongs array: " + JSON.parse(likedSongs));

      fetch(`/api/DG/${user.id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ likedSongs })
      });


    }
    else {
      console.log("swipe direction is left, user disliked song");
    }

    console.log("final swipeDirection: " + direction);

    //const updateLikes = [...likedslides, newLike]

    // fetch(`/api/songs/liked/${likedSongs}`, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ likedSongs })
    // })

    // React.useEffect(() => {
    //   // function getdgSongs () {

    //   if (songsLoaded === true) {
    //     return;
    //     setState(0);
    //   }
    //   console.log("test " + dgLoops)
    //   const fetchDGSongs = async () => {
    //     if (songsLoaded === true) {
    //       console.log("return p1");
    //       return
    //     } else if (songs.length === 0 || songs === [] || songsLoaded === false) {
    //       console.log("test")
    //       let temp
    //       setneedLoadsong(true)
    //       await fetch(`api/DG/${user.id}`)
    //         .then(response => response.json())
    //         .then(json => {
    //           temp = json
    //         })
    //       setneedLoadsong(false)
    //       if (!songsLoaded) updateSongs(temp)
    //     } else {
    //       console.log(songs.length)
    //       console.log("return p2");
    //       return
    //     }
    //   }
    //   fetchDGSongs()

    // }, [dgLoops])

    // fetch(`/api/DG/${user.id}`, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ likedSongs })
    // });
  }

  // * slider * /

  const settings = {
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    swipe: false,
    swipeToSlide: false,
    infinite: true,
    className: 'test',
    centerMode: true,
    // centerPadding: '1vw',
    focusOnSelect: true
  }

  const [slides, setSlides] = React.useState([])

  const printIndex = index => {
    setState(index)
    console.log(index)
  }


  {
    return (
      <div className='Discovery-Container'>
        <div className='DGtitle'><strong>Discovery </strong>Game</div>
        <div className='Discovery-Top-Container'>
          <Slider ref={musicSlides} {...settings} id='carousel'>
            {songs && songs.length > 0 && songs?.map((song, i = 0) => {
              return (
                <div className='test2'>
                  <div className='Discovery-Img-Container'>
                    <img
                      src={song?.imgUrl}
                      className='DGimg'
                    // onClick={() => printIndex(i++)}
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

          <div className='Discovery-Player-Container'>

            <div className=''>
              <audio
                ref={audioPlayer}
                src={songs[state]?.songUrl}
                autoPlay
                preload='metadata'
                isPlaying={
                  (animationRef.current = requestAnimationFrame(whilePlaying))
                }
                onLoadedMetadata={() => {
                  if (isPlaying === false) {
                    togglePlayPause();
                  }

                  changeRange()
                  animationRef.current = requestAnimationFrame(whilePlaying)
                }}
                onChange={() => {
                  changeRange()
                  animationRef.current = requestAnimationFrame(whilePlaying)
                }}
                onEnded={() => {
                  if (isPlaying === true) {
                    togglePlayPause();
                  }
                  console.log("song ended delay beginning (2s)");
                  setTimeout(() => {
                    console.log("song ended delay finished");

                    if (state === 4) {
                      console.log("at end");
                    }
                    handleSwipe2('dislike')
                  }, 2000)
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
                  defaultValue='100'
                  className="volumeBar"
                  onChange={changeVolumeLevel}
                  min='0'
                  max='100'
                  step='5'
                ></input>
              </div>
            </div>
          </div>
          {/* Swipe Box */}
          <div className='Discovery-Swipe-Container' {...swipeableProps}>
            {/* dislike */}
            <button
              onClick={() => {
                handleSwipe2('dislike')
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
                handleSwipe2('like')
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
                //handleAddLikedSongs();
              }}
              className='Discovery-Like'
            >
              <BsCheckLg />
            </button>
          </div>
        </div>
      </div>
    )
  }
}
export default DiscoveryGame
