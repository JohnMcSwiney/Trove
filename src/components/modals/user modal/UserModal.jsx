import React from "react";
// import "./editModal.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useEditUser } from "../../../hooks/update/useEditUser";
const UserModal = ({ user }) => {
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [displayName, setDisplayName] = React.useState(user?.displayName);
  const [email, setEmail] = React.useState(user?.email);
  const [password, setPassword] = React.useState(user?.password);
  const [avatar, setAvatar] = React.useState(user?.imageURL);
  const [dob, setDOB] = React.useState(user?.dob);

  const [show, setShow] = React.useState(false);

  const { editUser, message, editerror, editIsLoading } = useEditUser();
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await editUser(user._id, avatar, displayName, dob, email, password);
    } catch (error) {
      console.log(error?.message || "Please try again");
      return;
    }
  };

  const handleDelete = () => {
    console.log("deleted");
  };
  return (
    <form>
      <Button variant="primary" onClick={handleShow}>
        Edit User Info
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-group">
            <label htmlFor="avatar"> IMG: </label>
            <img
              id="avatar"
              src={avatar}
              alt={user?.displayName}
              width={"50px"}
            />
            <br />
            <label htmlFor="displayName">DisplayName: </label>
            <input
              type="text"
              id="displayName"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
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
          </div>
        </Modal.Body>

        <Modal.Footer>
          {editerror && <div className="error">{editerror}</div>}
          {message && <div className="message">{message}</div>}
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <button className="btn btn-danger" onClick={handleDelete}>
            Delete User
          </button>
          <button
            className="btn btn-primary"
            type="submit"
            onClick={handleUpdate}
          >
            Update User
          </button>
        </Modal.Footer>
      </Modal>
    </form>
  );
};

export default UserModal;
