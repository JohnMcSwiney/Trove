import React from "react";
// import "./editModal.css";
import Select from "react-select";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
const SongModal = ({ song }) => {
  const [show, setShow] = React.useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [title, setTitle] = React.useState(song?.title);
  const [album, setAlbum] = React.useState(song?.album?.albumName);
  const [artistName, setArtistName] = React.useState(song?.artist?.artistName);
  const [artistID, setArtistID] = React.useState(song?.artist?._id);
  const [ep, setEP] = React.useState(song?.ep?.epName);
  const [genre, setGenre] = React.useState(song?.genre);
  const [songYear, setSongYear] = React.useState(song?.releaseYear);
  const [featureArtists, setFeatureArtists] = React.useState(
    song?.featuredArtists || []
  );

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

  const [albumData, setAlbumData] = React.useState([]);
  React.useEffect(() => {
    const fetchAllAlbum = async () => {
      const response = await fetch("/api/albums/", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const json = await response.json();

      if (response.ok) {
        setAlbumData(json);
      }
    };
    fetchAllAlbum();
  }, []);

  const [epData, setEPData] = React.useState([]);
  React.useEffect(() => {
    const fetchAllEP = async () => {
      const response = await fetch("/api/eps/", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const json = await response.json();

      if (response.ok) {
        setEPData(json);
      }
    };
    fetchAllEP();
  }, []);

  const handleArtistChange = (selectedOption) => {
    if (selectedOption !== null) {
      setArtistID(selectedOption.id);

      setArtistName(selectedOption.value);
    }
  };
  React.useEffect(() => {}, [artistID]);

  const handleSelectChange = (selectedOptions) => {
    const selectedArtistIds = selectedOptions.map((option) => {
      const artist = artistData.find(
        (artist) => artist.artistName === option.value
      );
      return artist ? artist._id : null;
    });
    setFeatureArtists(selectedArtistIds);
  };
  React.useEffect(() => {}, [featureArtists]);

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

          <label htmlFor="artist">Artist: </label>
          <Select
            id="searchArtist"
            options={artistData.map((artist) => ({
              value: artist?.name,
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
                  <div hidden="true">{artist._id}</div>
                </div>
              ),
              id: artist?._id,
            }))}
            className="basic-single-select" // Rename the class to indicate single select
            classNamePrefix="select"
            placeholder="Select an artist"
            defaultValue={{ value: artistName, label: artistName }}
            onChange={handleArtistChange}
          />

          <label htmlFor="search">Add feature artist: </label>
          <Select
            id="search"
            options={artistData.map((artist) => ({
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
            }))}
            isMulti
            className="basic-multi-select"
            classNamePrefix="select"
            placeholder="Select an artist"
            defaultValue={
              featureArtists &&
              featureArtists.map((artist) => ({
                value: artist?.artistName,
                label: artist?.artistName,
              }))
            }
            onChange={handleSelectChange}
          />

          <label htmlFor="songAlbum">Album: </label>
          <input
            type="text"
            id="songAlbum"
            value={album}
            onChange={(e) => setAlbum(e.target.value)}
            className="form-control"
          ></input>
          {/* <label htmlFor="songAlbum">Album: </label> */}
          {/* <Select
            id="songAlbum"
            options={
              albumData?.length > 0 &&
              albumData.map((album) => ({
                value: album._id,
                label: (
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <img
                      src={album?.albumArt}
                      alt={album?.artist?.artistName}
                      width="30"
                      height="30"
                      style={{ marginRight: "10px" }}
                    />
                    {album.albumName}
                  </div>
                ),
              }))
            }
            isMulti
            className="basic-multi-select"
            classNamePrefix="select"
            placeholder="Select an artist"
            onChange={(selectedOptions) =>
              setAlbum(selectedOptions.map((option) => option.value))
            }
          /> */}
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
