import React from "react";
import AlbumModal from "../../components/modals/album modal/AlbumModal";

const Album = () => {
  const [albums, setAlbums] = React.useState([]);
  const [errors, setErrors] = React.useState(null);
  const allAlbums = React.useEffect(() => {
    const fetchAlbums = async () => {
      const response = await fetch("/api/albums", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      const json = await response.json();
      if (!response.ok) {
        setErrors(json.error);
        return;
      }

      if (response.ok) {
        setAlbums(json.albums);
      }
    };
    fetchAlbums();
  }, []);

  const [songs, setSongs] = React.useState([]);
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

  return (
    <div className="container">
      <h1 className="text-light">Album Manager</h1>
      {albums?.length > 0 && (
        <>
          <table class="table table-dark table-bordered ">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">IMG</th>
                <th scope="col">NAME</th>
                <th scope="col">ARTIST</th>
                <th scope="col">#TRACKS</th>
                <th scope="col">EDIT</th>
              </tr>
            </thead>
            <tbody>
              {albums?.map((album) => (
                <tr key={album._id}>
                  <th scope="row">{album._id}</th>
                  <th>
                    <img src={album.albumArt} width={"50px"} alt="" />
                  </th>
                  <th>{album.albumName}</th>
                  <th>{album?.artist?.artistName}</th>
                  <th>{album?.songList?.length}</th>
                  <th>
                    <AlbumModal
                      album={album}
                      artists={artistData}
                      songs={songs}
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

export default Album;
