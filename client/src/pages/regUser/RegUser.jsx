import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./regUser.scss";

function RegUser() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();

  const handleStart = () => {
    setEmail(emailRef.current.value);
  };

  const handleFinish = () => {
    email.preventDefault();
    setPassword(passwordRef.current.value);
    console.log(passwordRef.current.value);
  };

  return (
    <div className="register">
      <div className="top">
        <div className="wrapper">
          <img
            className="logo"
            alt="netflix logo"
            src="https://www.freepnglogos.com/uploads/netflix-logo-0.png"
          ></img>
          <button className="loginButton" onClick={() => navigate("/login")}>
            Sign In
          </button>
        </div>
      </div>
      <div className="container">
        <h1>Unlimited Movies, TV shows and more</h1>
        <h2>Watch anywhere. Cancel Anytime</h2>
        <p>
          Ready to watch? Enter your email to create or restart your membership
        </p>
        {!email ? (
          <div className="input">
            <input
              type="email"
              placeholder="Email Address"
              ref={emailRef}
            ></input>
            <button className="registerButton" onClick={handleStart}>
              Get Started
            </button>
          </div>
        ) : (
          <form className="input">
            <input
              type="password"
              ref={passwordRef}
              placeholder="Password"
            ></input>
            <button className="registerButton" onClick={handleFinish}>
              Start
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default RegUser;
