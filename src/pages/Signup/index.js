import { useState } from "react";
import { Link } from "react-router-dom";
import "./Signup.css";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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

  const handleSubmit = (event) => {
    event.preventDefault();
  };
  return (
    <div className="signup--container">
      <h2>S'inscrire</h2>
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
            <input type="checkbox" />
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
      <Link to="/" style={{ textDecoration: "none" }}>
        <p className="already-acount--button">
          Tu as déjà un compte ? Connecte-toi !
        </p>
      </Link>
    </div>
  );
};

export default Signup;
