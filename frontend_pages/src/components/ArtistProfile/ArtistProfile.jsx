import React, { useEffect, useState } from "react";
import AudioPlayer from 'react-h5-audio-player';
import MusicBar from "./musicBar/MusicBar";
import SideBar from "./Sidebar/Sidebar"
import WavesBG from "../../Vector.svg"
import albumList from "../../data/albums.json"
import relatedArtists from "../../data/relatedartists.json"
import ArtistAlbum from "./ArtistAlbum"
import RelatedArtist from "./RelatedArtist";
import  './ArtistProfile.css';
 
// This is how the normal users will see the artist profile
export default function ArtistProfile(props) {
    const [small, setSmall] = useState(false);
    const [follow, setFollow] = React.useState(false)
    const [followers, setFollowers] = React.useState(200)
    const [showMenu, setShowMenu] = React.useState(false)
    const [mobileMode, setMobileMode] = useState(false)
   

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
        <div className={`header ${
          small ? "small" : "header"
        }`}>
            <img className="waves "name="waves" src={WavesBG} alt="waves"/>


            {/* artist name, main genre, follower count, follow button '
                also display the artist's description
            */}
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
            <div className="artist--genre"><h5>ROCK</h5></div>
            <span><h1>ARTIST NAME</h1> 
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
            </div></div>
            </span>

        </div>
        <div className={`profile--body ${
          showMenu ? "no--profile--view" : ""
        }`}>
        <br/><br/><br/><br/><br/><br/><br/><br/><br/>

        <div className="latest--release">
        <h2>Artist's Pick</h2>
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
                        <p>Prism church-key yr, seitan kale chips poutine live-edge. Drinking vinegar green juice trust fund hexagon kale chips mustache chicharrones XOXO try-hard everyday carry forage. Brooklyn wolf godard, banh mi messenger bag sustainable gastropub banjo lo-fi brunch umami. Dreamcatcher chambray cray vibecession you probably haven't heard of them farm-to-table.</p>
                    </div>
                    
                    
            </div>
            

        </div>
        
        <div className="discography">
            {/* albums, singles displayed in a side scrolling section*/}
            <div className="music--section">
                <h4>DISCOGRAPHY</h4>
                <div className="slider discography">
                {
                    albumList && albumList.map((item, index)=>{
                    return(
                        <ArtistAlbum
                        key={index}
                        {...item}
                        />
                
                
                ) })}
                </div>

                
                
            </div>
        
        </div>
        <div className="similar--artists">
            {/* recommends artists that are similar to the  */}
            <div className="music--section">
                    <h4>SIMILAR ARTISTS</h4>
                    <div className="slider artists">
                {
                    relatedArtists && relatedArtists.map((item, index)=>{
                    return(          
                        <RelatedArtist
                            key={index}
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