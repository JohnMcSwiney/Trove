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
  const [show, setShow] = React.useState(false);
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
          <input
            type="text"
            id="songGenre"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            className="form-control"
          ></input>
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
