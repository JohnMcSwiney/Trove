import React, { useEffect, useState } from "react";
import MusicBar from "../ArtistProfile/musicBar/MusicBar";
import SideBar from "../ArtistProfile/Sidebar/Sidebar"
import WavesBG from "../../Vector.svg"
import MusicDetails from "./MusicDetails";
import { FilePond } from "filepond";
import  './UploadMusic.css'; 
 
  
// This is how the normal users will see the artist profile
export default function UploadMusic(props) {
    const [small, setSmall] = useState(false);
    const [follow, setFollow] = React.useState(false)
    const [followers, setFollowers] = React.useState(200)
    const [showMenu, setShowMenu] = React.useState(false)

   

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

    const default_album = "../../assets/default_upload.png";
    const [albumCover, setAlbumCover] = React.useState(default_album);
    const [files, setFiles] = React.useState([]);
    const [formData, setFormData] = React.useState(
      {
          songName: "",
          albumName: "", 
          highlightStart: 0,
          highlightStop: 0,
          genre: "", 
          cover: albumCover,
          releasetype:"",
          releaseYear: 0,
          artist: "", 
          files: files, 


      }

    );

    function onChange(event) {
      console.log(event.target.files[0]);
      // setAlbumCover(event.target.files[0])
      setAlbumCover(URL.createObjectURL(event.target.files[0]))
    }

    // React.useEffect(() => {
    //   console.log("files changed!");
    //   console.log(files);
    // }, [files]);

    function handleChange(event) {
      const {name, value, type, checked} = event.target;

      if(type === "file") {
        setAlbumCover(URL.createObjectURL(event.target.files[0]));

      }

      setFormData(prevFormData => {
       
        return {
            ...prevFormData,
            [name]: type === "checkbox" ? checked : value,
            files: files
            // [name]: type === "file" ? value === setAlbumCover(URL.createObjectURL(event.target.files[0]))  : value

            
        }
        
      })

      console.log(formData)
    }

    function handleSubmit(event) {
      event.preventDefault()
      // submitToApi(formData)
      console.log(formData)
    
  }

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

              <div>
              <span><h1>UPLOAD SONG</h1></span>
              </div>

              </div>
              <div className="upload--form">
              <form className="upload--form"
                onSubmit={handleSubmit}>

              <div className="row">
                  <div className="upload--image">
                  <div className="column upload--zone">
                  <img src={albumCover} id="album--icon" alt="default_album"/>
                  </div>
                  <label className="custom-file-upload">
                  <input type="file" name="cover" value="" accept="image/*" className="gradient--btn image--btn hide--file" onChange={handleChange}/> 
                      Choose Image <img src="../../assets/upload_icon.png" id="upload--icon" alt="upload_icon"/>
                  </label>
                
                  </div>

                    {/* Uncomment below  to see music details section of form, 
                    will be adding feature to navigate through both effectively */}

                    <MusicDetails
                      handleChange={handleChange}
                      formData={formData}
                      handleSubmit={handleSubmit}
                      files={files}
                      setFiles={setFiles}

                    /> 
                 
                  </div>
              </form>
              </div>

        
       <footer><MusicBar /></footer>
       

        </section>

    )

}