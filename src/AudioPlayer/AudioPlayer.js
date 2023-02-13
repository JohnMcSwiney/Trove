import React, {useState, useRef} from 'react';

import Reflection from '../mp3/Reflection.mp3'
import './AudioPlayer.css'
import {GoArrowLeft} from 'react-icons/go';
import {GoArrowRight} from 'react-icons/go';
import {FaPlay} from 'react-icons/fa';
import {FaPause} from 'react-icons/fa';


const AudioPlayer = () => {
    //state

    const [isPlaying, setIsPlaying] =  useState(false);

    //reference
    const audioPlayer = useRef(); //reference to the audio player

    

    const togglePlayPause = () => {

        const preValue = isPlaying;


        
        
        setIsPlaying(!preValue);
        
        if(isPlaying){
            audioPlayer.current.play();
            
        
        }else {
            audioPlayer.current.pause();

        }


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

            <div className='currentTime'>0:00</div>

            {/*progress bar*/}
            <div>
                <input type="range" className='progressBar'/>
            </div>


            {/*Duration*/}
            <div className='duration'>2:49</div>

        </div>
    );
}
 
export default AudioPlayer;