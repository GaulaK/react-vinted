import "./Home.css";
import homeBanner from "../../assets/img/home-banner.jpg";
import OfferCard from "../../components/OfferCard";
import tearing from "../../assets/img/tearing.svg";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Spinner from "../../components/Spinner";

const Home = ({ search, sort }) => {
  const navigate = useNavigate();

  const [data, setData] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://lereacteur-vinted-api.herokuapp.com/offers?${
            sort ? "sort=price-desc" : "sort=price-asc"
          }${search && `&title=${search}`}`
        );
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [search, sort]);

  return isLoading ? (
    <Spinner />
  ) : (
    <>
      <section className="home-banner">
        <div className="banner--image">
          <img
            alt="two people looking at and sorting their clothes"
            src={homeBanner}
          />
        </div>
        <div className="text--banner--container">
          <h1>Prêts à faire du tri dans vos placards ?</h1>
          <button onClick={() => navigate("/publish")}>
            Commencer à vendre
          </button>
        </div>
        <div className="tearing">
          <img alt="tearing" src={tearing} />
        </div>
      </section>
      <section className="products">
        <div className="products--container">
          {data["offers"].map((offer) => {
            return <OfferCard key={offer._id} offer={offer} />;
          })}
        </div>
      </section>
    </>
  );
};

export default Home;
