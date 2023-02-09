import { useState } from "react";
import { Link } from "react-router-dom";
import "./Signup.css";
import axios from "axios";
import Cookies from "js-cookie";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorSignup, setErrorSignUp] = useState("");

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

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const data = { username, email, password };
      //   console.log(data);
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/user/signup",
        data
      );
      if (response.data?.token) {
        Cookies.set("token", response.data.token, { expires: 7 });
      } else {
        alert("aled ?!");
      }
      setErrorSignUp("");
      console.log(response.data);
    } catch (error) {
      if (error.response.status === 409) {
        setErrorSignUp("Adresse email déjà utilisée !");
      }
      console.log(error);
    }
  };
  return (
    <div className="signup--container">
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
        <div className="checkbox--container">
          <div>
            <input type="checkbox" value={true} name="newsletter" />
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
      <Link to="/login" style={{ textDecoration: "none" }}>
        <p className="already-account--button">
          Tu as déjà un compte ? Connecte-toi !
        </p>
      </Link>
    </div>
  );
};

export default Signup;
