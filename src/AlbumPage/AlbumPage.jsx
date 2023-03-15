import React from "react"

import './AlbumPage.css';
// import NavBar from './nav bar/NavBar';
import albumsongs from "../data/albumsongs.json"
import AlbumSong from "./AlbumSong";

//fetching
import { useParams } from "react-router-dom";

// User's Top Genres
export default function AlbumPage() {
    let { id } = useParams();


    const [album, setAlbum] = React.useState(null);
    React.useEffect(() => {
        const fetchAlbum = async () => {
          const albumResponse = await fetch(`/api/albums/${id}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          });
          const albumJson = await albumResponse.json();
          if (albumResponse.ok) {
            setAlbum(albumJson);
          }
        };
        fetchAlbum();
      }, [id]);

      const [artist, setArtist] = React.useState(null);
      React.useEffect(() => {
        const findArtist = async () => {
          const response = await fetch(`/api/artists/${album.artist}`);
          const json = await response.json();
    
          if (!response.ok) {
            console.log(json.error);
          }
    
          if (response.ok) {
            setArtist(json);
          }
        };
        findArtist();
      }, [album]);

    return (
        <section>
            {/* HEADER */}

            {/* ALBUM COVER / INFO */}
            <div className="album--info">
                <div className="album--song--cover">
                        <img src={album && album.albumArt} alt="albumcover"/>
                </div>
                <div className="album--stats--info">
                        <h3>{album && album.albumName}</h3>
                        <h6><span>{album && album.albumGenre.toUpperCase()}</span></h6>
                       <div className="album--release--info">
                        <h5>{album && album.releaseYear}</h5>
                        <h6>{album && album.releaseType}</h6>
                        </div>
                        <h4>{artist && artist.artistName}</h4>
                </div>
            </div>

            {/* SONGS */}
            <div className="album--songs">
            {
                    artist.songList && artist.songList.map((item, index)=>{
                    return(
                        <AlbumSong
                        key={index}
                        {...item}

                        />
                
                
                ) })}
            </div>

            {/* <NavBar /> */}
        </section>
    )

}