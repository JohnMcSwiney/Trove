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
        <div className={`header ${
          small ? "small" : "header"
        }`}>
            <img className="waves "name="waves" src={WavesBG} alt="waves"/>

            {width > windowBreakpoint ? 
             "": <div 
              className="menu"
              onClick={handleClick}
              name="menu">
              <img name="menu" width="30vmin" src="../assets/menuicon.jpg" alt="menu"/>
              </div>}

        
            <div className="circle--border"> 
            <div className="genre--record">
                <img width="215vmin" src="../assets/artist_icon.png" alt="genre"/>
            </div>
            </div>
            <span><h1>USERNAME</h1> 
            <div className="row">
            <div className="column">
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
            <div className="column">
            <h5>{followers} FOLLOWERS</h5>
            <h5 id="following">{following} FOLLOWING</h5>
            </div></div>
            </span>

        </div>
        <div className={`profile--body ${
          showMenu ? "no--profile--view" : ""
        }`}>
        <br/><br/><br/><br/><br/><br/><br/><br/><br/>

        {/* User Top Recommendation Section */}
        <div className="latest--release">
        <h2>[User]'s Top Find</h2>
            {/* playing song w album cover, song title, and release date */}
           
           <div className="music--section">
           <div className="release--playing">
                    <br/>
                    <div className="row">
                    <div className="column rec--album">
                    <div className="song--cover">
                        <img src="../assets/reccover.jpg" alt="albumcover"/>
                    </div>

                    <AudioPlayer className="AudioPlayer" 
                    // autoPlay 
                    src={"../assets/song7.mp3"}
                    onPlay={e => console.log("onPlay")}
                    />
                    </div>
                    </div>
                    </div>
                    <div className="column rec--desc">
                        <h3>Song Name</h3>
                        <div className="row rec--namegenre">
                         <div className="column rec--artistname"><h4>ARTIST NAME</h4></div> 
                         <div className="column rec--genre"><h4>GENRE</h4></div> 
                        </div>
                        <p>Prism church-key yr, seitan kale chips poutine live-edge. Drinking vinegar green juice trust fund hexagon kale chips mustache chicharrones XOXO try-hard everyday carry forage. Brooklyn wolf godard, banh mi messenger bag sustainable gastropub banjo lo-fi brunch umami. Dreamcatcher chambray cray vibecession you probably haven't heard of them farm-to-table.</p>
                    </div>
                    
                    
            </div>
            

        </div>

        {/* User's Liked Music */}
        <div className="discography">
            {/* albums, singles displayed in a side scrolling section*/}
            <div className="music--section">
                <h4>DISCOVERIES</h4>
                <div className="slider discography">
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
        <div className="top--genres">
            <div className="music--section">
                    <h4>TOP GENRES</h4>
                    <div className="slider artists">
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