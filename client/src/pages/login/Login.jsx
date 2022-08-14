import React, { useState, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { loginCall } from "../../context/authContext/authApiCalls";
import { AuthContext } from "../../context/authContext/AuthContext";
import "./login.scss";

function Login() {
  const [user, setUser] = useState({});
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();
  const { dispatch } = useContext(AuthContext);

  function handleChange(e) {
    setUser({ ...user, [e.target.type]: e.target.value });
  }

  async function handleClick(e) {
    e.preventDefault();
    try {
      await loginCall(user, dispatch);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="login">
      <div className="top">
        <div className="wrapper">
          <img
            className="logo"
            alt="netflix logo"
            src="https://www.freepnglogos.com/uploads/netflix-logo-0.png"
          ></img>
        </div>
      </div>
      <div className="container">
        <form>
          <h1>Sign In</h1>
          <input
            type="email"
            placeholder="Email or Phone number"
            onChange={handleChange}
          ></input>
          <input
            type="password"
            placeholder="Password"
            onChange={handleChange}
          />
          <button className="loginButton" onClick={handleClick}>
            Sign In
          </button>
          <span>
            New to Netflix?
            <b onClick={() => navigate("/register")}>Sign up now.</b>
          </span>
          <small>
            This page is protected by Google reCAPTCHA to ensure you're not a
            bot.
            <b>Learn More</b>
          </small>
        </form>
      </div>
    </div>
  );
}

export default Login;
