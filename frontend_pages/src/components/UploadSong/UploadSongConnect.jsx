import React, { useEffect, useState } from "react";
import MusicBar from "../ArtistProfile/musicBar/MusicBar";
import SideBar from "../ArtistProfile/Sidebar/Sidebar"
import WavesBG from "../../Vector.svg"
import MusicDetails from "./MusicDetails";
import { FilePond } from "filepond";
import  './UploadSong.css'; 
// import { Storage } from '@google-cloud/storage';

  
// This is how the normal users will see the artist profile
export default function UploadSongConnect(props) {
    const UploadSong = () => {

        const storage = new Storage({
          //the project id
          projectId: 'helical-analyst-376421',
      
          // path to keyfile.json
          keyFilename: 'C:\Users\javar\Documents\GitHub\Trove\backend_pages\keyFile.json'
        });
      
        //const bucket = storage.bucket('trv-test');
      
        const [title, setTitle] = useState('');
        const [genre, setGenre] = useState('');
        const [artist, setArtist] = useState('');
        const [album, setAlbum] = useState('');
        const [songFile, setSongFile] = useState(null);
        const [imageFile, setImageFile] = useState(null);
        const [isUploading, setIsUploading] = useState(false);
        const [uploadProgress, setUploadProgress] = useState(0);
      
        const handleSongFileChange = (e) => {
          setSongFile(e.target.files[0]);
        };
      
        const handleImageFileChange = (e) => {
          setImageFile(e.target.files[0]);
        };
      
        // const handleSubmit = (e) => {
        //   e.preventDefault();
        //   setIsUploading(true);
      
        //   //const storage = new Storage();
      
        //   storage
        //     .bucket('trv_test')
        //     .upload(songFile, {
        //       gzip: true,
        //       metadata: {
        //         cacheControl: 'public, max-age=31536000',
        //       },
        //       destination: `songs/${songFile.name}`,
        //       onUploadProgress: (progress) => {
        //         setUploadProgress(progress.bytesTransfered / progress.totalBytes * 100);
        //       }
        //     })
        //     .then(async ([songFile]) => {
        //       const songUrl = `https://storage.googleapis.com/${songFile.bucket.name}/${songFile.name}`;
      
        //       storage
        //         .bucket('trv_test')
        //         .upload(imageFile, {
        //           gzip: true,
        //           metadata: {
        //             cacheControl: 'public, max-age=31536000',
        //           },
        //           destination: `images/${imageFile.name}`,
        //           onUploadProgress: (progress) => {
        //             setUploadProgress(progress.bytesTransfered / progress.totalBytes * 100);
        //           }
        //         })
        //         .then(async ([imageFile]) => {
      
        //           const imgUrl = `https://storage.googleapis.com/${imageFile.bucket.name}/${imageFile.name}`;
      
        //           fetch('/api/songs', {
      
        //             method: 'POST',
        //             headers: {
        //               'Content-Type': 'application/json'
        //             },
        //             body: JSON.stringify({
        //               title,
        //               genre,
        //               artist,
        //               album,
        //               songUrl,
        //               imgUrl,
        //             })
        //           })
      
        //             .then(res => res.json())
      
        //             .then(data => {
        //               console.log(data);
        //               setIsUploading(false);
        //               setUploadProgress(0);
        //             })
        //             .catch((err) => {
        //               console.error(err);
        //               setIsUploading(false);
        //               setUploadProgress(0);
        //             });
        //         });
        //     });
        // };
      



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

        title: "",
        genre: "",
        artist: "",
        album: "",
        imageFile: albumCover,
        songFile: files



      }

    );


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
        event.preventDefault();
        setIsUploading(true);
    
        //const storage = new Storage();
    
        storage
          .bucket('trv_test')
          .upload(songFile, {
            gzip: true,
            metadata: {
              cacheControl: 'public, max-age=31536000',
            },
            destination: `songs/${songFile.name}`,
            onUploadProgress: (progress) => {
              setUploadProgress(progress.bytesTransfered / progress.totalBytes * 100);
            }
          })
          .then(async ([songFile]) => {
            const songUrl = `https://storage.googleapis.com/${songFile.bucket.name}/${songFile.name}`;
    
            storage
              .bucket('trv_test')
              .upload(imageFile, {
                gzip: true,
                metadata: {
                  cacheControl: 'public, max-age=31536000',
                },
                destination: `images/${imageFile.name}`,
                onUploadProgress: (progress) => {
                  setUploadProgress(progress.bytesTransfered / progress.totalBytes * 100);
                }
              })
              .then(async ([imageFile]) => {
    
                const imgUrl = `https://storage.googleapis.com/${imageFile.bucket.name}/${imageFile.name}`;
    
                fetch('/api/songs', {
    
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({
                    formData,
                   
                    title,
                    genre,
                    artist,
                    album,
                    songUrl,
                    imgUrl,
                  })
                })
    
                  .then(res => res.json())
    
                  .then(data => {
                    console.log(data);
                    setIsUploading(false);
                    setUploadProgress(0);
                  })
                  .catch((err) => {
                    console.error(err);
                    setIsUploading(false);
                    setUploadProgress(0);
                  });
              });
          });

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
                  <input type="file" name="imageFile" value="" accept="image/*" className="gradient--btn image--btn hide--file" onChange={handleChange}/> 
                      Choose Image <img src="../../assets/upload_icon.png" id="upload--icon" alt="upload_icon"/>
                  </label>
                
                  </div>

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

}