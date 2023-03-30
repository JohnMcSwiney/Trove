import "./myaccount.css";

import React from "react";
import { BiShow } from "react-icons/bi";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import { Navigate } from "react-router-dom";
import { useArtistAuthContext } from "../../hooks/useArtistAuthContext";
import { useUpdateInfo } from "../../hooks/useUpdateInfo";
import { useUpdateGmail } from "../../hooks/useUpdateGmail";
import { useUpdatePassword } from "../../hooks/useUpdatePassword";
import { useUpdateProfilePhoto } from "../../hooks/useUpdateProfilePhoto";

const AccountSetting = () => {
  const [state, setState] = React.useState(1);

  const action = (index) => {
    setState(index);
  };

  //states for forms
  const artist = JSON.parse(localStorage.getItem("artist"));
  const [imgPath, setImagePath] = React.useState("./img/user-demo.png");

  //general Info
  const [email, setEmail] = React.useState(artist?.email);
  const [artistName, setArtistName] = React.useState(artist?.artistName);
  const [dob, setDOB] = React.useState();

  //password update
  const [password, setPassword] = React.useState("");
  const [newPassword, setNewPassword] = React.useState("");
  const [confirmNewPassword, setConfirmNewPassword] = React.useState("");

  //email update
  const [newEmail, setNewEmail] = React.useState("");
  const [currentEmail, setCurrentEmail] = React.useState("");
  const [cPassword, setCPassword] = React.useState("");

  //toggle
  const [showPassword, setShowPassword] = React.useState(false);
  const toggleHidden = () => {
    setShowPassword(!showPassword);
  };

  const [showCPassword, setShowCPassword] = React.useState(false);
  const toggleHiddenC = () => {
    setShowCPassword(!showCPassword);
  };

  //toggle
  const [showEmailTab, setShowEmailTab] = React.useState(false);
  const toggleShowEmail = () => {
    setShowEmailTab(!showEmailTab);
  };

  //toggle
  const [showPasswordTab, setShowPasswordTab] = React.useState(false);
  const toggleShowPasswordTab = () => {
    setShowPasswordTab(!showPasswordTab);
  };

  const { updateInfo, updateError, isLoadingUpdate, infoMessage } =
    useUpdateInfo();
  const handleUpdateAccount = async (e) => {
    e.preventDefault();
    try {
      await updateInfo(artistName, dob);
    } catch (error) {
      console.log(updateError);
      return;
    }
  };

  const { updateEmail, updateGmailError, isLoadingUpdateEmail, emailMessage } =
    useUpdateGmail();
  const handleUpdateEmail = async (e) => {
    e.preventDefault();
    try {
      await updateEmail(currentEmail, newEmail, cPassword);
      setCurrentEmail("");
      setNewEmail("");
      setCPassword("");
    } catch (error) {
      console.log(updateGmailError);
      return;
    }
  };

  const {
    updatePassword,
    updatePasswordError,
    isLoadingUpdatePassword,
    passwordMessage,
  } = useUpdatePassword();
  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    try {
      await updatePassword(password, newPassword, confirmNewPassword);
      setPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
    } catch (error) {
      console.log(updatePasswordError);
      return;
    }
  };

  //artist image
  const [imageFile, setImageFile] = React.useState();
  const [artistProfilePic, setArtistProfilePic] = React.useState("");
  React.useEffect(() => {
    const fetchArtist = async () => {
      const artistResponse = await fetch(`/api/artists/${artist?.id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const artistJson = await artistResponse.json();
      if (artistResponse.ok) {
        setArtistProfilePic(artistJson.artistImg);
      }
    };
    fetchArtist();
  }, [artist?._id]);

  const handleImageFileChange = (e) => {
    setImageFile(e.target.files[0]);
    setArtistProfilePic(URL.createObjectURL(e.target.files[0]));
    // setImageWasChanged(true);
  };

  const { updateProfilePhoto, error } = useUpdateProfilePhoto();
  const handleUpdatePhoto = async (e) => {
    console.log("CLICKED SUBMIT")
    // e.preventDefault();

    try {
      await updateProfilePhoto(
        artist?.id,
        imageFile
        
      );
    } catch (error) {
      console.log(error);
    }

    console.log("CLICKED SUBMIT 2");
  };
  

  return (
    <div className="container">
      <h1 className="my-account-header">Settings</h1>

      <div className="my-account box">
        <div className="my-account tabs ">
          <div className={`${state === 1 ? "active-tab" : "tab"}`}>
            <div className="account-display" onClick={() => action(1)}>
              <h4 className="account-header">Account</h4>
            </div>
          </div>

          <div className={`${state === 2 ? "active-tab " : "tab"}`}>
            <div className="privacy-display" onClick={() => action(2)}>
              <h4 className="privacy-header">Privacy</h4>
              {/* <p className='privacy-summary'></p> */}
            </div>
          </div>

          <div className={`${state === 3 ? "active-tab" : "tab "}`}>
            <div className="support-display" onClick={() => action(3)}>
              <h4 className="support-header">Support</h4>
              {/* <p className='support-summary'></p> */}
            </div>
          </div>
        </div>

        <div className="contents">
          <div className={`${state === 1 ? "active-content" : "content"}`}>
            <h3>Your Account Details</h3>
            <form onSubmit={handleUpdateAccount}>
              <div className="inner-form">
                <div className="user-img-div">
                <label >
                  <input
                    type="file"
                    name="cover"
                    value=""
                    accept="image/*"
                    // className=""
                    onChange={handleImageFileChange}
                  />
                <img
                    src={artistProfilePic}
                    className="user-avatar"
                    alt="your-avatar"
                  />
                  
                </label>
                 
                  <h4>Edit Photo</h4>
                </div>

                <div>
                  <label htmlFor="email">Email:</label>
                  <input
                    type="email"
                    id="email"
                    className="form-control text-dark"
                    defaultValue={email}
                    disabled
                  />

                  <label htmlFor="name">Artist name:</label>
                  <input
                    type="text"
                    id="name"
                    className="form-control"
                    defaultValue={artistName}
                    onChange={(e) => setArtistName(e.target.value)}
                    value={artistName}
                  />
                  <label htmlFor="dob">Date of birth:</label>
                  <input
                    type="date"
                    id="dob"
                    name="dob"
                    // defaultValue={time}
                    onChange={(e) => setDOB(e.target.value)}
                    value={dob}
                    className="form-control"
                  />

                  <button className="btn btn-primary mt-3" onClick={handleUpdatePhoto}>Save</button>
                </div>
              </div>
            </form>
            {updateError && <p>{updateError}</p>}

            {infoMessage && <p>{infoMessage}</p>}
          </div>

          <div className={`${state === 2 ? "active-content" : "content"}`}>
            <h3>Change your personal account information</h3>

            <form onSubmit={handleUpdateEmail}>
              <h5 onClick={toggleShowEmail}>Email</h5>
              {showEmailTab && (
                <div>
                  <form onSubmit={handleUpdateEmail}>
                    <label htmlFor="currentEmail">Current email</label>
                    <input
                      type="email"
                      id="currentEmail"
                      className="form-control"
                      placeholder="abcd@gmail.com"
                      onChange={(e) => setCurrentEmail(e.target.value)}
                      value={currentEmail}
                    />

                    <label htmlFor="newemail">New email</label>
                    <input
                      type="email"
                      id="newemail"
                      className="form-control"
                      placeholder="abcd@gmail.com"
                      onChange={(e) => setNewEmail(e.target.value)}
                      value={newEmail}
                    />

                    <label htmlFor="Cpassword">Confirm password</label>
                    <input
                      type={"password"}
                      id="Cpassword"
                      className="form-control"
                      placeholder="Confirm password"
                      onChange={(e) => setCPassword(e.target.value)}
                      value={cPassword}
                    />
                  </form>

                  {updateGmailError && <p>{updateGmailError}</p>}

                  {emailMessage && <p>{emailMessage}</p>}
                  <button type="submit" className="btn btn-primary mt-3 mb-3">
                    Update Email
                  </button>
                </div>
              )}
            </form>

            <form onSubmit={handleUpdatePassword}>
              <h5 onClick={toggleShowPasswordTab}>Password</h5>
              {showPasswordTab && (
                <div>
                  <form onSubmit={handleUpdatePassword}>
                    <label htmlFor="password">Current password</label>
                    <input
                      type={"password"}
                      id="password"
                      className="form-control"
                      placeholder="Current password"
                      onChange={(e) => setPassword(e.target.value)}
                      value={password}
                    />

                    <label htmlFor="newpassword">New password</label>
                    {showPassword ? (
                      <BiShow onClick={toggleHidden} />
                    ) : (
                      <AiOutlineEyeInvisible onClick={toggleHidden} />
                    )}
                    <input
                      type={showPassword ? "text" : "password"}
                      id="newpassword"
                      className="form-control"
                      placeholder="New password"
                      onChange={(e) => setNewPassword(e.target.value)}
                      value={newPassword}
                    />

                    <label htmlFor="Cnewpassword">Confirm new password</label>
                    {showCPassword ? (
                      <BiShow onClick={toggleHiddenC} />
                    ) : (
                      <AiOutlineEyeInvisible onClick={toggleHiddenC} />
                    )}
                    <input
                      type={showCPassword ? "text" : "password"}
                      id="Cnewpassword"
                      className="form-control"
                      placeholder="Confirm new password"
                      onChange={(e) => setConfirmNewPassword(e.target.value)}
                      value={confirmNewPassword}
                    />
                  </form>
                  {updatePasswordError && <p>{updatePasswordError}</p>}

                  {passwordMessage && <p>{passwordMessage}</p>}
                  <button type="submit" className="btn btn-primary mt-3">
                    Change Password
                  </button>
                </div>
              )}
            </form>
          </div>

          <div className={`${state === 3 ? "active-content" : "content"}`}>
            <h3>We can help you here</h3>

            <div>
              <h5>FAQ</h5>
              <p>View out Frequently asked questions</p>
            </div>

            <div>
              <h5>Contact us</h5>
              <p>Contact our support team, offer limited to premium users</p>
            </div>

            <div>
              <h5>Report an issue</h5>
              <p>Report what's not working well, so we can fix it</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountSetting;
