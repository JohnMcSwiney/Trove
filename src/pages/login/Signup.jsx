import { useState, useEffect } from "react";
import { useSignup } from "../../hooks/useSignup";
import { NavLink, useNavigate } from "react-router-dom";
import "./signup.css"

const Signup = () => {
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [password, setPassword] = useState("");

  const [name, setName] = useState("");
  const [birthDay, setBirthDay] = useState("");
  const [gender, setGender] = useState("male");

  const handleRadioButton = (value) => {
    setGender(value);
    console.log(gender);
  };

  const { signup, isLoading, error } = useSignup();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signup(email, confirmEmail, password, name, birthDay, gender);
    } catch (error) {
      console.log(error.message);
    }
  };

  const navigate = useNavigate();
  const redirectSignup = useEffect(() => {
    const artistID = localStorage.getItem("artistID");
    if (artistID) {
      navigate("/");
    }
  }, [navigate]);
  return (
    <div className="artist--signup form-group container">
      <h1>Trove Music</h1>
      <h3>Sign up for free to explore your own music treasure </h3>
      <form className="artist--signup--form" onSubmit={handleSubmit}>
        <label for="email">What's your email?</label>
        <input
          className="form-control"
          id="email"
          type={"email"}
          placeholder="Enter your email."
          onChange={(e) => setEmail(e.target.value)}
        />

        <label for="confirmEmail">Confirm your email</label>
        <input
          className="form-control"
          id="confirmEmail"
          type={"email"}
          placeholder="Enter your email again."
          onChange={(e) => setConfirmEmail(e.target.value)}
        />

        <label for="password">Create a password</label>
        <input
          className="form-control"
          id="password"
          type={"password"}
          placeholder="Create a password."
          onChange={(e) => setPassword(e.target.value)}
        />

        <label for="name">What should we call you?</label>
        <input
          className="form-control"
          id="name"
          type={"text"}
          placeholder="Enter your profile name."
          onChange={(e) => setName(e.target.value)}
        />

        <label for="day">What's your date of birth?</label>
        <input
          className="form-control"
          id="day"
          type="date"
          onChange={(e) => setBirthDay(e.target.value)}
        />

        <div className="gender-div">
          <p>What's your gender?</p>
          <div className="form-check">
            <input
              className="form-check-input"
              id="male"
              type="radio"
              name="gender"
              checked={gender === "male"}
              onChange={() => handleRadioButton("male")}
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
              checked={gender === "female"}
              onChange={() => handleRadioButton("female")}
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
              checked={gender === "non-binary"}
              onChange={() => handleRadioButton("non-binary")}
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
              checked={gender === "other"}
              onChange={() => handleRadioButton("other")}
            />
            <label className="form-check-label" for="other">
              Other
            </label>
          </div>
        </div>

        <button className="btn btn-primary">Sign up</button>
      </form>
      {error && <p>{error.err}</p>}
      <div className="artist--login--link">
        <p>Already have account?</p>
        <NavLink to={"/login"}>Log in here</NavLink>
      </div>
    </div>
  );
};

export default Signup;
