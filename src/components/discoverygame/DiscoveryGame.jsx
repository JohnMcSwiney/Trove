import React, {useState, useRef, useEffect} from 'react';
import { useSwipeable } from 'react-swipeable';
import style from './DiscoveryGame.module.css'
import {FaPlay} from 'react-icons/fa';
import {FaPause} from 'react-icons/fa';

import {BiArrowToLeft} from 'react-icons/bi';
import { BiVolumeFull, BiVolumeLow, BiVolume, BiVolumeMute } from "react-icons/bi";
import {BsXLg, BsCheckLg} from 'react-icons/bs';
import tempImg from './NoSong.png';
import tempImg2 from '../../assets/testImgs/roast_turkey_dinner.jpg';
import tempImg3 from '../../assets/testImgs/chicken.jpg';

import { AudioPlayer } from '../audioplayerOLD/AudioPlayer';

import './DGstyle.css'


import DGdata from './hardcodedgsongs';

import Slider from "react-slick";
import $ from 'jquery';
// import "~slick-carousel/slick/slick.css"; 
// import "~slick-carousel/slick/slick-theme.css";

// import styles from '../audioplayer/AudioPlayer.module.css'

const DiscoveryGame = () => {
    //state

    const [state, setState] = React.useState(0);

    const [index, setIndex] = React.useState(0);
    const [accept, setAccept] = React.useState(0);
    const [deny, setDeny] = React.useState(0);


    const [volumeLevel, setVolumeLevel] = useState(0);
    const [isPlaying, setIsPlaying] =  useState(true);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);

    const [isMuted, setIsMuted] = useState(true);
    //isMuted is totally screwed... but it works. So i'm just gonna leave it as it is <3 sorry if it's confusing (I don't actually know what's happening lol)
    const [prevVolume, updatePrevVol] = useState(0.5);
    const [isLiked, setIsLiked] = useState(false);



    //reference
    const audioPlayer = useRef(); //reference to the audio player
    const progressBar = useRef(); //reference to the progress bar
    const animationRef = useRef(); //reference to the animation
    const musicSlides = useRef();
    const volumeRef = useRef();


    useEffect(() => {
      const seconds = Math.floor(audioPlayer.current.duration);
      setDuration(seconds);
      progressBar.current.max = seconds;
      setIndex(musicSlides.current);
      changeVolumeLevel(10);



  }, [audioPlayer?.current?.loadmetadata, audioPlayer?.current?.readyState]);
  /* maybe replaceing useEffect 
    const onLoadedMetaData = () =>
    setTotalAudioTime(audioPlayer.current?.duration); 
    */
   

    const calculateTime = (secs) => {
        const minutes = Math.floor(secs / 60);
        const returnedMinutes = minutes < 10? `0${minutes}` : minutes;
        const seconds = Math.floor(secs % 60);
        const returnedSeconds = seconds < 10? `0${seconds}` : seconds;
        return `${returnedMinutes}:${returnedSeconds}`;
    }

   
  const togglePlayPause = () => {
    const prevValue = isPlaying;
    setIsPlaying(!prevValue);
    changeVolumeLevel();
    if (!prevValue) {
      audioPlayer.current.play();
      animationRef.current = requestAnimationFrame(whilePlaying); //fix this
    } else {
      audioPlayer.current.pause();
      cancelAnimationFrame(animationRef.current);
    }

  }

  const toggleMute = () => {
    const prevValue = isMuted;
    updatePrevVol(audioPlayer.current.volume);
    setIsMuted(!prevValue);
    if (!prevValue) {
      console.log(`isMuted ` + isMuted);
      console.log(`unmuting!`);
      // console.log(`previous vol: ` + prevVolume);
      audioPlayer.current.volume = prevVolume;
      setVolumeLevel(audioPlayer.current.volume);
      volumeRef.current.value = (prevVolume * 100);
      // console.log(`current vol:` + (volumeLevel * 1000));

    } else {
      console.log(`isMuted ` + isMuted);
      console.log(`muting!`);
      // console.log(`previous vol: ` + volumeLevel);
      audioPlayer.current.volume = 0;
      setVolumeLevel(0);
      volumeRef.current.value = 0;
      // console.log(`current vol:` + volumeLevel);



    }
  }

  const whilePlaying = () => {
    progressBar.current.value = audioPlayer.current.currentTime;
    changePlayerCurrentTime();
    animationRef.current = requestAnimationFrame(whilePlaying); //potential memory leak
  }

  const changeRange = () => {
    audioPlayer.current.currentTime = progressBar.current.value;
    changePlayerCurrentTime();
  }

  const changePlayerCurrentTime = () => {
    progressBar.current.style.setProperty('--seek-before-width', `${progressBar.current.value / duration * 100}%`);
    setCurrentTime(progressBar.current.value);
  }

  const changeVolumeLevel = (input) => {
    setIsMuted(true);
    // console.log(audioPlayer.current.volume);
    // console.log(volumeRef.current.value);
    audioPlayer.current.volume = (volumeRef.current.value / 100);
  }

    const likedIndexs = [];
    const dislikedIndexs = [];
    const swipeableProps = useSwipeable({
        trackMouse: true,
        onSwipedLeft: () => {
          if (state === slides.length - 1) return;
          setIndex((prevIndex) => (prevIndex + 1) % slides.length);
          setAccept(accept + 1);
          likedIndexs.push(slides[state].audio);
          gotoNext();
          setState(state+1);
        },
        onSwipedRight: () => {
          if (state === slides.length - 1) return;
          setIndex((prevIndex) => (prevIndex + 1) % slides.length);
          setDeny(deny + 1);
          dislikedIndexs.push(slides[state].audio);
          gotoNext();
          setState(state+1);
        },
    });

    

    {/* slider */}
    const settings = {
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      swipe: false,
      swipeToSlide: false,
      infinite: false,
      className: "test",
      centerMode: true,
      centerPadding: '70px',
      focusOnSelect: true
      // onAfterChange: function(slide, index){
      //   console.log( $(this).attr('id') ); 
      //   console.log( $(slide).attr('id') );
      // }
      
      // onAfterChange: function(){
      //   $('.current').text($('.slides').slickCurrentSlide()+1);
      // }
      
      // afterChange: () =>
      //   this.setState(state => ({ updateCount: state.updateCount + 1 })),
      // beforeChange: (current, next) => this.setState({ slideIndex: next })
      // ,
      // beforeChange: (current, next) => this.setState({ activeSlide: next }),
      // afterChange: current => this.setState({ activeSlide2: current })

    };
    const slides = DGdata;

    const printIndex = (index) =>  {
      setState(index);
      console.log(index);
    }
//     jQuery('.pt-slick-carousel__slides').on('afterChange', function(event, slick, currentSlide, nextSlide){
//       console.log(jQuery('.pt-slick-carousel__slides .slick-active').attr('data-slick-index'));
//       console.log(jQuery('.pt-slick-carousel__slides .slick-active').attr('id'));
// });
    const gotoNext = () =>{
      musicSlides.current.slickNext();
    }
  return (  
        <div className='Discovery-Container'>
            <div 
            // className='Discovery-Top-Container'
            >
              {/* Back button - plays song just swipped  */}   
            {/* <div className="Discovery-PrevImg-Container"> */}  
              <button className='hidden' onClick={() => {
                      if (state === 0) return;
                      setIndex((prevIndex) => (prevIndex + slides.length - 1) % slides.length);
                      }}><BiArrowToLeft/>
              </button>
              {/* volume */}
              <div className='volumeContainter'>
                <button onClick={toggleMute}>
                {isMuted ? <BiVolumeFull /> : <BiVolumeMute />}
                </button>
                <input type="range" ref={volumeRef} defaultValue="15" onChange={changeVolumeLevel} min="0" max="100" step="5" ></input>
              </div>

                      {/* </div> */}
                    <div className= "Discovery-Top-Container">
                      
                        <Slider ref={musicSlides}{...settings} id='carousel'>
                        
                              <div className='test2'  >
                                  <div className='Discovery-Img-Container' >
                                  <img src={slides[0].url} alt={slides[0].alt} className="DGimg"  onClick={() => printIndex(0)}/>
                                </div>
                              </div>

                              <div className='test2'  >
                                  <div className='Discovery-Img-Container' >
                                  <img src={slides[1].url} alt={slides[1].alt} className="DGimg" onClick={() => printIndex(1)} />
                                </div>
                              </div>

                              <div className='test2'  >
                                  <div className='Discovery-Img-Container' >
                                  <img src={slides[2].url} alt={slides[2].alt} className="DGimg"  onClick={() => printIndex(2)}/>
                                </div>
                              </div>

                              <div className='test2'  >
                                  <div className='Discovery-Img-Container' >
                                  <img src={slides[3].url} alt={slides[3].alt} className="DGimg"  onClick={() => printIndex(3)}/>
                                </div>
                              </div>

                              <div className='test2' >
                                  <div className='Discovery-Img-Container' >
                                  <img src={slides[4].url} alt={slides[4].alt} className="DGimg"  onClick={() => printIndex(4)}/>
                                </div>
                              </div>    
                        </Slider>
                    </div>
                    {/* img updates every second, change later */}
            </div>
          
            <div className='Discovery-Text-Container'>
              {/* Song title */}
              <h2 className=""> {slides[state].songName} </h2> 
              {/* Song Artist */}
              <h2 className=""> {slides[state].author} </h2> 
            </div>
            
            {/* Swipe Box */}
            <div className='Discovery-Swipe-Container'{...swipeableProps}>

                {/* dislike */}
                <button onClick={() => {if (state === slides.length - 1) return;
                setIndex((prevIndex) => (prevIndex + 1) % slides.length);
                setDeny(deny + 1);
                dislikedIndexs.push(slides[state].audio);
                gotoNext();
                }} className='Discovery-Disike'><BsXLg/></button>


                {/* like */}
                <button onClick={() => {if (state === slides.length - 1) return;
                setIndex((prevIndex) => (prevIndex + 1) % slides.length);
                setAccept(accept + 1);
                likedIndexs.push(slides[state].audio);
                gotoNext();
                }} className='Discovery-Like'><BsCheckLg/></button>

                
                
                
            
            </div>
            {/*Audio Player*/}
            <div className='Discovery-Player-Container'>
                
                {/* <div className={style.DGaudioPlayer}>  JACK */} 
                <div className=''> 
                    <audio ref={audioPlayer} src ={slides[state].audio} 
                    autoPlay 
                    // 
                    preload="metadata"></audio>
                    {/*testing maybe going in audio player to fix not loading the proggress bar on start up onLoadedMetaData={onLoadedMetaData}  */} 
                    
                    {/*current time*/}
                    {/* removed for testing */}
                    {/* <div className={style.DGcurrentTime}>{calculateTime(currentTime)}</div> */}
                    {/*progress bar*/}
                    <div className='DGprogressBarContainer'>
                        <input type="range" 
                        // className={style.DGprogressBar}
                        className='DGprogressBar'
                        defaultValue="0" ref={progressBar} onChange={changeRange} />
                    </div>
                    {/*Duration*/}
                    {/* removed for testing*/}
                    {/* <div className={style.DGduration}>{(duration && !isNaN(duration)) && calculateTime(duration)}</div> */}
                    <div className='DGpsbutsCont'>
                      <button onClick={togglePlayPause} className="DGplayPause">
                          {isPlaying ? <FaPause/> : <FaPlay className="DGplay"/>}   
                      
                      </button>
                    </div>
                    
                </div>
            </div>
            <div className='Discovery-TestingItem-Container'>
                    {/* Like */}
                <div>{accept}Left swipes       
                {/* {console.log(likedIndexs)} */}
                </div>
                {/* Dislike */}
                <div>{deny}Right swipes        
                {/* {console.log(dislikedIndexs)} */}
                </div>


                {/* <p>
                  BeforeChange  activeSlide: <strong>{this.state.activeSlide}</strong>
                </p>
                <p>
                  AfterChange  activeSlide: <strong>{this.state.activeSlide2}</strong>
                </p> */}

            </div>        
            

        </div>
        
    );

}
 
export default DiscoveryGame;