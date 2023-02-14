import "./Offer.css";

import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import Spinner from "../../components/Spinner";

const Offer = () => {
  const { id } = useParams();
  const [data, setData] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://lereacteur-vinted-api.herokuapp.com/offer/${id}`
        );
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [id]);

  return isLoading ? (
    <div className="offer--background">
      <Spinner />
    </div>
  ) : (
    <div className="offer--background">
      <div className="offer--container">
        <div className="offer--picture">
          <img
            alt={data.product_description}
            src={data.product_image.secure_url}
          ></img>
        </div>
        <div className="offer--informations">
          <div className="offer--detail">
            <p className="offer--price">{`${data.product_price} €`}</p>
            {data.product_details?.length > 0 && (
              <ul className="offer-details--list">
                {data.product_details.map((detail, index) => {
                  const key = Object.keys(detail)[0];
                  return (
                    <li key={index}>
                      <span>{key}</span>
                      <span>{detail[key]}</span>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
          <div className="gray--separator"></div>
          <div className="offer--presentation">
            <p className="offer--name">{data.product_name}</p>
            <p className="offer--description">{data.product_description}</p>
            <div className="offer--owner">
              <div className="offer--owner-profil-picture">
                {data.owner.account.avatar && (
                  <img
                    alt={`Profil ${data.owner.account.username}`}
                    src={data.owner.account.avatar.secure_url}
                  />
                )}
              </div>
              <p className="offer--owner-username">
                {data.owner.account.username}
              </p>
            </div>
          </div>
          <Link
            className="buy-button"
            to="/payment"
            state={{ offer: data, previousPage: `/offer/${id}` }}
          >
            Acheter
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Offer;
