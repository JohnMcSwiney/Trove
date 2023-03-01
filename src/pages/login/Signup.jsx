import React from "react";

const Signup = () => {
  return (
    <div className="form-group container">
      <h1>Trove Music</h1>
      <h3>Sign up for free to explore your own music treasure </h3>
      <form>
        <label for="email">What's your email?</label>
        <input
          className="form-control"
          id="email"
          type={"email"}
          placeholder="Enter your email."
        />

        <label for="Cemail">Confirm your email</label>
        <input
          className="form-control"
          id="Cemail"
          type={"email"}
          placeholder="Enter your email again."
        />

        <label for="password">Create a password</label>
        <input
          className="form-control"
          id="password"
          type={"password"}
          placeholder="Create a password."
        />

        <label for="Cpassword">Create a password</label>
        <input
          className="form-control"
          id="Cpassword"
          type={"password"}
          placeholder="Enter your password again."
        />

        <label for="name">How should we call you?</label>
        <input
          className="form-control"
          id="name"
          type={"text"}
          placeholder="Enter your profile name."
        />

        <label for="day">What's your date of birth?</label>
        <input className="form-control" id="day" type="date" />

        <div className="gender-div">
          <p>What's your gender?</p>
          <div className="form-check">
            <input
              className="form-check-input"
              id="male"
              type="radio"
              name="gender"
            />
            <label className="form-check-label" for="male">
              Male
            </label>
          </div>

          <div className="form-check">
            <input
              className="form-check-input"
              id="female"
              type="radio"
              name="gender"
            />
            <label className="form-check-label" for="female">
              Female
            </label>
          </div>

          <div className="form-check">
            <input
              className="form-check-input"
              id="nonbinary"
              type="radio"
              name="gender"
            />
            <label className="form-check-label" for="nonbinary">
              Non-binary
            </label>
          </div>

          <div className="form-check">
            <input
              className="form-check-input"
              id="other"
              type="radio"
              name="gender"
            />
            <label className="form-check-label" for="other">
              Other
            </label>
          </div>
        </div>

        <button className="btn btn-primary">Sign up</button>
      </form>
    </div>
  );
};

export default Signup;
