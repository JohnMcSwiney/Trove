import React from "react";
// import "./editModal.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Select from "react-select";
import { useEditEP } from "../../../hooks/update/useEditEP";
import { useDeleteEP } from "../../../hooks/delete/useDeleteEP";
const EPModal = ({ ep, artists, songs }) => {
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [epName, setEpName] = React.useState(ep?.epName);
  const [artist, setArtist] = React.useState(ep?.artist?.artistName);
  const [artistID, setArtistID] = React.useState(ep?.artist?._id);
  const [epArt, setEpArt] = React.useState(ep?.epArt);
  const [totalTracks, setTotalTracks] = React.useState(ep?.totalTracks);
  const [releaseYear, setReleaseYear] = React.useState(ep?.releaseYear);
  const [show, setShow] = React.useState(false);

  const [genre, setGenre] = React.useState(ep?.epGenre);
  const [songList, setSongList] = React.useState(ep?.songList);
  const { editEP, message, editerror, editIsLoading } = useEditEP();

  const handleUpdate = (e) => {
    e.preventDefault();
    try {
      editEP(ep._id, epArt, epName, artistID, releaseYear, songList, genre);
    } catch (error) {
      console.log(error);
    }
  };

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
  const { deleteEP, deleteError, loadingDetele } = useDeleteEP();
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
            checked={ep.epGenre === "pop"}
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
            checked={ep.epGenre === "rock"}
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
            checked={ep.epGenre === "country"}
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
            checked={ep.epGenre === "hiphop"}
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
            <Button variant="danger" onClick={() => deleteEP(ep._id)}>
              Delete Ep
            </Button>
            <Button variant="primary" onClick={handleUpdate}>
              Update Ep
            </Button>
            {message && <p>{message}</p>}
            {editerror && <p>{editerror}</p>}
          </Modal.Footer>
        </div>
      </Modal>
    </form>
  );
};

export default EPModal;
