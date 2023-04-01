import React from "react";
import Select from "react-select";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
const MusicSubmitted = (props) => {
  const [show, setShow] = React.useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [musicTitle, setMusicTitle] = React.useState("");

  React.useEffect(() => {
    if(props.album) {
        setMusicTitle(props.album)
      } else if (props.ep) {
        setMusicTitle(props.ep)
      } else {
        setMusicTitle(props.title)
      }
    
  }, [props.title, props.album, props.ep]);

  return (
    <form className="uploadmusic--submittedsongs">
      <Button variant="primary" onClick={handleShow}>
        View Music
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
            <Modal.Title>Music Submitted!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className="musicsubmitted--confirmation">
                <h2>Your Music has been Submitted!</h2>
                <h5>To edit your music, return to home</h5>
            </div>

            <div className="musicsubmitted-info">
                <img src={props.previewCover} alt="Song Cover" />

                <div className="musicsubmitted-stats">
                    <h5>Title: {musicTitle}</h5>
                    <h6>Artists: {props.artist}, {props.featuredArtists}</h6>
                    <h7>Genre: {props.genre.toUpperCase()}</h7>
                    <h3>Release Type:{props.releaseType}</h3>
                    <h4>Release Year:{props.releaseYear}</h4>
                </div>


            </div>
            
        </Modal.Body>

        {/* <Modal.Header closeButton>
          <Modal.Title>Edit Song</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <label htmlFor="songTitle">Title: {props.releaseYear} </label>
          <input
            type="text"
            id="songTitle"
            // value={title}
            // onChange={(e) => setTitle(e.target.value)}
            className="form-control"
          ></input>

          <label htmlFor="songAlbum">Album: </label>
          <input
            type="text"
            id="songAlbum"
            // value={album}
            // onChange={(e) => setAlbum(e.target.value)}
            className="form-control"
          ></input>

          <label htmlFor="songAlbum">EP: </label>
          <input
            type="text"
            id="songEP"
            // value={ep}
            // onChange={(e) => setEP(e.target.value)}
            className="form-control"
          ></input>

          <label htmlFor="songYear"> Year: </label>
          <input
            type="text" // check this infuture
            id="songYear"
            // value={songYear}
            // onChange={(e) => setSongYear(e.target.value)}
            className="form-control"
          ></input> 

          <label htmlFor="songImg"> IMG: </label>
          <img
            // src={song?.imgUrl}
            // alt={song.title}
            width={"50px"}
            id="songImg"
          />
          <br></br>
        </Modal.Body>
        <div className="form-group">
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="danger">Delete Song</Button>
            <Button variant="primary">Update Song</Button>
          </Modal.Footer>
        </div> */}
      </Modal>
    </form>
  );
};

export default MusicSubmitted;
