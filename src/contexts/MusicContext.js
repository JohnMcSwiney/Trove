import { createContext, useState, useEffect } from "react";

//create the context
export const MusicContext = createContext();

// create a provider component to wrap the application

export const MusicProvider = ({ children }) => {
  const [displayMusicBar, setDisplayMusicBar] = useState(false);
  
  const [currentSong, setCurrentSong] = useState(null);

  const [play_list, setPlay_list] = useState([]);
  const [play_listPosition, setPlay_listPosition] = useState(0);

  const [queue, setQueue] = useState([]);
  const [queuePosition, setQueuePosition] = useState(0);
  
  
  const[loopLevel, setLoopLevel] = useState(0);
  
  const updateDisplayMusicBar = (newDisplayMusicBar) => {
    setDisplayMusicBar(newDisplayMusicBar);
  };

  // function to update the currently playing song
  const updateCurrentSong = (song) => {
    if(displayMusicBar === false){
      updateDisplayMusicBar(true);
    }
    setCurrentSong(song);
  };

  //Play_list methods
  const updatePlay_list = (newPlaylists) => {
    setPlay_list(newPlaylists);
    // console.log(newPlaylists)
  };
  const updatePlay_listPosition = (newPlay_listPosition) => {
  
    setPlay_listPosition(newPlay_listPosition);

    if(play_list?.length !== newPlay_listPosition){
      updateCurrentSong(play_list[newPlay_listPosition]);
    }
  };

  const clearPlay_list = () => {
    if(play_list?.length!== 0){
    console.log("queue clearing");
    updatePlay_list([]);
    }
  };

  //queue methods
  const advanceQueue = () => {
    queue.shift();
  }
  const addToQueue = (song) => {
    queue.push(song);
    console.log(queue);
  }
  
  const updateQueuePosition = (newQueuePosition) => {
  
    setQueuePosition(newQueuePosition);

    if(play_list?.length !== newQueuePosition){
      updateCurrentSong(play_list[newQueuePosition]);
    }
  };

  const clearQueue = () => {
    if(queue?.length!== 0){
    
    setQueue([]);
    console.log(queue);
    }
  };
  

  const updateLoopLevel = (level) => {
    setLoopLevel(level);
  }

  useEffect (()=> {
    console.log("queue" + queue);
  },[queue])
  // play_list is the full list of songs
  // queue is a list that removes a song on listen and can be added to anytime
  // when a song is added to the queue it will pause the play_list position
  // somewhat convoluted, but it should work
  const contextValue = {
    displayMusicBar,
    updateDisplayMusicBar,

    currentSong,
    updateCurrentSong,

    play_list,
    play_listPosition,
    updatePlay_list,
    clearPlay_list,
    updatePlay_listPosition,

    queue,
    queuePosition,
    advanceQueue,
    addToQueue,
    clearQueue,
    updateQueuePosition,
    
    loopLevel,
    updateLoopLevel,
  };

  
  
  return (
    <MusicContext.Provider value={contextValue}>
      {children}
    </MusicContext.Provider>
  );
};

