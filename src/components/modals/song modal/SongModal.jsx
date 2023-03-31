import React from "react";
// import "./editModal.css";
import Select from "react-select";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useEditSong } from "../../../hooks/useEditSong";
const SongModal = ({ song, artistData, albumData, epData }) => {
  const [show, setShow] = React.useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [title, setTitle] = React.useState(song?.title);
  const [songImg, setSongImg] = React.useState(song?.imgUrl);
  const [albumName, setAlbumName] = React.useState(song?.album?.albumName);
  const [album, setAlbum] = React.useState(song?.album?._id);
  const [artistName, setArtistName] = React.useState(song?.artist?.artistName);
  const [artistID, setArtistID] = React.useState(song?.artist?._id);
  const [ep, setEP] = React.useState(song?.ep?.epName);
  const [genre, setGenre] = React.useState(song?.genre);
  const [songYear, setSongYear] = React.useState(song?.releaseYear);
  const [featureArtists, setFeatureArtists] = React.useState(
    song?.featuredArtists || []
  );

  const handleArtistChange = (selectedOption) => {
    const artistID = selectedOption ? selectedOption.id : "";
    const artistName = selectedOption ? selectedOption.value : "";

    setArtistID(artistID);
    setArtistName(artistName);
  };

  const handleSelectChange = (selectedOptions) => {
    if (!selectedOptions) {
      setFeatureArtists([]);
    } else {
      const selectedIds = selectedOptions.map((option) => option.id);
      setFeatureArtists(selectedIds);
    }
  };

  const handleAlbumChange = (selectedAlbum) => {
    const albumID = selectedAlbum ? selectedAlbum.id : "";
    setAlbum(albumID);
    console.log(album);
  };

  const { editSong, message, editerror, editIsLoading } = useEditSong();
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      editSong(
        song._id,
        title,
        artistID,
        featureArtists,
        album,
        ep,
        songYear,
        songImg,
        genre
      );
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
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
                value: artist?.artistName,
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
              className="basic-single-select" // Rename the class to indicate single select
              classNamePrefix="select"
              placeholder="Select an artist"
              defaultValue={{ value: artistID, label: artistName }}
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

            <div>
              <label htmlFor="songAlbum">Album: </label>

              <Select
                id="songAlbum"
                options={
                  albumData &&
                  albumData.map((album) => ({
                    value: album.albumName,
                    label: (
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <img
                          src={album?.albumArt}
                          alt={album.albumName}
                          width="30"
                          height="30"
                          style={{ marginRight: "10px" }}
                        />
                        {album.albumName}
                      </div>
                    ),
                    id: album._id,
                  }))
                }
                className="basic-single-select" // Rename the class to indicate single select
                classNamePrefix="select"
                placeholder="Select an album"
                defaultValue={{ value: album, label: albumName }}
                onChange={handleAlbumChange}
              />
            </div>
            <label htmlFor="songEP">EP: </label>
            <Select
              id="songEP"
              options={
                epData &&
                epData.map((ep) => ({
                  value: ep.epName,
                  label: (
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <img
                        src={ep?.epArt}
                        alt={ep?.epName}
                        width="30"
                        height="30"
                        style={{ marginRight: "10px" }}
                      />
                      {ep.epName}
                    </div>
                  ),
                }))
              }
              className="basic-single-select"
              classNamePrefix="select"
              placeholder="Select an ep"
              // defaultValue={{ value: album, label: albumName }}
              // onChange={handleAlbumChange}
            />

            <label htmlFor="songYear"> Year: </label>
            <input
              type="text" // check this infuture
              id="songYear"
              value={songYear}
              onChange={(e) => setSongYear(e.target.value)}
              className="form-control"
            ></input>

            <label htmlFor="songImg"> IMG: </label>
            <img src={songImg} alt={song.title} width={"50px"} id="songImg" />
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
              <Button variant="primary" onClick={handleUpdate}>
                Update Song
              </Button>
            </Modal.Footer>
          </div>
        </Modal>
      </form>

      {message && <p>{message}</p>}
      {editerror && <p>{editerror}</p>}
    </>
  );
};

export default SongModal;
