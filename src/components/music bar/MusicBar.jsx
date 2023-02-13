import React, {useState} from 'react'
import NoSong from './NoSong.png';

import HeartIcon from '../../assets/Trv_icons/Trv_likeIcon_outline.svg'
import { RiFolderMusicFill, RiFolderMusicLine } from "react-icons/ri"
import { BsPlay, BsPause } from "react-icons/bs"
import { FaHeart, FaShareSquare, FaRegHeart, FaUserCircle } from "react-icons/fa"

import './musicbar.css'


import Trv_Chest from '../../assets/Trv_icons/Tvr_lib_icon.ico'

const MusicBar = () => {
    const songName = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
  const [isLiked, setIsLiked] = useState(false);
  const toggleLiked = () => {
    setIsLiked(!isLiked);
  }
  return (
   <>
        <div className='musicbar-wrap'>
            <div className='musicbar'>
                  {/* Song Progress and Range inp */}
                  <div className=''>
                    <input type="range" className= "progressBar" defaultValue="0 " onChange />
                  </div>
                 
              <div className='musicbar-items'>
                  
                 
              <div className='song-info'>
              <img src="" alt="Song Img" />
                  <p>Song name</p>
                  <p>Artist</p>
              </div>

             
              <div className='song-buttons'>
                  <p>left</p>
                  <p>right</p>
                  <p>stop</p>
                  
                      <p>Volume</p>
                      <p>Repeat</p>
                  
              </div>
                  
                  
                
              </div>
          
            </div>
          </div>
           
   </>

  )
}

export default MusicBar