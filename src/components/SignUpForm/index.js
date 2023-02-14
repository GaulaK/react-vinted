import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import "./SignUpForm.css";

const SignUpForm = ({ updateToken, setModalContent }) => {
  const [avatar, setAvatar] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newsletter, setNewsletter] = useState(false);
  const [errorSignup, setErrorSignUp] = useState("");

  const navigate = useNavigate();

  const handleUsernameChange = (event) => {
    const value = event.target.value;
    setUsername(value);
  };

  const handleEmailChange = (event) => {
    const value = event.target.value;
    setEmail(value);
  };

  const handlePasswordChange = (event) => {
    const value = event.target.value;
    setPassword(value);
  };

  const handleNewsletterChange = () => {
    setNewsletter(!newsletter);
  };

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const data = { username, email, password, newsletter, avatar };
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/user/signup",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.data?.token) {
        updateToken(response.data.token);
        setModalContent(null);
        const body = document.querySelector("body");
        body.style.overflow = "auto";
        navigate("/");
      } else {
        alert("aled ?!");
      }
      setErrorSignUp("");
    } catch (error) {
      if (error.response.status === 409) {
        setErrorSignUp("Adresse email déjà utilisée !");
      }
      console.log(error);
    }
  };
  return (
    <>
      <h2>S'inscrire</h2>
      {errorSignup && <p className="error--signup">{errorSignup}</p>}
      <form className="signup--form" onSubmit={handleSubmit}>
        <input
          placeholder="Nom d'utilisateur"
          type="text"
          value={username}
          onChange={handleUsernameChange}
        />
        <input
          placeholder="Email"
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
        <div className="profil-picture--container">
          <label htmlFor="profile-picture">Photo de profil</label>
          <input
            type="file"
            name="profile-picture"
            onChange={(event) => {
              setAvatar(event.target.files[0]);
            }}
          />
        </div>
        <div className="checkbox--container">
          <div>
            <input
              type="checkbox"
              //   value={true}
              name="newsletter"
              checked={newsletter}
              onChange={handleNewsletterChange}
            />
            <span>S'inscrire à notre newsletter</span>
          </div>
          <p className="form--condition">
            En m'inscrivant je confirme avoir lu et accepté les Termes &amp;
            Conditions et Politique de Confidentialité de Vinted. Je confirme
            avoir au moins 18 ans.
          </p>
        </div>
        <button className="form--submit-button" type="submit">
          S'inscrire
        </button>
      </form>

      <p
        className="already-account--button"
        onClick={() => {
          setModalContent("login");
        }}
      >
        Tu as déjà un compte ? Connecte-toi !
      </p>
    </>
  );
};

export default SignUpForm;
