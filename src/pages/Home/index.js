import "./Home.css";
import homeBanner from "../../assets/img/home-banner.jpg";
import OfferCard from "../../components/OfferCard";

const Home = ({ data, isLoading }) => {
  return isLoading ? (
    <p>Chargement en cours</p>
  ) : (
    <>
      <section className="home-banner">
        <div>
          <img
            alt="two people looking at and sorting their clothes"
            src={homeBanner}
          />
        </div>
        <div className="text--banner--container">
          <h1>Prêts à faire du tri dans vos placards ?</h1>
          <button>Commencer à vendre</button>
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
