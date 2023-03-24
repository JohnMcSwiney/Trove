import React from "react";
import "./editModal.css";
const EditModal = ({ song, closeModal }) => {
  const [title, setTitle] = React.useState(song.title);

  return (
    <div className="modal-background">
      <div className="modal-container">
        <button className="btn btn-danger" onClick={() => closeModal(false)}>
          X
        </button>
        <div className="modal-title">
          <h3>Edit Song</h3>
        </div>
        <div className="modal-body">
          <label htmlFor="songTitle"> Song title: </label>
          <input type="text" id="songTitle" value={title}></input>
        </div>
        <div className="modal-footer">
          <button className="btn btn-success">Update</button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
