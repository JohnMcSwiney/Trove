import React from "react";
import ArtistModal from "../../components/modals/artist modal/ArtistModal";

const Artist = () => {
  const [artists, setArtist] = React.useState([]);
  const [errors, setErrors] = React.useState(null);
  const allArtists = React.useEffect(() => {
    const fetchAlbums = async () => {
      const response = await fetch("/api/artists", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      const json = await response.json();
      if (!response.ok) {
        setErrors(json.error);
        return;
      }

      if (response.ok) {
        setArtist(json);
      }
    };
    fetchAlbums();
  }, []);

  return (
    <div className="container">
      <h1 className="text-light">Artist Manager</h1>
      {artists?.length > 0 && (
        <>
          <table class="table table-dark table-bordered ">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">IMG</th>
                <th scope="col">NAME</th>
                <th scope="col">EMAIL</th>
                <th scope="col">GENDER</th>
                <th scope="col">EDIT</th>
              </tr>
            </thead>
            <tbody>
              {artists?.map((artist) => (
                <tr key={artist._id}>
                  <th scope="row">{artist._id}</th>
                  <th>
                    <img src={artist.artistImg} width={"50px"} alt="" />
                  </th>
                  <th>{artist.artistName}</th>
                  <th>{artist?.email}</th>
                  <th>{artist?.gender}</th>
                  <th>
                    <ArtistModal artist={artist} />
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

export default Artist;
