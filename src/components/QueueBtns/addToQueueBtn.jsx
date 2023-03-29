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
  } = React.useContext(MusicContext)

  const appendQueue = () => {
    if (play_list.length > 0) {
      console.log('adding to queue - component call')
      addToQueue(song);
      return
    }
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
