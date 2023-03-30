import React from "react";
import "./albummodal.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const AlbumModal = ({ album }) => {
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [albumName, setAlbumName] = React.useState(album?.albumName);
  const [artist, setArtist] = React.useState(album?.artist?.artistName);
  const [fArtist, setFArtist] = React.useState("");
  const [albumArt, setAlbumArt] = React.useState(album?.albumArt);
  const [totalTracks, setTotalTracks] = React.useState(album?.totalTracks);
  const [releaseYear, setReleaseYear] = React.useState(album?.releaseYear);
  const [albumData, setAlbumData] = React.useState([]);
  const [show, setShow] = React.useState(false);

  React.useEffect(() => {
    async function fetchSongList() {
      const response = await fetch(`/api/albums/${album?._id}`);
      const data = await response.json();

      setAlbumData(data);
      setFArtist(data?.featuredArtists?.artistName || "");
    }
    fetchSongList();
  }, [album?._id]);

  return (
    <form>
      <Button variant="primary" onClick={handleShow}>
        Edit Album Info
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Album</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <label htmlFor="avatar">Album art: </label>
          <img
            id="avatar"
            src={albumArt}
            alt={album?.albumName}
            width={"50px"}
          />
          <br />
          <label htmlFor="albumName">AlbumName: </label>
          <input
            type="text"
            id="albumName"
            value={albumName}
            onChange={(e) => setAlbumName(e.target.value)}
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
            {albumData &&
              albumData?.songList &&
              albumData?.songList.map((song) => (
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
            <Button variant="danger">Delete Album</Button>
            <Button variant="primary">Update Album</Button>
          </Modal.Footer>
        </div>
      </Modal>
    </form>
  );
};

export default AlbumModal;
