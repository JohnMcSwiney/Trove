import React, {useState, useRef, useEffect} from 'react';
import { useSwipeable } from 'react-swipeable';
import style from './DiscoveryGame.module.css'
import {FaPlay} from 'react-icons/fa';
import {FaPause} from 'react-icons/fa';

import {BiArrowToLeft} from 'react-icons/bi';

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



    const slides = [
        {
          url: require('../imgs/Reflection.jpg'),
          alt: 'Image 1',
          header: 'Reflection',
          audio: require('../mp3/Reflection.mp3'),
          startTime: ('59'),
        },
        {
          url: require('../imgs/Resurrections.jpg'),
          alt: 'Image 2',
          header: 'Resurrections',
          audio: require('../mp3/Resurrections.mp3'),
          startTime: ('20'),
        },
        {
          url: require('../imgs/Farewell.jpg'),
          alt: 'Image 3',
          header: 'Farewell',
          audio: require('../mp3/Farewell.mp3'),
          startTime: ('45'),
        },
        {
          url: require('../imgs/Farewell.jpg'),
          alt: 'Image 3',
          header: 'Discovery Game Song List Done',
          audio: require('../mp3/Farewell.mp3'),
          startTime: ('30'),
        },
      ];
    
      const swipeableProps = useSwipeable({
        trackMouse: true,
        onSwipedLeft: () => {
          if (index === slides.length - 1) return;
          setIndex((prevIndex) => (prevIndex + 1) % slides.length);
          setAccept(accept + 1);
        },
        onSwipedRight: () => {
          if (index === slides.length - 1) return;
          setIndex((prevIndex) => (prevIndex + 1) % slides.length);
          setDeny(deny + 1);
        },
      });





    return (  
        <div className="div">
            <div className={style.container} {...swipeableProps}>

                <h2 className={style.SongName}>{slides[index].header}</h2>


                <div className={style.Redux}>
                <img src={slides[index].url} alt={slides[index].alt} className={style.trove__mp_img}/>
                

                <button onClick={() => {if (index === slides.length - 1) return;
                setIndex((prevIndex) => (prevIndex + 1) % slides.length);
                setDeny(deny + 1);
                }} className={style.SwipeRight}>Swipe right</button>


                <button onClick={() => {if (index === slides.length - 1) return;
                setIndex((prevIndex) => (prevIndex + 1) % slides.length);
                setAccept(accept + 1);
                }} className={style.SwipeLeft}>Swipe left</button>

                </div>

                <div className={style.audioPlayer}>


                    <audio ref={audioPlayer} src ={slides[index].audio} autoPlay preload="metadata"></audio>
                    {/*testing maybe going in audio player to fix not loading the proggress bar on start up onLoadedMetaData={onLoadedMetaData}  */}
                    
                    <button className={style.BackButton} onClick={() => {
                    if (index === 0) return;
                    setIndex((prevIndex) => (prevIndex + slides.length - 1) % slides.length);
                    }}><BiArrowToLeft/></button>
                    
                    <button onClick={togglePlayPause} className={style.playPause}>
                        {isPlaying ? <FaPause/> : <FaPlay className={style.play}/>}
                        
                    </button>
                    
                    

                    {/*current time*/}

                    <div className={style.currentTime}>{calculateTime(currentTime)}</div>

                    {/*progress bar*/}
                    <div>
                        <input type="range" className={style.progressBar} defaultValue="0" ref={progressBar} onChange={changeRange} />
                    </div>


                    {/*Duration*/}
                    <div className={style.duration}>{(duration && !isNaN(duration)) && calculateTime(duration)}</div>

                </div>
                
            
            </div>
                
            <div className={style.showNumber}>{accept}Left swipes </div>
            <br/>
            <div className={style.showNumber}>{deny}Right swipes</div>
        </div>
        
    );
}
 
export default DiscoveryGame;