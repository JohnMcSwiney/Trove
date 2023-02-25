import React from "react";

import axios from "axios";
import './AlbumPage.css';
import NavBar from './nav bar/NavBar';
// import albumsongs from "../../data/albumsongs.json"
import AlbumSong from "./AlbumSong";

const client = axios.create({
    baseURL: "http://localhost:8080/api/songs",

  });

// User's Top Genres
export default function AlbumPage(props) {
    const [albumSongs, setAlbumSongs] = React.useState(null);

    React.useEffect(() => {
        async function getAlbumSongs() {
          const response = await client.get("/");
          setAlbumSongs(response.data);

          console.log(albumSongs)
        }
        getAlbumSongs();
      }, []);
    
      if (!albumSongs) return null;

    return (
        <section>
            {/* HEADER */}
            <div className="album--header">
                <img className="album--back" src="../../assets/backpage.png" alt="back--button"  />
                <h1>Album</h1> 
                <div className="album--circle--border"> 
                    <div className="album--artist--icon">
                    <img width="215vmin" src="../assets/artist_icon.png" alt="genre"/>
                    </div>
                </div>
            </div>

            {/* ALBUM COVER / INFO */}
            <div className="album--info">
                <div className="album--song--cover">
                        <img src={albumSongs[0].imgUrl} alt="albumcover"/>
                        {/* "../assets/reccover.jpg"  */}
                </div>
                <div className="album--stats--info">
                        <h3>{albumSongs[0].title}</h3> 
                        {/* ^ Should be album's name, but can't use it yet, so improvising */}
                        <h6><span>{albumSongs[0].genre}</span></h6>
                       <div className="album--release--info">
                        <h5>2014</h5>
                        <h6>ALBUM</h6>
                        </div>
                        <h4>Artist Name</h4>
                </div>
            </div>

            {/* SONGS */}
            <div className="album--songs">
            {
                    albumSongs && albumSongs.map((item, index)=>{
                    return(
                        <AlbumSong
                        key={index}
                        {...item}

                        />
                
                
                ) })}
            </div>

            <NavBar />
        </section>

    )

}