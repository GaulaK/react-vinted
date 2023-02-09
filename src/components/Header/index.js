import "./Header.css";
import logo from "../../assets/img/logo-vinted.png";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  return (
    <header>
      <div className="header--container">
        <Link to="/">
          <div className="header--logo">
            <img alt="Logo Vinted" src={logo} />
          </div>
        </Link>
        <div className="buttons--container">
          <button
            className="signup--button"
            onClick={() => navigate("/signup")}
          >
            S'inscrire
          </button>
          <button className="login--button">Se Connecter</button>
          <button className="sell-products--button">Vends tes articles</button>
        </div>
      </div>
    </header>
  );
};

export default Header;
