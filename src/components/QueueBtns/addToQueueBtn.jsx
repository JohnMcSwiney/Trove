import React, { useEffect, useState } from 'react'
import { MusicContext } from '../../contexts/MusicContext'
import {IoIosAdd} from 'react-icons/io'
import './addToQueueBtn.css'


export default function AddToQueueBtn (song) {
  const {
    displayMusicBar,
    queuePosition,
    updateQueue,
    addToQueue,
    play_list,
    loopLevel,
    updateLoopLevel,
    updatePlay_list,
    clearPlay_list,
    clearQueue,
    removeFromQueue,
  } = React.useContext(MusicContext)

  const appendQueue = () => {
    
    console.log('adding to queue - component call')
    addToQueue(song);
    // if (play_list.length > 0) {
      
    // }
  }
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (isActive) {
      setTimeout(() => {
        setIsActive(false);
      }, 700);
    }
  }, [isActive]);

  const handleClick = () => {
    setIsActive(true);
  };
  return (
    <div className={`addQueueCont ${isActive ? "addQueueClicked" : ""}`}
    onClick={handleClick}
    >
      <button
        className='addQueueBtn'
        onClick={() => {
          appendQueue()
        }}
      >
        <IoIosAdd/>
        
        
      </button>
      <div className='addQueueTxt'>
       <p 
       className='
       addQueueAddQuery
       '>Add to queue</p>
       <p 
       className='
       addQueueAdded
       '>Added!</p>
        </div>
      
    </div>
  )
}
