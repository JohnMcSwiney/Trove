import React from "react";
import "./editModal.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
const EditModal = ({ song }) => {
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [title, setTitle] = React.useState(song?.title);
  const [album, setAlbum] = React.useState(song?.album);
  const [ep, setEP] = React.useState(song?.ep);
  const [genre, setGenre] = React.useState(song?.genre);
  const [feartureArtist, setFeatureArtist] = React.useState(
    song?.featuredArtists
  );
  const [show, setShow] = React.useState(false);

  const [findArtist, setFindArtist] = React.useState("");
  const [artist, setArtist] = React.useState([]);
  React.useEffect(() => {
    const fetchArtists = async () => {
      const response = await fetch("/api/artists/");
      const json = await response.json();

      if (response.ok) {
        setArtist(json);
      }
    };
    fetchArtists();
  }, []);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Edit Song
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Song</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <label htmlFor="songTitle">Title: </label>
          <input
            type="text"
            id="songTitle"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="form-control"
          ></input>

          <label htmlFor="addFArtist">Search artist: </label>
          <input
            type="text"
            id="addFArtist"
            value={findArtist}
            onChange={(e) => setFindArtist(e.target.value)}
            className="form-control"
          ></input>

          <label htmlFor="feartureArtist">Feature artist: </label>
          <input
            type="text"
            id="feartureArtist"
            value={feartureArtist}
            onChange={(e) => setFeatureArtist(e.target.value)}
            className="form-control"
          ></input>

          <label htmlFor="songAlbum">Album: </label>
          <input
            type="text"
            id="songAlbum"
            value={album}
            onChange={(e) => setAlbum(e.target.value)}
            className="form-control"
          ></input>

          <label htmlFor="songAlbum">EP: </label>
          <input
            type="text"
            id="songEP"
            value={ep}
            onChange={(e) => setEP(e.target.value)}
            className="form-control"
          ></input>

          <label htmlFor="songImg"> IMG: </label>
          <img src={song.imgUrl} alt={song.title} width={"50px"} id="songImg" />
          <br></br>
          <label htmlFor="songGenre"> Genre: </label>
          <br></br>
          <input
            class="form-check-input"
            type="radio"
            name="genre"
            id="pop"
            value="pop"
            checked={song.genre === "pop"}
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
            checked={song.genre === "rock"}
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
            checked={song.genre === "country"}
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
            checked={song.genre === "hiphop"}
            onChange={(e) => setGenre(e.target.value)}
          />
          <label class="form-check-label" htmlFor="hiphop">
            HIP-HOP
          </label>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary">Update Song</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default EditModal;
