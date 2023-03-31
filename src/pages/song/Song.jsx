import React from "react";
import SongModal from "../../components/modals/song modal/SongModal";

const Song = () => {
  const [songs, setSongs] = React.useState([]);
  const [errors, setErrors] = React.useState(null);
  const allSongs = React.useEffect(() => {
    const fetchSongs = async () => {
      const response = await fetch("/api/songs", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      const json = await response.json();
      if (!response.ok) {
        setErrors(json.error);
        return;
      }

      if (response.ok) {
        setSongs(json);
      }
    };
    fetchSongs();
  }, []);

  const [artistData, setArtistData] = React.useState([]);
  React.useEffect(() => {
    const fetchAllArtist = async () => {
      const response = await fetch("/api/artists/", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const json = await response.json();

      if (response.ok) {
        setArtistData(json);
      }
    };
    fetchAllArtist();
  }, []);

  const [albumData, setAlbumData] = React.useState([]);

  React.useEffect(() => {
    const fetchAllAlbum = async () => {
      const response = await fetch("/api/albums/", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const json = await response.json();

      if (response.ok) {
        setAlbumData(json.albums);
      }
    };
    fetchAllAlbum();
  }, []);

  const [epData, setEPData] = React.useState([]);
  React.useEffect(() => {
    const fetchAllEP = async () => {
      const response = await fetch("/api/eps/", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const json = await response.json();

      if (response.ok) {
        setEPData(json);
      }
    };
    fetchAllEP();
  }, []);

  return (
    <div className="container">
      <h1 className="text-light">Song Manager</h1>

      {songs?.length > 0 && (
        <>
          <table class="table table-dark table-bordered ">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">IMG</th>
                <th scope="col">TITLE</th>
                <th scope="col">ARTIST</th>
                <th scope="col">ALBUM</th>
                <th scope="col">EP</th>
                <th scope="col">EDIT</th>
              </tr>
            </thead>
            <tbody>
              {songs?.map((song) => (
                <tr key={song._id}>
                  <th scope="row">{song._id}</th>
                  <th>
                    <img src={song.imgUrl} width={"50px"} alt="" />
                  </th>
                  <th>{song.title}</th>
                  <th>{song.artist.artistName}</th>
                  <th>{song?.album?.albumName}</th>
                  <th>{song?.ep?.epName}</th>
                  <th>
                    <SongModal
                      song={song}
                      artistData={artistData}
                      albumData={albumData}
                      epData={epData}
                    />
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default Song;
