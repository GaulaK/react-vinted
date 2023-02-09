import "./Home.css";
import homeBanner from "../../assets/img/home-banner.jpg";
import OfferCard from "../../components/OfferCard";
import tearing from "../../assets/img/tearing.svg";
import { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
  const [data, setData] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://lereacteur-vinted-api.herokuapp.com/offers"
      );
      setData(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return isLoading ? (
    <p>Chargement en cours</p>
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
          <button>Commencer à vendre</button>
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
