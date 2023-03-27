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
                    <SongModal song={song} />
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
