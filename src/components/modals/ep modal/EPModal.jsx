import React from "react";
// import "./editModal.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Select from "react-select";
const EPModal = ({ ep, artists, songs }) => {
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [epName, setEpName] = React.useState(ep?.epName);
  const [artist, setArtist] = React.useState(ep?.artist?.artistName);
  const [featureArtists, setFeatureArtists] = React.useState(
    ep?.featuredArtists || []
  );
  const [epArt, setEpArt] = React.useState(ep?.epArt);
  const [totalTracks, setTotalTracks] = React.useState(ep?.totalTracks);
  const [releaseYear, setReleaseYear] = React.useState(ep?.releaseYear);
  const [epData, setEpData] = React.useState([]);
  const [show, setShow] = React.useState(false);

  const handleSelectChange = (selectedOptions) => {
    if (!selectedOptions) {
      setFeatureArtists([]);
      return;
    }
    const selectedList = [];
    for (const item of artists) {
      for (var i = 0; i < selectedOptions.length; i++) {
        if (
          selectedOptions[i].value === item._id ||
          (selectedOptions[i].artist && selectedOptions[i].id === item._id)
        ) {
          selectedList.push(item);
          break;
        }
      }
    }
    setFeatureArtists(selectedList);
  };
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

          <label htmlFor="search">Add feature artist: </label>
          <Select
            id="search"
            options={artists.map((artist) => ({
              value: artist.artistName,
              label: (
                <div style={{ display: "flex", alignItems: "center" }}>
                  <img
                    src={artist.artistImg}
                    alt={artist.artistName}
                    width="30"
                    height="30"
                    style={{ marginRight: "10px" }}
                  />
                  {artist.artistName}
                </div>
              ),
              id: artist?._id,
              artist: artist,
              artistName: artist.artistName,
            }))}
            isMulti
            className="basic-multi-select"
            classNamePrefix="select"
            placeholder="Select an artist"
            defaultValue={
              featureArtists &&
              featureArtists.map((artist) => ({
                value: artist?._id,
                label: artist?.artistName,
              }))
            }
            onChange={handleSelectChange}
          />

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
          <Select
            id="songList"
            options={songs.map((song) => ({
              value: song?.title,
              label: (
                <div style={{ display: "flex", alignItems: "center" }}>
                  <img
                    src={song.imgUrl}
                    alt={song.title}
                    width="30"
                    height="30"
                    style={{ marginRight: "10px" }}
                  />
                  {song.title}
                </div>
              ),
              id: song?._id,
              title: song?.title,
              song: song,
            }))}
            isMulti
            className="basic-multi-select"
            classNamePrefix="select"
            placeholder="Select songs"
            // defaultValue={{ value: artistID, label: artistName }}
            // onChange={handleArtistChange}
          />
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
