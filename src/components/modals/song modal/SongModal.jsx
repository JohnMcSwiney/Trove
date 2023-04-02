import React from "react";
// import "./editModal.css";
import Select from "react-select";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useEditSong } from "../../../hooks/update/useEditSong";
import { useDeleteSong } from "../../../hooks/delete/useDeleteSong";
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
  const [epName, setEPName] = React.useState(song?.ep?.epName);
  const [ep, setEP] = React.useState(song?.ep);
  const [genre, setGenre] = React.useState(song?.genre);
  const [songYear, setSongYear] = React.useState(song?.releaseYear);
  const [featureArtists, setFeatureArtists] = React.useState(
    song?.featuredArtists || []
  );

  console.log(song?.imgUrl);
  const handleArtistChange = (selectedOption) => {
    const artistID = selectedOption ? selectedOption.id : "";
    const artistName = selectedOption ? selectedOption.value : "";

    setArtistID(artistID);
    setArtistName(artistName);
  };

  const handleSelectChange = (selectedOptions) => {
    if (!selectedOptions) {
      setFeatureArtists([]);
      return;
    }
    const selectedList = [];
    for (const item of artistData) {
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

  const handleAlbumChange = (selectedAlbum) => {
    if (selectedAlbum && selectedAlbum.value === "no-album") {
      setAlbum(null);
    }
    const albumID = selectedAlbum ? selectedAlbum.id : "";
    setAlbum(albumID);
  };

  const handleEPChange = (selectedEP) => {
    if (selectedEP && selectedEP.value === "no-ep") {
      setEP(null);
    }
    const epID = selectedEP ? selectedEP.id : "";
    setEP(epID);
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

  const { deleteSong, deleteError, loadingDetele } = useDeleteSong();
  const handleDetele = () => {
    try {
      deleteSong(song._id);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
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
                artistName: artist.artistName,
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

            <div>
              <label htmlFor="songAlbum">Album: </label>

              <Select
                id="songAlbum"
                options={[
                  { value: "no-album", label: "No Album" }, // Add this new option
                  ...(albumData &&
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
                    }))),
                ]}
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
              options={[
                { value: "no-ep", label: "No EP" },
                ...(epData &&
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
                    id: ep?._id,
                  }))),
              ]}
              className="basic-single-select"
              classNamePrefix="select"
              placeholder="Select an ep"
              defaultValue={{ value: ep, label: epName }}
              onChange={handleEPChange}
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
              <Button variant="danger" onClick={handleDetele}>
                Delete Song
              </Button>
              <Button variant="primary" onClick={handleUpdate}>
                Update Song
              </Button>
              {message && <p>{message}</p>}
              {editerror && <p>{editerror}</p>}
            </Modal.Footer>
          </div>
        </Modal>
      </form>
    </div>
  );
};

export default SongModal;
