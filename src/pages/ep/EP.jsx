import React from "react";
import EPModal from "../../components/modals/ep modal/EPModal";

const EP = () => {
  const [eps, setEPs] = React.useState([]);
  const [errors, setErrors] = React.useState(null);
  const allEPs = React.useEffect(() => {
    const fetchEPs = async () => {
      const response = await fetch("/api/eps", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      const json = await response.json();
      if (!response.ok) {
        setErrors(json.error);
        return;
      }

      if (response.ok) {
        setEPs(json);
      }
    };
    fetchEPs();
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
      <h1 className="text-light">EP</h1>
      {eps?.length > 0 && (
        <>
          <table class="table table-dark table-bordered ">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">IMG</th>
                <th scope="col">NAME</th>
                <th scope="col">ARTIST</th>
                <th scope="col">#TRACKS</th>
                <th scope="col">EDIT EP</th>
              </tr>
            </thead>
            <tbody>
              {eps?.map((ep) => (
                <tr key={ep._id}>
                  <th scope="row">{ep._id}</th>
                  <th>
                    <img src={ep.epArt} width={"50px"} alt="" />
                  </th>
                  <th>{ep.epName}</th>
                  <th>{ep?.artist?.artistName}</th>
                  <th>{ep?.songList?.length}</th>
                  <th>
                    <EPModal ep={ep} artists={artistData} songs={songs} />
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

export default EP;
