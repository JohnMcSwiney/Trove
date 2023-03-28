import React from "react";
// import "./editModal.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
const EPModal = ({ ep }) => {
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [epName, setEpName] = React.useState(ep?.epName);
  const [artist, setArtist] = React.useState(ep?.artist?.artistName);
  const [fArtist, setFArtist] = React.useState("");
  const [epArt, setEpArt] = React.useState(ep?.epArt);
  const [totalTracks, setTotalTracks] = React.useState(ep?.totalTracks);
  const [releaseYear, setReleaseYear] = React.useState(ep?.releaseYear);
  const [epData, setEpData] = React.useState([]);
  const [show, setShow] = React.useState(false);

  React.useEffect(() => {
    async function fetchSongList() {
      const response = await fetch(`/api/eps/${ep?._id}`);
      const data = await response.json();

      setEpData(data);
      setFArtist(data?.featuredArtists?.artistName || "");
    }
    fetchSongList();
  }, [ep?._id]);

  return (
    <form>
      <Button variant="primary" onClick={handleShow}>
        Edit EP Info
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit EP</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <label htmlFor="avatar">EP art: </label>
          <img id="avatar" src={epArt} alt={ep?.epName} width={"50px"} />
          <br />
          <label htmlFor="epName">EP name: </label>
          <input
            type="text"
            id="epName"
            value={epName}
            onChange={(e) => setEpName(e.target.value)}
            className="form-control"
          ></input>

          <label htmlFor="artist">Artist: </label>
          <input
            type="text"
            id="artist"
            value={artist}
            onChange={(e) => setArtist(e.target.value)}
            className="form-control"
          ></input>

          <label htmlFor="fArtist">Feature Artists: </label>

          <input
            type="text"
            id="fArtist"
            value={fArtist}
            onChange={(e) => setFArtist(e.target.value)}
            className="form-control"
          ></input>

          <label htmlFor="#tracks">Number of Tracks: </label>
          <input
            type="number"
            id="#tracks"
            value={totalTracks}
            onChange={(e) => setTotalTracks(e.target.value)}
            className="form-control"
          ></input>

          <label htmlFor="year">Release year: </label>
          <input
            type="text"
            id="year"
            value={releaseYear}
            onChange={(e) => setReleaseYear(e.target.value)}
            className="form-control"
          ></input>

          <label htmlFor="songList">Song List: </label>
          <ul>
            {epData &&
              epData?.songList &&
              epData?.songList.map((song) => (
                <div id="songList">
                  <li key={song?._id} className="text-dark">
                    {song.title}
                  </li>
                </div>
              ))}
          </ul>
        </Modal.Body>
        <div className="form-group">
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="danger">Delete Ep</Button>
            <Button variant="primary">Update Ep</Button>
          </Modal.Footer>
        </div>
      </Modal>
    </form>
  );
};

export default EPModal;
