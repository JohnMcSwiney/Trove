import React, {useState, useRef, useEffect} from 'react';

import Reflection from '../mp3/Reflection.mp3'
import './AudioPlayer.css'
import {GoArrowLeft} from 'react-icons/go';
import {GoArrowRight} from 'react-icons/go';
import {FaPlay} from 'react-icons/fa';
import {FaPause} from 'react-icons/fa';


const AudioPlayer = () => {
    //state

    const [isPlaying, setIsPlaying] =  useState(false);
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

    return (  
        <div className="audioPlayer">
            <audio ref={audioPlayer} src ={Reflection}></audio>
            
            <button className='forwardBackward'><GoArrowLeft/> 30</button>
            
            <button onClick={togglePlayPause} className='playPause'>
                {isPlaying ? <FaPause/> : <FaPlay className='play'/>}
                
            </button>
            
            <button className='forwardBackward'> 30<GoArrowRight/></button>

            {/*current time*/}

            <div className='currentTime'>{calculateTime(currentTime)}</div>

            {/*progress bar*/}
            <div>
                <input type="range" className="progressBar" defaultValue="0" ref={progressBar} onChange={changeRange} />
            </div>


            {/*Duration*/}
            <div className="duration">{(duration && !isNaN(duration)) && calculateTime(duration)}</div>

        </div>
    );
}
 
export default AudioPlayer;