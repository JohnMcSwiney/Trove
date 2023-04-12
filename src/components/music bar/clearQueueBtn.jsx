import React, { useEffect } from 'react'
import { MusicContext } from '../../contexts/MusicContext'

export default function ClearQueueBtn () {
  const {
    displayMusicBar,
    queuePosition,
    updateQueue,
    addToQueue,
    currentSong,
    updateCurrentSong,
    updateQueuePosition,
    currentSongData,
    playlists,
    play_list,
    queue,
    loopLevel,
    updateLoopLevel,
    updatePlay_list,
    clearPlay_list,
    clearQueue,
  } = React.useContext(MusicContext)

  const clearQueue1 = () => {
    if (play_list.length > 0) {
      console.log('clearing Play_list - component call')
      clearPlay_list()
      return
    }
  };

  const clearQueue2 = () => {
    if (queue.length > 0) {
      console.log('clearing queue - component call')
      clearQueue()
      return
    }
  };

  return (
    <div>
      <button
        className='btn'
        onClick={() => {
          clearQueue1()
        }}
      >
        Clear Play_list
      </button>
      <button
        className='btn text-white'
        onClick={() => {
          clearQueue2()
        }}
      >
        Clear Queue
      </button>
    </div>
  )
};
