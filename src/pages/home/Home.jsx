import React from "react";
import { useArtistAuthContext } from "../../hooks/useArtistAuthContext";

import SongModel from "../../components/modals/song modal/SongModal";
import AlbumModel from "../../components/modals/album modal/AlbumModal";
import EPModel from "../../components/modals/ep modal/EPModal";
const Home = () => {
  const [artistSongs, setArtistSongs] = React.useState(null);
  const [artistAlbums, setArtistAlbum] = React.useState(null);
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
  }, [id]);

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
    console.log("fetch album");
  }, [id]);

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
    console.log("fetch ep");
  }, [id]);

  const { artist } = useArtistAuthContext();

  // modal
  const [show, setShow] = React.useState(false);

  return (
    <div className="artist--home">
      <h5>Hello, {artist?.artistName} </h5>

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
            {artistSongs &&
              artistSongs.map((song) => (
                <tbody>
                  <tr key={song._id}>
                    <th scope="row">{song.title}</th>
                    <th>{song.isVerified}</th>
                    <th>
                      <SongModel song={song} />
                    </th>
                    <th>Published</th>
                  </tr>
                </tbody>
              ))}
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
                      <AlbumModel />
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
          <table class="table table-dark table-bordered mysong">
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
                      <EPModel />
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
