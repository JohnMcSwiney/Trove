import React, {useState, useRef, useEffect} from 'react';
import { useSwipeable } from 'react-swipeable';
import style from './DiscoveryGame.module.css'
import {FaPlay} from 'react-icons/fa';
import {FaPause} from 'react-icons/fa';

import {BiArrowToLeft} from 'react-icons/bi';

import tempImg from './NoSong.png'

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
          url: {tempImg},
          alt: 'Image 1',
          songName: 'temp',
          author:'temp',
          audio: require('https://storage.googleapis.com/trv_test/DiscoveryGameTracks/01%20-%20XTC%20-%20Mayor%20Of%20Simpleton.mp3'),
          startTime: ('59'),
        },
        {
            url: {tempImg},
            alt: 'Image 1',
            songName: 'temp',
            author:'temp',
            audio: require('https://storage.googleapis.com/trv_test/DiscoveryGameTracks/02%20-%20King%20Gizzard%20And%20The%20Lizard%20Wizard%20-%20Pop%20In%20My%20Step.mp3'),
            startTime: ('59'),
          },
          {
            url: {tempImg},
            alt: 'Image 1',
            songName: 'temp',
            author:'temp',
            audio: require(`https://storage.googleapis.com/trv_test/DiscoveryGameTracks/03%20-%20Vengaboys%20-%20Boom%2C%20Boom%2C%20Boom%2C%20Boom!!.mp3`),
            startTime: ('59'),
          },
          {
            url: {tempImg},
            alt: 'Image 1',
            songName: 'temp',
            author:'temp',
            audio: require('https://storage.googleapis.com/trv_test/DiscoveryGameTracks/04%20-%20The%20Darkness%20-%20I%20Believe%20in%20a%20Thing%20Called%20Love.mp3'),
            startTime: ('59'),
          },
          {
            url: {tempImg},
            alt: 'Image 1',
            songName: 'temp',
            author:'temp',
            audio: require('https://storage.googleapis.com/trv_test/DiscoveryGameTracks/05%20-%20The%20Olivia%20Tremor%20Control%20-%20Green%20Typewriters.mp3'),
            startTime: ('59'),
          },
          {
            url: {tempImg},
            alt: 'Image 1',
            songName: 'temp',
            author:'temp',
            audio: require('https://storage.googleapis.com/trv_test/DiscoveryGameTracks/06%20-%20Blake%20Mills%20-%20Hey%20Lover.mp3'),
            startTime: ('59'),
          },
          {
            url: {tempImg},
            alt: 'Image 1',
            songName: 'temp',
            author:'temp',
            audio: require(`https://storage.googleapis.com/trv_test/DiscoveryGameTracks/07%20-%20Grandaddy%20-%20Now%20It's%20On.mp3`),
            startTime: ('59'),
          },
          {
            url: {tempImg},
            alt: 'Image 1',
            songName: 'temp',
            author:'temp',
            audio: require('https://storage.googleapis.com/trv_test/DiscoveryGameTracks/08%20-%20Elf%20Power%20-%20Temporary%20Arm.mp3'),
            startTime: ('59'),
          },
          {
            url: {tempImg},
            alt: 'Image 1',
            songName: 'temp',
            author:'temp',
            audio: require('https://storage.googleapis.com/trv_test/DiscoveryGameTracks/09%20-%20The%20Magnetic%20Fields%20-%20You%20and%20Me%20and%20the%20Moon.mp3'),
            startTime: ('59'),
          }
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
            <div className={style.DGcontainer} {...swipeableProps}>

                <h2 className={style.DGSongName}>{slides[index].songName}</h2>
                <h2 className={style.DGauthor}>{slides[index].author}</h2>


                <div className={style.DGRedux}>
                <img src={slides[index].url} alt={slides[index].alt} className={style.trove__mp_img}/>
                

                <button onClick={() => {if (index === slides.length - 1) return;
                setIndex((prevIndex) => (prevIndex + 1) % slides.length);
                setDeny(deny + 1);
                }} className={style.DGSwipeRight}>Swipe right</button>


                <button onClick={() => {if (index === slides.length - 1) return;
                setIndex((prevIndex) => (prevIndex + 1) % slides.length);
                setAccept(accept + 1);
                }} className={style.DGSwipeLeft}>Swipe left</button>

                </div>

                <div className={style.DGaudioPlayer}>


                    <audio ref={audioPlayer} src ={slides[index].audio} autoPlay preload="metadata"></audio>
                    {/*testing maybe going in audio player to fix not loading the proggress bar on start up onLoadedMetaData={onLoadedMetaData}  */}
                    
                    <button className={style.DGBackButton} onClick={() => {
                    if (index === 0) return;
                    setIndex((prevIndex) => (prevIndex + slides.length - 1) % slides.length);
                    }}><BiArrowToLeft/></button>
                    
                    <button onClick={togglePlayPause} className={style.DGplayPause}>
                        {isPlaying ? <FaPause/> : <FaPlay className={style.DGplay}/>}
                        
                    </button>
                    
                    

                    {/*current time*/}

                    <div className={style.DGcurrentTime}>{calculateTime(currentTime)}</div>

                    {/*progress bar*/}
                    <div>
                        <input type="range" className={style.DGprogressBar} defaultValue="0" ref={progressBar} onChange={changeRange} />

                    </div>


                    {/*Duration*/}
                    <div className={style.DGduration}>{(duration && !isNaN(duration)) && calculateTime(duration)}</div>

                </div>
                
            
            </div>
                
            <div className={style.DGshowNumber}>{accept}Left swipes </div>
            <br/>
            <div className={style.DGshowNumber}>{deny}Right swipes</div>
        </div>
        
    );
}
 
export default DiscoveryGame;