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
  
  
  const[curr_DiscoveryDecision, setCurr_DiscoveryDecision] = useState("water/ice/salt(aye)");
  const[discovery_Decision_List, updateDiscovery_Decision_List] = useState([]);

  const[isPlay_Global, setIsPlay_Global] = useState(false);  

  const updateDisplayMusicBar = (newDisplayMusicBar) => {
    setDisplayMusicBar(newDisplayMusicBar);
  };

  // function to update the currently playing song
  const updateCurrentSong = (song) => { 
    console.log(song);
    setCurrentSong(song);
    if(displayMusicBar === false){
      updateDisplayMusicBar(true);
    }
    

  };

  //Play_list methods
  const updatePlay_list = (newPlaylists) => {
    
    setPlay_list(newPlaylists);
    
    return;
    // console.log(newPlaylists)
  };
  const updatePlay_listPosition = (newPlay_listPosition) => {
    console.log();
    setPlay_listPosition(newPlay_listPosition);

    if(play_list?.length !== newPlay_listPosition){
      updateCurrentSong(play_list[newPlay_listPosition]);
      
    }
    
  };

  const clearPlay_list = () => {
    if(play_list?.length!== 0){
    console.log("play_list clearing");
    updatePlay_list([]);
    }
  };

  //queue methods
  const advanceQueue = () => {
    if(currentSong !== queue[0]){
      updateCurrentSong(queue[0]);
    } else {
      queue.shift();
      updateCurrentSong(queue[0]);
    }
    // console.log(queue.length);
    
    // console.log("queue being added into system or whatever (pre shift)");
    // console.log(queue[0])
    // console.log()
    // console.log(queue)
    // queue.shift();
    // console.log("queue being added into system or whatever (post shift)");
    // console.log(queue[0])
    // console.log()
    // console.log(queue)
    // console.log("queue:")
    
    // updateCurrentSong(queue[0]);
  };

  const addToQueue = (inputtedItem) => {
    console.log(inputtedItem.song);
    queue.push(inputtedItem.song);
    
    // console.log(queue.song);
    if(displayMusicBar === false ){
      updateDisplayMusicBar(true);
      if(play_list.length === 0 && queue.length === 0){
        updateCurrentSong(queue[0]);
      }
      
    }
  };

  const addQueueList = (inputtedItem) => {  
    let i = 0;
    if(inputtedItem.length === 0 ){
      return
    } else {
      while(i < inputtedItem.length){
          queue.push(inputtedItem[i])
          i++;
        }
    }
    
    if(queue){
      if(displayMusicBar === false ){
        updateDisplayMusicBar(true);
        // console.log(queue[0])
        if(play_list.length === 0){
          updateCurrentSong(queue[0]);
          // toggleIsPlay_G();
        }       
      }
    }
    
  };

  const updateQueuePosition = (newQueuePosition) => {
  
    setQueuePosition(newQueuePosition);

    if(queue?.length !== newQueuePosition){
      updateCurrentSong(queue[newQueuePosition]);
      
    }
  };

  const clearQueue = () => {
    if(queue?.length!== 0){
    console.log("queue clearing");
    setQueue([]);
    
    }
  };
  const removeFromQueue = (index) => {
    console.log("remove" + index.index);  
    console.log("old" + queue);
    const newArray = [...queue.slice(0, index.index), ...queue.slice(index.index + 1)];
      
      setQueue(newArray);
      console.log("new" + queue); 
  };

  const updateLoopLevel = (level) => {
    setLoopLevel(level);
  };
  // discovery_decision_add,
  // clear_discovery_decision_list,

  const discovery_decision_add = (decision, songId) =>{
    let entry = `${decision}` + " " + `${songId}`;
    discovery_Decision_List.push(entry)
    console.log("List (item added):");
    console.log(discovery_Decision_List);
  };
  const clear_discovery_decision_list = () => {
    
    console.log('command recieved to clear DG list');
    console.log("list before:");
    console.log(discovery_Decision_List);

    updateDiscovery_Decision_List([]);

    // console.log("list after:");
    // console.log(discovery_Decision_List);
  };
  useEffect (() => {

    if(play_list){
      console.log(play_list.length);
      if (play_list.length === 0){
        console.log('play_list exists but empty')
      } else {
        console.log('play_list exists')
        console.log(play_list);

        console.log('queue length')
        console.log(queue.length);
        if(queue){
          if(queue.length === 0){
            updatePlay_listPosition(0)
          } else {
            return
          }
        } else {
          updatePlay_listPosition(0)
        }
      }
      toggleIsPlay_G();
    } else {
      
    }
  },[play_list])
  useEffect (() => {

  })
  // const[isPlay_Global, setIsPlay_Global] = useState(false);  
  const toggleIsPlay_G = () => {
    const prevValue = isPlay_Global
    console.log("global isPlaying : " + isPlay_Global);
    setIsPlay_Global(!prevValue)
    
  };

  // useEffect (()=> {
  //   console.log("queue" + queue);
  // },[queue])
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
    removeFromQueue,
    addQueueList,

    loopLevel,
    updateLoopLevel,
    
    isPlay_Global,
    toggleIsPlay_G,
    setIsPlay_Global,

    curr_DiscoveryDecision,
    setCurr_DiscoveryDecision,
    discovery_Decision_List,
    updateDiscovery_Decision_List,
    discovery_decision_add,
    clear_discovery_decision_list,
  };

  
  
  return (
    <MusicContext.Provider value={contextValue}>
      {children}
    </MusicContext.Provider>
  );
};

