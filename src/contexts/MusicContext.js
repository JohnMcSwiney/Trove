import { createContext, useState } from "react";

//create the context
export const MusicContext = createContext();

// create a provider component to wrap the application

export const MusicProvider = ({ children }) => {
  const [currentSong, setCurrentSong] = useState(null);
  const [currentSongData, setCurrentSongData] = useState(null);
  const [playlists, setPlaylists] = useState([]);

  // function to update the currently playing song
  const updateCurrentSong = (song) => {
    setCurrentSong(song);
    setCurrentSongData(song);
  };

  const updatePlaylists = (newPlaylists) => {
    setPlaylists(newPlaylists);
  };

  const contextValue = {
    currentSong,
    currentSongData,
    updateCurrentSong,
    playlists,
    updatePlaylists,
  };

  return (
    <MusicContext.Provider value={contextValue}>
      {children}
    </MusicContext.Provider>
  );
};

// import React, { useContext } from "react";
// import { MusicContext } from "./MusicContext";

// const CurrentlyPlaying = () => {
//   // Access the context value for the current song
//   const { currentSong } = useContext(MusicContext);

//   return (
//     <div>
//       {currentSong ? (
//         <div>
//           <h2>Currently playing:</h2>
//           <p>{currentSong.title}</p>
//         </div>
//       ) : (
//         <p>No song currently playing</p>
//       )}
//     </div>
//   );
// };

// export default CurrentlyPlaying;

// import React, { useContext } from "react";
// import { MusicContext } from "./MusicContext";

// const Playlists = () => {
//   // Access the context value for the user's playlists
//   const { playlists } = useContext(MusicContext);

//   return (
//     <div>
//       <h2>My Playlists:</h2>
//       <ul>
//         {playlists.map((playlist) => (
//           <li key={playlist.id}>{playlist.name}</li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Playlists;
