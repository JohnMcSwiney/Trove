import React, { useEffect, useState } from "react";
import AudioPlayer from 'react-h5-audio-player';
import MusicBar from "../ArtistProfile/musicBar/MusicBar";
import SideBar from "../ArtistProfile/Sidebar/Sidebar"
import WavesBG from "../../Vector.svg"
import TopGenre from "./TopGenres";
import topGenres from "../../data/topgenres.json";
import SongList from "./SongList";
import songsList from "../../data/songslist.json";
import  './userProfile.css';

// This is how the normal users will see the artist profile
export default function UserProfile(props) {
      // State for large vs small header
      const [small, setSmall] = useState(false);
      // following states 
        const [follow, setFollow] = React.useState(false)
        const [followers, setFollowers] = React.useState(200)
        const [following, setFollowing] = React.useState(392)
      // menu 
        const [showMenu, setShowMenu] = React.useState(false)


  // Checking window size 
    const windowBreakpoint = 480;

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", () =>
        setSmall(window.pageYOffset > 200)
      );
    }
  }, []); 

    const useViewport = () => {
    const [width, setWidth] = React.useState(window.innerWidth);
  
    React.useEffect(() => {
      const handleWindowResize = () => setWidth(window.innerWidth);
      window.addEventListener("resize", handleWindowResize);
        if(width > windowBreakpoint) {
        setShowMenu(true); }
        else {
            setShowMenu(false)
        }

      return () => window.removeEventListener("resize", handleWindowResize);
    }, []);
  
    // Return the width so we can use it in our components
    return { width };
  }
 
  const { width } = useViewport();

  let menu;
  if (showMenu) {
         menu = <SideBar />

  } 

  // Set followers 
    function handleClick(event)
        
     {
        const {name} = event.target

        if(name === "follow") {
        setFollow(prevFollow => !prevFollow) 
        if(!follow) {
            setFollowers(prevFollowers => prevFollowers+1) 
        } else {
            setFollowers(prevFollowers => prevFollowers-1) 
        }

        console.log(follow)

        } else if(name === "menu") {
            setShowMenu(prevShowMenu => !prevShowMenu) 
            console.log(name) 
            
        }

        
     };

    return( 
        <section>
        {menu}

        {/* HEADER */}
        <div className={`user--header ${
          small ? "user--small" : "user--header"
        }`}>
            <img className="user--waves "name="waves" src={WavesBG} alt="waves"/>

            {width > windowBreakpoint ? 
             "": <div 
              className="user--menu"
              onClick={handleClick}
              name="menu">
              <img name="menu" width="30vmin" src="../assets/menuicon.jpg" alt="menu"/>
              </div>}

        
            <div className="user--circle--border"> 
            <div className="user--genre--record">
                <img width="215vmin" src="../assets/artist_icon.png" alt="genre"/>
            </div>
            </div>
            <span><h1>USERNAME</h1> 
            <div className="user--row">
            <div className="user--column">
            <button 
                className={`
                ${
                    follow ? "followed" : "follow--button"
                  } `}
                onClick={handleClick}
                value="nofollow"
                name="follow"
            >{`${
                follow ? "FOLLOWING" : "FOLLOW"
              } `}</button>
              </div>
            <div className="user--column">
            <h5>{followers} FOLLOWERS</h5>
            <h5 id="following">{following} FOLLOWING</h5>
            </div></div>
            </span>

        </div>
        <div className={`user--profile--body ${
          showMenu ? "user--no--profile--view" : ""
        }`}>
        <br/><br/><br/><br/><br/><br/><br/><br/><br/>

        {/* User Top Recommendation Section */}
        <div className="user--latest--release">
        <h2>[User]'s Top Find</h2>
            {/* playing song w album cover, song title, and release date */}
           
           <div className="user--music--section">
           <div className="user--release--playing">
                    <br/>
                    <div className="user--row">
                    <div className="user--column rec--album">
                    <div className="user--song--cover">
                        <img src="../assets/reccover.jpg" alt="albumcover"/>
                    </div>

                    <AudioPlayer className="user--AudioPlayer" 
                    // autoPlay 
                    src={"../assets/song7.mp3"}
                    onPlay={e => console.log("onPlay")}
                    />
                    </div>
                    </div>
                    </div>
                    <div className="user--column user--rec--desc">
                        <h3>Song Name</h3>
                        <div className="user--row user--rec--namegenre">
                         <div className="user--column user--rec--artistname"><h4>ARTIST NAME</h4></div> 
                         <div className="user--column user--rec--genre"><h4>GENRE</h4></div> 
                        </div>
                        <p>Prism church-key yr, seitan kale chips poutine live-edge. Drinking vinegar green juice trust fund hexagon kale chips mustache chicharrones XOXO try-hard everyday carry forage. Brooklyn wolf godard, banh mi messenger bag sustainable gastropub banjo lo-fi brunch umami. Dreamcatcher chambray cray vibecession you probably haven't heard of them farm-to-table.</p>
                    </div>
                    
                    
            </div>
            

        </div>

        {/* User's Liked Music */}
        <div className="user--discography">
            {/* albums, singles displayed in a side scrolling section*/}
            <div className="user--music--section">
                <h4>DISCOVERIES</h4>
                <div className="user--slider user--discography">
                {
                    songsList && songsList.map((item, index)=>{
                    return(
                        <SongList
                        key={index}
                        {...item}
                        />
                
                
                ) })}
                </div>

                
                
            </div>
        
        </div>

        {/* User's top genres */}
        <div className="user--top--genres">
            <div className="user--music--section">
                    <h4>TOP GENRES</h4>
                    <div className="user--slider user--artists">
                {
                    topGenres && topGenres.map((item, index)=>{
                      console.log(index)
                      return(          
                        <TopGenre
                            key={index}
                            index={index + 1}
                            {...item}
                            /> 
                ) })}


                    </div>

            </div>
        
        </div>

        
        </div>
       <footer><MusicBar /></footer>
       

        </section>

    )

}