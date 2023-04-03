import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { NavLink, useNavigate } from "react-router-dom";
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

  React.useEffect(() => {
    if(props.submitted) {
      setShow(true);
    }

  }, [props.submitted]);

  return (
    <form className="uploadmusic--submittedsongs">
      {/* <Button variant="primary" onClick={handleShow}>
        View Music
      </Button> */}

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
            <Modal.Title>Success</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className="musicsubmitted--confirmation">
                <h2>Your Music has been Submitted!</h2>
            </div>

            <div className="musicsubmitted-info">
                <img src={props.previewCover} alt="Song Cover" />

                <div className="musicsubmitted-stats">
                    <h5><span className="musicsubmitted-statshead">Title: </span>{musicTitle}</h5>
                    <h5><span className="musicsubmitted-statshead">Artists: </span>{props.artist}, {props.featuredArtists}</h5>
                    <h5><span className="musicsubmitted-statshead">Genre: </span>{props.genre.toUpperCase()}</h5>
                    <h5><span className="musicsubmitted-statshead">Release Type: </span>{props.releaseType.toUpperCase()}</h5>
                    <h5><span className="musicsubmitted-statshead">Release Year: </span>{props.releaseYear}</h5>
                </div>


            </div>

            <div className="musicsubmitted--confirmation">
                <h5>To edit your music, return to  <NavLink className="musicsubmitted--gohome" to={"/"}>home</NavLink></h5>
                <h6>Thank you for using <span className="musicsubmitted--trovemusic-span">Trove</span>Music!</h6>
            </div>
            
        </Modal.Body>

      </Modal>
    </form>
  );
};

export default MusicSubmitted;
