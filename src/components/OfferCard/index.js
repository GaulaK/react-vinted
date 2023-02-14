import "./OfferCard.css";
import { Link } from "react-router-dom";

const OfferCard = ({ offer }) => {
  // Search if Offer has a brand to display it under the picture, else return undefined
  const findBrand = (offer) => {
    const details = offer.product_details;
    for (let index = 0; index < details.length; index++) {
      if (details[index].hasOwnProperty("MARQUE")) {
        return details[index]["MARQUE"];
      }
    }
    return undefined;
  };

  // Search if Offer has a size to display it under the picture, else return undefined
  const findSize = (offer) => {
    const details = offer.product_details;
    for (let index = 0; index < details.length; index++) {
      if (details[index].hasOwnProperty("TAILLE")) {
        return details[index]["TAILLE"];
      }
    }
    return undefined;
  };
  return (
    <div className="offer--card">
      <div className="user--info">
        {offer.owner.account.avatar?.secure_url && (
          // Check if user has a profile picture
          <img alt="profile" src={offer.owner.account.avatar.secure_url} />
        )}
        <span>{offer.owner.account.username}</span>
      </div>
      <Link style={{ textDecoration: "none" }} to={`/offer/${offer._id}`}>
        <div className="picture--offer">
          <img
            alt={offer.product_description}
            src={offer.product_image.secure_url}
          />
        </div>
        <div className="details--offer">
          <p className="price--offer">
            {`${offer.product_price.toString().replace(/\./g, ",")} €`}
          </p>
          {findSize(offer) && <p className="size--offer">{findSize(offer)}</p>}
          {findBrand(offer) && (
            <p className="brand--offer">{findBrand(offer)}</p>
          )}
        </div>
      </Link>
    </div>
  );
};

export default OfferCard;
