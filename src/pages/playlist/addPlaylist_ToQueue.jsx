import React, { useEffect, useState } from 'react'
import { MusicContext } from '../../contexts/MusicContext'
import {IoIosAdd} from 'react-icons/io'
import './addPlaylistQueue.css'


export default function AddPlaylist_ToQueue(songList) {
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
    addQueueList,
  } = React.useContext(MusicContext)

  const appendQueue = () => {
    
    console.log('adding entire playlist to queue - component call')
    // console.log(songList.input.length)
    // let song = [];
    addQueueList(songList.input)
    // let i = 0;
    // while(i < songList?.input.length){
    // //   console.log(songList.input[i])
    //   addToQueue(songList?.input[i])
    //   i++;
    
    // }
    // for(let x in songList?.input){
    //     // addToQueue(songList?.input[x]);
    //     song = songList.input[x];
    //     console.log(song)
    //     addToQueue(song)
    // }
    
    
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
