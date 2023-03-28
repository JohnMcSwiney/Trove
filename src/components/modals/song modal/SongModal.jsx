import React from "react";
// import "./editModal.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
const SongModal = ({ song }) => {
  const [show, setShow] = React.useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [title, setTitle] = React.useState(song?.title);
  const [album, setAlbum] = React.useState(song?.album?.albumName);
  const [ep, setEP] = React.useState(song?.ep?.epName);
  const [genre, setGenre] = React.useState(song?.genre);
  const [songYear, setSongYear] = React.useState(song?.releaseYear);
  const [feartureArtists, setFeatureArtists] = React.useState(
    song?.featuredArtists
  );

  const [searchTerm, setSearchTerm] = React.useState("");
  const [searchResults, setSearchResults] = React.useState([]);

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
    <form>
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

          <label htmlFor="search">Add feature artist: </label>
          <input
            id="search"
            type="text"
            placeholder="Search artists"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="form-control"
          />
          <label htmlFor="feartureArtist">Feature artist: </label>
          <input
            type="text"
            id="feartureArtist"
            value={feartureArtists}
            onChange={(e) => setFeatureArtists(e.target.value)}
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

          <label htmlFor="songYear"> Year: </label>
          <input
            type="text" // check this infuture
            id="songYear"
            value={songYear}
            onChange={(e) => setSongYear(e.target.value)}
            className="form-control"
          ></input>

          <label htmlFor="songImg"> IMG: </label>
          <img
            src={song?.imgUrl}
            alt={song.title}
            width={"50px"}
            id="songImg"
          />
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
        <div className="form-group">
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="danger">Delete Song</Button>
            <Button variant="primary">Update Song</Button>
          </Modal.Footer>
        </div>
      </Modal>
    </form>
  );
};

export default SongModal;
