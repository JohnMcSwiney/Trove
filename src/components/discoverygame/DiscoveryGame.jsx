import React, {useState, useRef, useEffect} from 'react';
import { useSwipeable } from 'react-swipeable';
import style from './DiscoveryGame.module.css'
import {FaPlay} from 'react-icons/fa';
import {FaPause} from 'react-icons/fa';

import {BiArrowToLeft} from 'react-icons/bi';

import tempImg from './NoSong.png';
import tempImg2 from '../../assets/testImgs/roast_turkey_dinner.jpg';
import tempImg3 from '../../assets/testImgs/chicken.jpg';

import { AudioPlayer } from '../audioplayer/AudioPlayer';

import './DGstyle.css'


import DGdata from './hardcodedgsongs';

import Slider from "react-slick";
// import "~slick-carousel/slick/slick.css"; 
// import "~slick-carousel/slick/slick-theme.css";

// import styles from '../audioplayer/AudioPlayer.module.css'

const DiscoveryGame = () => {
    //state

    const [index, setIndex] = React.useState(0);
    const [accept, setAccept] = React.useState(0);
    const [deny, setDeny] = React.useState(0);



    const [isPlaying, setIsPlaying] =  useState(true);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);



    //reference
    const audioPlayer = useRef(); //reference to the audio player
    const progressBar = useRef(); //reference to the progress bar
    const animationRef = useRef(); //reference to the animation


    useEffect(() => {
      const seconds = Math.floor(audioPlayer.current.duration);
      setDuration(seconds);
      progressBar.current.max = seconds;



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

        const preValue = isPlaying;

        setIsPlaying(!preValue);
        
        if(!preValue){
            audioPlayer.current.play();
            animationRef.current = requestAnimationFrame(whilePlaying);
            
            
        
        }else {
            audioPlayer.current.pause();
            cancelAnimationFrame(animationRef.current);


        }


    }

    const whilePlaying = () => {
        progressBar.current.value = audioPlayer.current.currentTime;
        changePlayerCurrentTime();
        animationRef.current = requestAnimationFrame(whilePlaying);
        
    }

    const changeRange = () => {
    
        audioPlayer.current.currentTime = progressBar.current.value;
        changePlayerCurrentTime();


    }

    const changePlayerCurrentTime = () => {
        progressBar.current.style.setProperty('--seek-before-width', `${progressBar.current.value / duration * 100}%`);
        setCurrentTime(progressBar.current.value);
    }

      

    const likedIndexs = [];
    const dislikedIndexs = [];
    const swipeableProps = useSwipeable({
        trackMouse: true,
        onSwipedLeft: () => {
          if (index === slides.length - 1) return;
          setIndex((prevIndex) => (prevIndex + 1) % slides.length);
          setAccept(accept + 1);
          likedIndexs.push(slides[index].audio);
        },
        onSwipedRight: () => {
          if (index === slides.length - 1) return;
          setIndex((prevIndex) => (prevIndex + 1) % slides.length);
          setDeny(deny + 1);
          dislikedIndexs.push(slides[index].audio);
        },
    });


    const settings = {
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      swipeToSlide: true,
      infinite: false,
      className: "test",
      centerMode: true,
      centerPadding: '70px'
      // ,
      // beforeChange: (current, next) => this.setState({ activeSlide: next }),
      // afterChange: current => this.setState({ activeSlide2: current })

    };

    const slides = DGdata;


    const state = {
      activeSlide: 0,
      activeSlide2: 0
    };


  return (  
        <div className='Discovery-Container'>
               
            
            <div 
            // className='Discovery-Top-Container'
            >
              {/* Back button - plays song just swipped  */}
            
            {/* <div className="Discovery-PrevImg-Container"> */}
              
              <button className='hidden' onClick={() => {
                      if (index === 0) return;
                      setIndex((prevIndex) => (prevIndex + slides.length - 1) % slides.length);
                      }}><BiArrowToLeft/>
              </button>
                      {/* </div> */}
         
                    <div className= "Discovery-Top-Container">
                      
                        <Slider {...settings}>
                        {
                          slides.map((slide, index) => {
                            return (
                              <div className='test2'>
                                  <div className='Discovery-Img-Container'>
                                  <img src={slide.url} alt={slide.alt} className="DGimg"/>
                                </div>
                              </div>
                              
                            
                            )
                          })
                        }
                        </Slider>
                    
                      

                    </div>
                    
                    {/* img updates every second, change later */}
   
                
              

      
            
            
            </div>
            
            

            <div className='Discovery-Text-Container'>
              {/* Song title */}
              <h2 className=""> {slides[index].songName} </h2> 
              {/* Song Artist */}
              <h2 className=""> {slides[index].author} </h2> 
            </div>
            
            {/* Swipe Box */}
            <div className='Discovery-Swipe-Container'{...swipeableProps}>

                {/* dislike */}
                <button onClick={() => {if (index === slides.length - 1) return;
                setIndex((prevIndex) => (prevIndex + 1) % slides.length);
                setDeny(deny + 1);
                dislikedIndexs.push(slides[index].audio);
                }} className='Discovery-Disike'>N</button>


                {/* like */}
                <button onClick={() => {if (index === slides.length - 1) return;
                setIndex((prevIndex) => (prevIndex + 1) % slides.length);
                setAccept(accept + 1);
                likedIndexs.push(slides[index].audio);
                }} className='Discovery-Like'>Y</button>

                
                
                
            
            </div>
            {/*Audio Player*/}
            <div className='Discovery-Player-Container'>
                
                {/* <div className={style.DGaudioPlayer}>  JACK */} 
                <div className=''>

                    
                    <audio ref={audioPlayer} src ={slides[index].audio} 
                    // autoPlay 
                    // 
                    preload="metadata"></audio>
                    {/*testing maybe going in audio player to fix not loading the proggress bar on start up onLoadedMetaData={onLoadedMetaData}  */}
                    

                    
                
                     
                    <button onClick={togglePlayPause} className={style.DGplayPause}>
                        {isPlaying ? <FaPause/> : <FaPlay className={style.DGplay}/>}
                        
                    </button>
                    
                    

                    {/*current time*/}
                    {/* removed for testing */}
                    {/* <div className={style.DGcurrentTime}>{calculateTime(currentTime)}</div> */}

                    {/*progress bar*/}
                    <div className=''>
                        <input type="range" 
                        // className={style.DGprogressBar}
                        className=''

                        defaultValue="0" ref={progressBar} onChange={changeRange} />

                    </div>

                    

                    {/*Duration*/}
                    {/* removed for testing*/}

                    {/* <div className={style.DGduration}>{(duration && !isNaN(duration)) && calculateTime(duration)}</div> */}

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