import React from "react";
// import "./editModal.css";
import Button from "react-bootstrap/Button";
import Select from "react-select";
import Modal from "react-bootstrap/Modal";

const AlbumModal = ({ album, artists, songs }) => {
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [albumName, setAlbumName] = React.useState(album?.albumName);
  const [artist, setArtist] = React.useState(album?.artist?.artistName);

  const [albumArt, setAlbumArt] = React.useState(album?.albumArt);
  const [totalTracks, setTotalTracks] = React.useState(album?.songList?.length);
  const [releaseYear, setReleaseYear] = React.useState(album?.releaseYear);
  const [albumData, setAlbumData] = React.useState([]);
  const [show, setShow] = React.useState(false);

  const [songList, setSongList] = React.useState(album?.songList);

  const handleSongListChange = (selectedSongs) => {
    if (!selectedSongs) {
      setSongList([]);
      return;
    }
    const selectedList = [];
    for (const song of songs) {
      for (var i = 0; i < selectedSongs.length; i++) {
        if (
          selectedSongs[i].value === song._id ||
          (selectedSongs[i].song && selectedSongs[i].id === song._id)
        ) {
          selectedList.push(song);
          break;
        }
      }
    }
    setSongList(selectedList);
  };

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
            options={songs.map((song, index) => ({
              value: song?.title,
              label: (
                <div
                  key={index}
                  style={{ display: "flex", alignItems: "center" }}
                >
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
            defaultValue={
              songList &&
              songList.map((song) => ({
                value: song._id,
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
              }))
            }
            onChange={handleSongListChange}
          />
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
