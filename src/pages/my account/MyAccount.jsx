import "./myaccount.css";

import React from "react";
import { Alert } from "@mui/material";
import { BiShow } from "react-icons/bi";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import { Navigate } from "react-router-dom";
import { useUpdateAccount } from "../../hooks/user-hooks/useUpdateAccount";
import { useUpdateEmail } from "../../hooks/user-hooks/useUpdateEmail";
import { useUpdatePassword } from "../../hooks/user-hooks/useUpdatePassword";

const MyAccount = () => {
  const [state, setState] = React.useState(1);

  const action = (index) => {
    setState(index);
  };

  //states for forms
  const user = localStorage.getItem("user");
  const userInfo = JSON.parse(user);

  const [email, setEmail] = React.useState(userInfo.email);

  //toggle
  const [showPassword, setShowPassword] = React.useState(false);
  const toggleHidden = () => {
    setShowPassword(!showPassword);
  };

  const [showCPassword, setShowCPassword] = React.useState(false);
  const toggleCHidden = () => {
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

  //user profile photo
  const [imageFile, setImageFile] = React.useState();
  const [userProfilePic, setUserProfilePic] = React.useState("");
  React.useEffect(() => {
    const fetchUser = async () => {
      const userResponse = await fetch(`/api/users/${userInfo?.id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const userJson = await userResponse.json();
      if (userResponse.ok) {
        setUserProfilePic(userJson.imageURL);
      }
    };
    fetchUser();
  }, []);

  const handleImageFileChange = (e) => {
    setImageFile(e.target.files[0]);
    setUserProfilePic(URL.createObjectURL(e.target.files[0]));
  };

  const { updateAccount, error, isLoading, updateMessage } = useUpdateAccount();
  const [dob, setDOB] = React.useState(userInfo.dob);
  const [displayName, setDisPlayName] = React.useState(userInfo.displayName);
  const handleUpdateAccount = async (e) => {
    e.preventDefault();
    try {
      await updateAccount(displayName, dob, imageFile);
    } catch (error) {
      console.log(error.data?.message || "Please try again");
      return;
    }
  };

  const { updateEmail, emailError, emailIsLoading, emailMessage } =
    useUpdateEmail();
  const [currentEmail, setCurrentEmail] = React.useState("");
  const [newEmail, setNewEmail] = React.useState("");
  const [cPassword, setCPassword] = React.useState("");
  const handleUpdateEmail = async (e) => {
    e.preventDefault();
    try {
      await updateEmail(currentEmail, newEmail, cPassword);
      setCurrentEmail("");
      setNewEmail("");
      setCPassword("");
    } catch (error) {
      console.log(error);
      return;
    }
  };

  const { updatePassword, passwordError, passwordIsLoading, passwordMessage } =
    useUpdatePassword();
  const [password, setPassword] = React.useState("");
  const [newPassword, setNewPassword] = React.useState("");
  const [confirmNewPassword, setConfirmNewPassword] = React.useState("");
  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    try {
      await updatePassword(password, newPassword, confirmNewPassword);
      setPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
    } catch (error) {
      console.log(error);
      return;
    }
  };

  return (
    <div className="container ">
      <h1 className="my-account-header">Settings</h1>

      <div className="my-account bg-fglass-2 hideOverflow">
        <div className="tabs bg-fglass-1">
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

        <div className="contents ">
          <div className={`${state === 1 ? "active-content" : "content"}`}>
            <div className="personalInfoCont">
              <h3>Your personal information</h3>
              <form onSubmit={handleUpdateAccount}>
                <div className="inner-form">
                  <div className="inputContainer">
                    <div className="userimg_displayName">
                      <div>
                        <div className="userImg-border">
                          <label>
                            <input
                              type="file"
                              name="cover"
                              value=""
                              accept="image/*"
                              // className=""
                              onChange={handleImageFileChange}
                            />
                            <img
                              src={userProfilePic}
                              className="user-avatar"
                              alt="your-avatar"
                            />
                          </label>

                          <h4>Edit Photo</h4>
                        </div>
                      </div>
                      <div className="dispNameInp">
                        <label htmlFor="name">Display name:</label>
                        <input
                          type="text"
                          id="name"
                          className="form-control"
                          defaultValue={displayName}
                          onChange={(e) => setDisPlayName(e.target.value)}
                          value={displayName}
                        />
                      </div>
                    </div>

                    <div className="emailImpCont">
                      <label htmlFor="email">Email:</label>
                      <input
                        type="email"
                        id="email"
                        className="form-control"
                        defaultValue={email}
                        disabled
                      />
                    </div>

                    <div>
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
                    </div>
                    <button
                      onClick={handleUpdateAccount}
                      className="btn btn-primary mt-3"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </form>
              {error && <p>{error}</p>}
              {updateMessage && <p>{updateMessage}</p>}
            </div>
          </div>

          <div className={`${state === 2 ? "active-content" : "content"}`}>
            <h3>Change your personal account information</h3>
            <div className="updateMailPassCont">
              <div className="updateMailPassinput">
                <form onSubmit={handleUpdateEmail}>
                  <h5 onClick={toggleShowEmail} style={{ cursor: "pointer" }}>
                    Email
                  </h5>
                  {showEmailTab && (
                    <div>
                      <label htmlFor="currentEmail">Current email: </label>
                      <input
                        type="email"
                        id="currentEmail"
                        className="form-control accst"
                        placeholder="current@gmail.com"
                        onChange={(e) => setCurrentEmail(e.target.value)}
                        value={currentEmail}
                      />
                      <label htmlFor="newemail">New email: </label>
                      <input
                        type="email"
                        id="newemail"
                        className="form-control accst"
                        placeholder="new@gmail.com"
                        onChange={(e) => setNewEmail(e.target.value)}
                        value={newEmail}
                      />

                      <label htmlFor="Cpassword">Confirm password: </label>
                      <input
                        type={"password"}
                        id="Cpassword"
                        className="form-control accst"
                        placeholder="password"
                        onChange={(e) => setCPassword(e.target.value)}
                        value={cPassword}
                      />

                      <button className="btn btn-primary mt-3 mb-3">
                        Update Email
                      </button>
                    </div>
                  )}
                </form>
                {emailError && <p>{emailError}</p>}
                {emailMessage && <p>{emailMessage}</p>}
              </div>

              <div className="updateMailPassinput">
                <form onSubmit={handleUpdatePassword}>
                  <h5
                    onClick={toggleShowPasswordTab}
                    style={{ cursor: "pointer" }}
                  >
                    Password
                  </h5>
                  {showPasswordTab && (
                    <div>
                      <label htmlFor="password">Current password: </label>
                      <input
                        type={"password"}
                        id="password"
                        className="form-control accst"
                        placeholder="Current password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                      />
                      <label htmlFor="newPassword">New password: </label>
                      <div className="newPasswordCont">
                        {showPassword ? (
                          <BiShow onClick={toggleHidden} className="eyeIcon" />
                        ) : (
                          <AiOutlineEyeInvisible
                            onClick={toggleHidden}
                            className="eyeIcon"
                          />
                        )}
                        <input
                          type={showPassword ? "text" : "password"}
                          id="newPassword"
                          className="form-control accst"
                          placeholder="New password"
                          onChange={(e) => setNewPassword(e.target.value)}
                          value={newPassword}
                        />
                      </div>

                      <label htmlFor="confirmNewPassword">
                        Confirm new password:
                      </label>
                      <div className="newPasswordCont">
                        {showCPassword ? (
                          <BiShow onClick={toggleCHidden} className="eyeIcon" />
                        ) : (
                          <AiOutlineEyeInvisible
                            onClick={toggleCHidden}
                            className="eyeIcon"
                          />
                        )}
                        <input
                          type={showCPassword ? "text" : "password"}
                          id="confirmNewPassword"
                          className="form-control accst"
                          placeholder="New password"
                          onChange={(e) =>
                            setConfirmNewPassword(e.target.value)
                          }
                          value={confirmNewPassword}
                        />
                      </div>

                      <button className="btn btn-primary mt-3">
                        Change Password
                      </button>
                    </div>
                  )}
                </form>
                {passwordError && <p>{passwordError}</p>}
                {passwordMessage && <p>{passwordMessage}</p>}
              </div>
            </div>
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

export default MyAccount;
