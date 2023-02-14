import "./Header.css";
import logo from "../../assets/img/logo-vinted.png";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import PriceIntervalBar from "../PriceIntervalBar";

const Header = ({
  updateToken,
  token,
  setModalContent,
  search,
  setSearch,
  sort,
  setSort,
}) => {
  const navigate = useNavigate();
  return (
    <header>
      <div className="header--container">
        <Link to="/">
          <div className="header--logo">
            <img alt="Logo Vinted" src={logo} />
          </div>
        </Link>
        <div className="filters--container">
          <div className="filters--search-bar">
            <input
              value={search}
              type="text"
              className="search-bar--input"
              placeholder="Recherche des articles"
              onChange={(event) => {
                setSearch(event.target.value);
              }}
            />
            <FontAwesomeIcon icon="search" className="fa-magnifying-glass" />
          </div>
          <div className="filters--sort">
            <p>Trier par prix :</p>
            <label className="switch--container">
              <input
                checked={sort}
                type="checkbox"
                onChange={() => {
                  setSort(!sort);
                }}
              />
              <span className="slider"></span>
            </label>
            {/* TODO: Add price interval filter */}
          </div>
        </div>
        <div className="buttons--container">
          {token ? (
            <button
              className="logout--button"
              onClick={() => {
                updateToken(null);
              }}
            >
              Se déconnecter
            </button>
          ) : (
            <>
              <button
                className="signup--button"
                onClick={() => {
                  setModalContent("signup");
                  const body = document.querySelector("body");
                  body.style.overflow = "hidden";
                }}
              >
                S'inscrire
              </button>
              <button
                className="login--button"
                onClick={() => {
                  setModalContent("login");
                  const body = document.querySelector("body");
                  body.style.overflow = "hidden";
                }}
              >
                Se Connecter
              </button>
            </>
          )}
          <button
            className="sell-products--button"
            onClick={() => navigate("/publish")}
          >
            Vends tes articles
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
