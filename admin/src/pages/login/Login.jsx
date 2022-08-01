import React from "react";
import "./login.css";

function Login() {
  return (
    <div className="login">
      <form action="" className="loginForm">
        <input type="text" className="loginInput" placeholder="username" />
        <input type="password" className="loginInput" placehold="password" />
        <button className="loginButton">Login</button>
      </form>
    </div>
  );
}

export default Login;
