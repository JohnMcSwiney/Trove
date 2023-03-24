import React from "react";
import { useArtistAuthContext } from "../../hooks/useArtistAuthContext";
import EditModal from "../../components/edit modal/EditModal";
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
  }, [id]);

  const [artistEP, setArtistEP] = React.useState([]);
  React.useEffect(() => {
    const fetchMyEP = async () => {
      const response = await fetch(`/api/eps/artist-eps/${id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const json = await response.json();
      if (response.ok) {
        setArtistEP(json);
      }
    };
    fetchMyEP();
  }, [id]);

  const { artist } = useArtistAuthContext();

  // modal

  const [openModal, setOpenModal] = React.useState(false);
  return (
    <div>
      <h5>Hello {artist?.artistName} </h5>

      {artistSongs?.length > 0 && (
        <>
          <h3>Songs</h3>
          <table class="table table-dark table-bordered mysong">
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
                      <button
                        className="btn btn-info"
                        onClick={() => setOpenModal(true)}
                      >
                        Edit
                      </button>
                      {openModal && (
                        <EditModal
                          key={song._id}
                          song={song}
                          closeModal={setOpenModal}
                        />
                      )}
                    </th>
                    <th>Publish</th>
                  </tr>
                </tbody>
              ))}
          </table>
        </>
      )}

      {artistAlbums?.length > 0 && (
        <>
          <h3>Albums</h3>
          <table class="table table-dark table-bordered mysong">
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
                    <th>Edit</th>
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
