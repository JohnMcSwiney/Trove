import React, { useEffect } from 'react'
import { MusicContext } from '../../contexts/MusicContext'

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

  return (
    <div>
      <button
        className='btn'
        onClick={() => {
          appendQueue()
        }}
      >
        + queue
      </button>
      
    </div>
  )
}
