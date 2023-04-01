import React from "react";
// import "./editModal.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useEditArtist } from "../../../hooks/update/useEditArtist";
const ArtistModal = ({ artist }) => {
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [artistName, setArtistName] = React.useState(artist?.artistName);
  const [email, setEmail] = React.useState(artist?.email);
  const [password, setPassword] = React.useState(artist?.password);
  const [avatar, setAvatar] = React.useState(artist?.artistImg);
  const [dob, setDOB] = React.useState(artist?.dob);
  const [gender, setGender] = React.useState(artist?.gender);

  const [show, setShow] = React.useState(false);

  const { editArtist, message, editerror, editIsLoading } = useEditArtist();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      editArtist(artist._id, avatar, artistName, dob, email, password, gender);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form>
      <Button variant="primary" onClick={handleShow}>
        Edit Artist Info
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Artist</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <label htmlFor="avatar"> IMG: </label>
          <img
            id="avatar"
            src={avatar}
            alt={artist?.artistName}
            width={"50px"}
          />
          <br />
          <label htmlFor="artistName">ArtistName: </label>
          <input
            type="text"
            id="artistName"
            value={artistName}
            onChange={(e) => setArtistName(e.target.value)}
            className="form-control"
          ></input>

          <label htmlFor="dob">Date of birth: </label>
          <input
            type="date"
            id="dob"
            value={dob}
            onChange={(e) => setDOB(e.target.value)}
            className="form-control"
          ></input>
          <label htmlFor="email">Email </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-control"
          ></input>

          <label htmlFor="password">Password: </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-control"
          ></input>

          <br></br>
          <label htmlFor="songGenre"> Gender: </label>
          <br></br>
          <input
            class="form-check-input"
            type="radio"
            name="gender"
            id="male"
            value="male"
            checked={artist.gender === "male"}
            onChange={(e) => setGender(e.target.value)}
          />
          <label class="form-check-label" htmlFor="pop">
            Male
          </label>

          <input
            class="form-check-input"
            type="radio"
            name="gender"
            id="female"
            value="female"
            checked={artist.gender === "female"}
            onChange={(e) => setGender(e.target.value)}
          />
          <label class="form-check-label" htmlFor="rock">
            Female
          </label>

          <input
            class="form-check-input"
            type="radio"
            name="gender"
            id="non-binary"
            value="non-binary"
            checked={artist.gender === "non-binary"}
            onChange={(e) => setGender(e.target.value)}
          />
          <label class="form-check-label" htmlFor="country">
            Non-binary
          </label>

          <input
            class="form-check-input"
            type="radio"
            name="gender"
            id="other"
            value="other"
            checked={artist.gender === "other"}
            onChange={(e) => setGender(e.target.value)}
          />
          <label class="form-check-label" htmlFor="hiphop">
            Other
          </label>
        </Modal.Body>
        <div className="form-group">
          <Modal.Footer>
            {editerror && <div className="error">{editerror}</div>}
            {message && <div className="message">{message}</div>}
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="danger">Delete User</Button>
            <Button variant="primary" onClick={handleSubmit}>
              Update Artist
            </Button>
          </Modal.Footer>
        </div>
      </Modal>
    </form>
  );
};

export default ArtistModal;
