import React, { useEffect } from 'react'
import { MusicContext } from '../../contexts/MusicContext'
import {IoIosRemove} from 'react-icons/io';
export default function RemoveFromQueueBtn (index) {
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

  const removeFrmQueue = () => {
    console.log('removing from queue - component call')
    removeFromQueue(index);
    // if (play_list.length > 0) {
      
    // }
  }

  return (
      <button
        className='removeFromQueueButton'
        onClick={() => {
            removeFrmQueue()
        }}
      >
        <IoIosRemove/>
      </button>
  )
}
