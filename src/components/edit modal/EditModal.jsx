import React from "react";
import "./editModal.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
const EditModal = ({ song }) => {
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [title, setTitle] = React.useState(song.title);
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
          <label htmlFor="songTitle"> Song title: </label>
          <input
            type="text"
            id="songTitle"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          ></input>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary">Understood</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default EditModal;
