import "./myaccount.css";

import React from "react";
import { Alert } from "@mui/material";
const MyAccount = () => {
  const [state, setState] = React.useState(1);

  const action = (index) => {
    setState(index);

    console.log(index);
  };
  const user = localStorage.getItem("user");
  const userinfo = localStorage.getItem("user") !== null;

  const [imgPath, setImagePath] = React.useState("./img/user-demo.png");
  return (
    <div className="container">
      <h1>Settings</h1>

      <div className="my-account">
        <div className="tabs ">
          <div className={`${state === 1 ? "active-tab" : "tab"}`}>
            <div className="account-display" onClick={() => action(1)}>
              <h3 className="account-header">Account</h3>
              {/* <div className='account-summary'>
                            <p >Detail about your personal information</p>
                          </div> */}
            </div>
          </div>

          <div className={`${state === 2 ? "active-tab " : "tab"}`}>
            <div className="privacy-display" onClick={() => action(2)}>
              <h3 className="privacy-header">Privacy</h3>
              {/* <p className='privacy-summary'>Detail about your personal account information</p> */}
            </div>
          </div>

          <div className={`${state === 3 ? "active-tab" : "tab "}`}>
            <div className="support-display" onClick={() => action(3)}>
              <h3 className="support-header">Support</h3>
              {/* <p className='support-summary'>We can help you here</p> */}
            </div>
          </div>
        </div>

        <div className="contents">
          <div className={`${state === 1 ? "active-content" : "content"}`}>
            <form>
              <div className="inner-form container">
                <div className="user-img-div">
                  <img
                    src={imgPath}
                    className="user-avatar"
                    alt="your-avatar"
                  />
                </div>

                <div>
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    className="form-control"
                    defaultValue={user.email}
                  />

                  <label htmlFor="name">Display name</label>
                  <input
                    type="text"
                    id="name"
                    className="form-control"
                    defaultValue={user.displayName}
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
            <form>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                className="form-control"
                defaultValue={user.email}
              />

              <div>
                <label htmlFor="newemail">New email</label>
                <input
                  type="email"
                  id="newemail"
                  className="form-control"
                  defaultValue={user.email}
                />

                <label htmlFor="password">Password</label>
                <input
                  type="text"
                  id="name"
                  className="form-control"
                  defaultValue={user.displayName}
                />

                <label htmlFor="newpassword">New password</label>
                <input
                  type="text"
                  id="newnewpasswordname"
                  className="form-control"
                  defaultValue={user.displayName}
                />

                <button className="btn btn-primary mt-3">Update</button>
              </div>
            </form>
          </div>

          <div className={`${state === 3 ? "active-content" : "content"}`}>
            <div>
              <h3>Help</h3>
              <p>Having Trouble?</p>
            </div>

            <div>
              <h3>FAQ</h3>
              <p>VIew out Frequently asked questions</p>
            </div>

            <div>
              <h3>Contact us</h3>
              <p>Contact our support team, offer limited to premium users</p>
            </div>

            <div>
              <h3>Report an issue</h3>
              <p>Report what's not working well, so we can fix it</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyAccount;
