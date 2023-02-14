import "./CheckoutForm.css";

import { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";

import axios from "axios";

const CheckoutForm = ({ totalPrice, offer, token }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [completed, setCompleted] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    // take data from form
    const cardElement = elements.getElement(CardElement);
    const stripeResponse = await stripe.createToken(cardElement, {
      name: token,
    });

    // save token of payment
    const stripeToken = stripeResponse.token.id;

    // try to send payment
    const response = await axios.post(
      "https://lereacteur-vinted-api.herokuapp.com/payment",
      {
        token: stripeToken,
        title: offer.product_name,
        amount: totalPrice,
      }
    );

    // if suceeded, the transaction has been made
    if (response.data.status === "succeeded") {
      setCompleted(true);
    }
  };
  return (
    <>
      {!completed ? (
        <form onSubmit={handleSubmit}>
          <CardElement className="payment--form" />
          <button className="submit-payment--button" type="submit">
            Payer
          </button>
        </form>
      ) : (
        <p className="succeeded-payement">Paiement effectué ! </p>
      )}
    </>
  );
};

export default CheckoutForm;
