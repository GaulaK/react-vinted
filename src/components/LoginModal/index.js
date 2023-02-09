import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import "./LoginModal.css";

const LoginModal = ({ updateToken, setLoginVisible }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorLogin, setErrorLogin] = useState("");

  const navigate = useNavigate();

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
        setLoginVisible(false);
        const body = document.querySelector("body");
        body.style.overflow = "auto";
        navigate("/");
      } else {
        alert("aled ?!");
      }
    } catch (error) {
      console.log(error);
      if (error.response.status === 400 || error.response.status === 401) {
        setErrorLogin("Adresse email et/ou mot de passe incorrect");
      }
    }
  };
  return (
    <div
      className="modal-root"
      onClick={() => {
        setLoginVisible(false);
        const body = document.querySelector("body");
        body.style.overflow = "auto";
      }}
    >
      {
        <div
          className="modal--login--container"
          onClick={(event) => {
            event.stopPropagation();
          }}
        >
          <button
            className="close-modal--button"
            onClick={() => {
              setLoginVisible(false);
              const body = document.querySelector("body");
              body.style.overflow = "auto";
            }}
          >
            Fermer
          </button>
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
      }
    </div>
  );
};

export default LoginModal;
