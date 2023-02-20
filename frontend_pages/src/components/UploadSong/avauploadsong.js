import React, { useEffect, useState } from "react";
import MusicBar from "../ArtistProfile/musicBar/MusicBar";
import SideBar from "../ArtistProfile/Sidebar/Sidebar"
import WavesBG from "../../Vector.svg"
import MusicDetails from "./avamusicdetails";
import './UploadMusic.css';
// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// This is how the normal users will see the artist profile
export default function UploadMusic(props) {


    // Your web app's Firebase configuration
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
    const firebaseConfig = {
        apiKey: "AIzaSyAMBOXMTHSEKxID-wKEex3nmNoRqmm_wD4",
        authDomain: "helical-analyst-376421.firebaseapp.com",
        projectId: "helical-analyst-376421",
        storageBucket: "helical-analyst-376421.appspot.com",
        messagingSenderId: "376243716539",
        appId: "1:376243716539:web:224230609e73c04d8b049e",
        measurementId: "G-47B2D6EVKF"
    };

    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

    const storage = firebase.storage();

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
            if (width > windowBreakpoint) {
                setShowMenu(true);
            }
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

    function handleClick(event) {
        const { name } = event.target

        if (name === "follow") {
            setFollow(prevFollow => !prevFollow)
            if (!follow) {
                setFollowers(prevFollowers => prevFollowers + 1)
            } else {
                setFollowers(prevFollowers => prevFollowers - 1)
            }

            console.log(follow)

        } else if (name === "menu") {
            setShowMenu(prevShowMenu => !prevShowMenu)
            console.log(name)

        }


    };


    const [title, setTitle] = useState('');
    const [genre, setGenre] = useState('');
    const [artist, setArtist] = useState('');
    const [featuredArtists, setFeaturedArtists] = useState('');
    const [album, setAlbum] = useState('');
    const [highlightStart, setHighlightStart] = useState(0);
    const [highlightStop, setHighlightStop] = useState(0);
    const [songFile, setSongFile] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [releaseType, setReleaseType] = useState('');
    const [releaseYear, setReleaseYear] = useState(0);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    //const [songFile, setSongFile] = React.useState([]);

    const handleTitle = (e) => {
        setTitle(e.target.value);
    }

    const handleArtist = (e) => {
        setArtist(e.target.value);
    }

    const handleGenre = (e) => {
        setGenre(e.target.value);
    }

    const handleFeaturedArtists = (e) => {
        setFeaturedArtists(e.target.value);
    }

    const handleAlbumName = (e) => {
        setAlbum(e.target.value);
    }

    const handleHighlightStart = (e) => {
        setHighlightStart(e.target.value);
    }

    const handleHighlightStop = (e) => {
        setHighlightStop(e.target.value);
    }

    const handleSongFileChange = (e) => {
        setSongFile(e.target.files[0]);
    };

    const handleImageFileChange = (e) => {
        setImageFile(e.target.files[0]);
    };

    const handleReleaseType = (e) => {
        setReleaseType(e.target.value);
    }

    const handleReleaseYear = (e) => {
        setReleaseYear(e.target.value);
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        setIsUploading(true);

        const storageRef = storage.ref();
        const songRef = storageRef.child(`songs/${songFile.name}`);
        const songUploadTask = songRef.put(songFile, { contentType: 'audio/mp3' });

        console.log("songFile: " + songFile);

        console.log("songFile[0]: " + songFile[0]);

        console.log("songRef: " + songRef);

        songUploadTask.on(
            'state_changed',
            (snapshot) => {
                setUploadProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100);

                console.log("Bytes Transferred: " + snapshot.bytesTransferred);

                console.log("Total Bytes: " + snapshot.totalBytes);

                console.log("Loaded " + (snapshot.bytesTransferred / snapshot.totalBytes) * 100 + "%");
            },
            (error) => {
                console.error(error);
                setIsUploading(false);
            },

            async () => {
                const songUrl = await songRef.getDownloadURL();

                const imageRef = storageRef.child(`images/${imageFile.name}`);
                const imageUploadTask = imageRef.put(imageFile);

                console.log("imageFile: " + imageFile);

                console.log("imageFile[0]: " + imageFile[0]);

                console.log("imageRef: " + imageRef);

                imageUploadTask.on(
                    'state_changed',
                    (snapshot) => {
                        setUploadProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100);

                        console.log("Bytes Transferred: " + snapshot.bytesTransferred);

                        console.log("Total Bytes: " + snapshot.totalBytes);

                        console.log("Loaded " + (snapshot.bytesTransferred / snapshot.totalBytes) * 100 + "%");

                    },
                    (error) => {
                        console.error(error);
                        setIsUploading(false);
                    },

                    async () => {
                        const imgUrl = await imageRef.getDownloadURL();

                        fetch('/api/songs', {
                            method: 'POST',
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                title,
                                genre,
                                artist,
                                featuredArtists,
                                album,
                                highlightStart,
                                highlightStop,
                                songUrl,
                                imgUrl,
                                releaseType,
                                releaseYear,
                            })
                        })
                            .then(res => res.json())

                            .then((res) => {
                                console.log("End Response: " + res);
                                console.log("End Response Data: " + res.data);
                                setIsUploading(false);
                                setUploadProgress(0);
                            })
                            .catch((err) => {
                                console.error(err);
                                setIsUploading(false);
                                setUploadProgress(0);
                            });
                    },
                );
            },
        );
    }

    //     const default_album = "../../assets/default_upload.png";
    //     const [albumCover, setAlbumCover] = React.useState(formData.cover);
    //     const [files, setFiles] = React.useState([]);

    // function onChange(event) {
    //   console.log(event.target.files[0]);
    //   // setAlbumCover(event.target.files[0])
    //   setAlbumCover(URL.createObjectURL(event.target.files[0]))
    // }

    //     // React.useEffect(() => {
    //     //   console.log("files changed!");
    //     //   console.log(files);
    //     // }, [files]);

    // function handleChange(event) {
    //     const { name, value, type, checked } = event.target;

    //     if (type === "file") {
    //         setImageFile(URL.createObjectURL(event.target.files[0]));

    //     }

    //     setFormData(prevFormData => {

    //         return {
    //             ...prevFormData,
    //             [name]: type === "checkbox" ? checked : value,
    //             songFile: songFile
    //             // [name]: type === "file" ? value === setAlbumCover(URL.createObjectURL(event.target.files[0]))  : value

    //         }

    //     });

    //console.log(formData)
    // }

    //     function handleSubmit(event) {
    //       event.preventDefault()
    //       // submitToApi(formData)
    //       console.log(formData)

    //   }

    return (
        <section>
            {menu}
            <div className={`header ${small ? "small" : "header"
                }`}>
                <img className="waves " name="waves" src={WavesBG} alt="waves" />


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
                                <img src={imageFile} id="album--icon" alt="default_album" />
                            </div>
                            <label className="custom-file-upload">
                                <input type="file" name="imageFile" value="" accept="image/*" className="gradient--btn image--btn hide--file" onChange={handleImageFileChange} />
                                Choose Image <img src="../../assets/upload_icon.png" id="upload--icon" alt="upload_icon" />
                            </label>

                            <label className="custom-file-upload">
                                <input type="file" name="songFile" value="" accept="audio/*" className="gradient--btn image--btn hide--file" onChange={handleSongFileChange} />
                                Choose Song <img src="../../assets/upload_icon.png" id="upload--icon" alt="upload_icon" />
                            </label>

                        </div>

                        {/* Uncomment below  to see music details section of form, 
                    will be adding feature to navigate through both effectively */}

                        <MusicDetails
                            handleSubmit={handleSubmit}
                            handleTitle={handleTitle}
                            handleArtist={handleArtist}
                            handleGenre={handleGenre}
                            handleFeaturedArtists={handleFeaturedArtists}
                            handleAlbumName={handleAlbumName}
                            handleHighlightStart={handleHighlightStart}
                            handleHighlightStop={handleHighlightStop}
                            handleSongFileChange={handleSongFileChange}
                            handleImageFileChange={handleImageFileChange}
                            handleReleaseType={handleReleaseType}
                            handleReleaseYear={handleReleaseYear}
                        />
                    </div>
                </form>
            </div>


            <footer><MusicBar /></footer>


        </section>

    )

}