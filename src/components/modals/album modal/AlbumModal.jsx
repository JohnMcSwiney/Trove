import React from "react";
// import "./editModal.css";
import Button from "react-bootstrap/Button";
import Select from "react-select";
import Modal from "react-bootstrap/Modal";
import { useEditAlbum } from "../../../hooks/update/useEditAlbum";
import { useDeleteAlbum } from "../../../hooks/delete/useDeleteAlbum";

const AlbumModal = ({ album, artists, songs }) => {
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [albumName, setAlbumName] = React.useState(album?.albumName);
  const [artist, setArtist] = React.useState(album?.artist?.artistName);
  const [artistID, setArtistID] = React.useState(album?.artist?._id);
  const [albumArt, setAlbumArt] = React.useState(album?.albumArt);
  const [totalTracks, setTotalTracks] = React.useState(album?.songList?.length);
  const [releaseYear, setReleaseYear] = React.useState(album?.releaseYear);
  const [albumData, setAlbumData] = React.useState([]);
  const [genre, setGenre] = React.useState(album?.albumGenre);
  const [show, setShow] = React.useState(false);

  const [songList, setSongList] = React.useState(album?.songList);

  const handleSongListChange = (selectedSongs) => {
    if (!selectedSongs) {
      setSongList([]);
      return;
    }
    const selectedList = [];
    for (const song of songs) {
      console.log(song);
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

  const { editAlbum, message, editerror, editIsLoading } = useEditAlbum();
  const handleUpdate = (e) => {
    e.preventDefault();
    try {
      editAlbum(
        album._id,
        albumArt,
        albumName,
        artistID,
        releaseYear,
        songList,
        genre
      );
    } catch (error) {
      console.log(error);
    }
  };
  const { deleteAlbum, deleteError, loadingDetele } = useDeleteAlbum();
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
          <label htmlFor="songGenre"> Genre: </label>
          <br></br>
          <input
            class="form-check-input"
            type="radio"
            name="genre"
            id="pop"
            value="pop"
            checked={album.albumGenre === "pop"}
            onChange={(e) => setGenre(e.target.value)}
          />
          <label class="form-check-label" htmlFor="pop">
            POP
          </label>

          <input
            class="form-check-input"
            type="radio"
            name="genre"
            id="rock"
            value="rock"
            checked={album.albumGenre === "rock"}
            onChange={(e) => setGenre(e.target.value)}
          />
          <label class="form-check-label" htmlFor="rock">
            ROCK
          </label>

          <input
            class="form-check-input"
            type="radio"
            name="genre"
            id="country"
            value="country"
            checked={album.albumGenre === "country"}
            onChange={(e) => setGenre(e.target.value)}
          />
          <label class="form-check-label" htmlFor="country">
            COUNTRY
          </label>

          <input
            class="form-check-input"
            type="radio"
            name="genre"
            id="hiphop"
            value="hiphop"
            checked={album.albumGenre === "hiphop"}
            onChange={(e) => setGenre(e.target.value)}
          />
          <label class="form-check-label" htmlFor="hiphop">
            HIP-HOP
          </label>
        </Modal.Body>
        <div className="form-group">
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="danger" onClick={() => deleteAlbum(album._id)}>
              Delete Album
            </Button>
            <Button variant="primary" onClick={handleUpdate}>
              Update Album
            </Button>
            {message && <p>{message}</p>}
            {editerror && <p>{editerror}</p>}
          </Modal.Footer>
        </div>
      </Modal>
    </form>
  );
};

export default AlbumModal;
