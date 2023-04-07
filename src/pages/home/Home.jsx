import React from "react";
import { useArtistAuthContext } from "../../hooks/useArtistAuthContext";

import SongModal from "../../components/modals/song modal/SongModal";
import AlbumModel from "../../components/modals/album modal/AlbumModal";
import EPModel from "../../components/modals/ep modal/EPModal";
import { NavLink, useNavigate } from "react-router-dom";
import './home.css'

const Home = () => {
  const [artistSongs, setArtistSongs] = React.useState([]);
  const [artistAlbums, setArtistAlbum] = React.useState([]);
  const artistInfo = JSON.parse(localStorage.getItem("artist"));
  const id = artistInfo ? artistInfo.id : null;
  React.useEffect(() => {
    const fetchMySongs = async () => {
      const response = await fetch(`/api/songs/artist-songs/${id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const json = await response.json();
      if (response.ok) {
        setArtistSongs(json);
      }
    };
    fetchMySongs();
  }, []);

  React.useEffect(() => {
    const fetchMyAlbums = async () => {
      const albumResponse = await fetch(`/api/albums/artist-albums/${id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const json = await albumResponse.json();
      if (albumResponse.ok) {
        setArtistAlbum(json);
      }
    };
    fetchMyAlbums();
  }, []);

  const [artistEPs, setArtistEPs] = React.useState([]);
  React.useEffect(() => {
    const fetchMyEP = async () => {
      const response = await fetch(`/api/eps/artist-eps/${id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const json = await response.json();
      if (response.ok) {
        setArtistEPs(json);
      }
    };
    fetchMyEP();
    
  }, []);


  const [artists, setArtists] = React.useState([]);
  React.useEffect(()=>{
    const fetchArtists = async () => {
      const response = await fetch(`/api/artists`,{
        method:"GET",
        headers:{"Content": "application/json"}
      })
      const json = await response.json();
      
        setArtists(json)
      
    }
    fetchArtists()
  }, [])

  const { artist } = useArtistAuthContext();

  // modal
  const [show, setShow] = React.useState(false);

  return (
    <div className="artist--home">
      <div className="artist--welcome">
      {/* <h5>Hello, {artist ? <span className="artist--namespan">{artist?.artistName}</span> : <NavLink to={"/login"}>please sign in.</NavLink>} </h5> */}


      {artist ? <h5>Hello, <span className="artist--namespan">{artist?.artistName}</span></h5> :
        <div className="artist--welcome">
        Hello, <NavLink to={"/login"}>please sign in.</NavLink>
        </div>
      }
      </div>
      
      {artistSongs?.length > 0 && (
        <>
          <h3>Songs</h3>
          <table class="table table-light table-bordered mysong">
            <thead>
              <tr>
                <th scope="col">Song</th>
                <th scope="col">Status</th>
                <th scope="col">Edit</th>
                <th scope="col">Publish</th>
              </tr>
            </thead>
            <tbody>
            {artistSongs &&
              artistSongs.map((song) => (
                <tr key={song._id}>
                  <th scope="row">{song.title}</th>
                 
                  <th>{song?.isVerified}</th>
                 
                  <th>
                    <SongModal
                      song={song}
                      artistData={artists}
                      albumData={artistAlbums}
                      epData={artistEPs}
                    />
                  </th>
                  <th>{song?.isPublished}</th>
                </tr>
              ))}
              </tbody>
          </table>
        </>
      )}

      {artistAlbums?.length > 0 && (
        <>
          <h3>Albums</h3>
          <table class="table table-light table-bordered mysong">
            <thead>
              <tr>
                <th scope="col">Album</th>
                <th scope="col">Status</th>
                <th scope="col">Edit</th>
                <th scope="col">Publish</th>
              </tr>
            </thead>
            {artistAlbums &&
              artistAlbums.map((album) => (
                <tbody>
                  <tr key={album._id}>
                    <th scope="row">{album?.albumName}</th>
                    <th>{album?.isVerified}</th>
                    <th>
                      <AlbumModel album={album} songs={artistSongs}  />
                    </th>
                    <th>Publish</th>
                  </tr>
                </tbody>
              ))}
          </table>
        </>
      )}

      {artistEPs?.length > 0 && (
        <>
          <h3>EPs</h3>
          <table class="table table-light table-bordered mysong">
            <thead>
              <tr>
                <th scope="col">EP</th>
                <th scope="col">Status</th>
                <th scope="col">Edit</th>
                <th scope="col">Publish</th>
              </tr>
            </thead>
            {artistEPs &&
              artistEPs.map((ep) => (
                <tbody>
                  <tr key={ep._id}>
                    <th scope="row">{ep?.epName}</th>
                    <th>{ep?.isVerified}</th>
                    <th>
                      <EPModel ep={ep} songs = {artistSongs}  />
                    </th>
                    <th>Publish</th>
                  </tr>
                </tbody>
              ))}
          </table>
        </>
      )}
    </div>
  );
};

export default Home;
