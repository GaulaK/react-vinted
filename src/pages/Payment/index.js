import "./Payment.css";
import { Navigate, useLocation } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "../../components/CheckoutForm";

const Payment = ({ token }) => {
  const location = useLocation();
  const previousPage = location.state?.previousPage
    ? location.state?.previousPage
    : "/";
  const offer = location.state?.offer ? location.state?.offer : null;

  const stripePromise = loadStripe(
    "pk_test_51HCObyDVswqktOkX6VVcoA7V2sjOJCUB4FBt3EOiAdSz5vWudpWxwcSY8z2feWXBq6lwMgAb5IVZZ1p84ntLq03H00LDVc2RwP"
  );

  const price = offer.product_price;
  const buyerProtection = (offer.product_price / 10).toFixed(2);
  const shippingCost = (buyerProtection * 2).toFixed(2);
  const totalPrice =
    Number(price) + Number(buyerProtection) + Number(shippingCost);

  return !token ? (
    <Navigate to="/login" state={{ previousPage: previousPage }} />
  ) : (
    <div className="payment-page--background">
      <div className="payment-container">
        <div className="payment-details">
          <p className="title">Résumé de la commande</p>
          <ul className="price-details--list">
            <li>
              <span>Commande</span>
              <span>{price} €</span>
            </li>
            <li>
              <span>Frais protections acheteurs</span>
              <span>{buyerProtection} €</span>
            </li>
            <li>
              <span>Frais de port</span>
              <span>{shippingCost} €</span>
            </li>
          </ul>
        </div>
        <div className="payment-card">
          <div className="total-price">
            <span>Total</span>
            <span>{totalPrice} €</span>
          </div>
          <p>
            Il ne vous reste plus qu'une étape pour vour offrir{" "}
            <span>{offer.product_name}. </span>Vous allez payer{" "}
            <span>{totalPrice} €</span> (frais de protection et frais de port
            inclus).
          </p>
          <Elements stripe={stripePromise}>
            <CheckoutForm offer={offer} totalPrice={totalPrice} token={token} />
          </Elements>
        </div>
      </div>
    </div>
  );
};

export default Payment;
