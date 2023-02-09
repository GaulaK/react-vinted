import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorLogin, setErrorLogin] = useState("");

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };
  return (
    <div className="login--container">
      <h2>Se connecter</h2>
      {errorLogin && <p className="error--login">{errorLogin}</p>}
      <form className="login--form" onSubmit={handleSubmit}>
        <input
          placeholder="Adresse email"
          type="email"
          value={email}
          onChange={handleEmailChange}
        />
        <input
          placeholder="Mot de passe"
          type="password"
          value={password}
          onChange={handlePasswordChange}
        />
        <button className="form--login-button">Se connecter</button>
      </form>
      <Link to="/signup" style={{ textDecoration: "none" }}>
        <p className="not-account--button">
          Pas encore de compte ? Inscris-toi !
        </p>
      </Link>
    </div>
  );
};

export default Login;
