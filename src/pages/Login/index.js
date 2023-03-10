import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

import "./Login.css";

// TODO: Merge with LoginForm
// TODO: Prevent the opening of Modal on this page
const Login = ({ updateToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorLogin, setErrorLogin] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  const previousPage = location.state?.previousPage
    ? location.state?.previousPage
    : "/";

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const data = { email, password };
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/user/login",
        data
      );
      if (response.data?.token) {
        setErrorLogin("");
        updateToken(response.data.token);
        navigate(previousPage ? previousPage : "/");
      } else {
        alert("aled ?!");
      }
    } catch (error) {
      if (error.response.status === 400 || error.response.status === 401) {
        setErrorLogin("Adresse email et/ou mot de passe incorrect");
      }
    }
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
      <Link
        to="/signup"
        style={{ textDecoration: "none" }}
        state={{ previousPage: previousPage }}
      >
        <p className="not-account--button">
          Pas encore de compte ? Inscris-toi !
        </p>
      </Link>
    </div>
  );
};

export default Login;
