import "./myaccount.css";

import React from "react";
import { Alert } from "@mui/material";
import { BiShow } from "react-icons/bi";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import { Navigate } from "react-router-dom";

const MyAccount = () => {
  const [state, setState] = React.useState(1);

  const action = (index) => {
    setState(index);

    console.log(index);
  };

  //states for forms
  const user = localStorage.getItem("user");
  const userInfo = JSON.parse(user);
  const [imgPath, setImagePath] = React.useState("./img/user-demo.png");
  const [email, setEmail] = React.useState(userInfo.email);
  const [displayName, setDisPlayName] = React.useState(userInfo.displayName);
  const [password, setPassword] = React.useState("");
  const [newPassword, setNewPassword] = React.useState("");
  const [newEmail, setNewEmail] = React.useState("");

  const [showPassword, setShowPassword] = React.useState(false);
  const toggleHidden = () => {
    setShowPassword(!showPassword);
  };
  return (
    <>
      {user ? (
        <div className="container">
          <h1 className="my-account-header">Settings</h1>

          <div className="my-account">
            <div className="tabs ">
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
                <h3>Detail about your personal information</h3>
                <form>
                  <div className="inner-form">
                    <div className="user-img-div">
                      <img
                        src={imgPath}
                        className="user-avatar"
                        alt="your-avatar"
                      />
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

                      <label htmlFor="name">Display name:</label>
                      <input
                        type="text"
                        id="name"
                        className="form-control"
                        defaultValue={displayName}
                        onChange={(e) => setDisPlayName(e.target.value)}
                        value={displayName}
                      />
                      <label htmlFor="dob">Date of birth:</label>
                      <input
                        type="date"
                        id="dob"
                        name="dob"
                        // value={dob}
                        // onChange={handleDobChange}
                        className="form-control"
                      />

                      <button className="btn btn-primary mt-3">Save</button>
                    </div>
                  </div>
                </form>
              </div>

              <div className={`${state === 2 ? "active-content" : "content"}`}>
                <h3>Detail about your personal account information</h3>

                <form>
                  <div>
                    <label htmlFor="newemail">New email</label>
                    <input
                      type="email"
                      id="newemail"
                      className="form-control"
                      placeholder="Change your email here"
                      onChange={(e) => setNewEmail(e.target.value)}
                      value={newEmail}
                    />
                    <button className="btn btn-primary mt-3 mb-3">
                      Update Email
                    </button>
                  </div>
                </form>

                <form>
                  <div>
                    <label htmlFor="password">Current password</label>
                    <input
                      type={"password"}
                      id="name"
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
                      id="newnewpasswordname"
                      className="form-control"
                      placeholder="New password"
                      onChange={(e) => setNewPassword(e.target.value)}
                      value={newPassword}
                    />

                    <button className="btn btn-primary mt-3">
                      Change Password
                    </button>
                  </div>
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
                  <p>
                    Contact our support team, offer limited to premium users
                  </p>
                </div>

                <div>
                  <h5>Report an issue</h5>
                  <p>Report what's not working well, so we can fix it</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Navigate to="/" />
      )}
    </>
  );
};

export default MyAccount;
