import "./Publish.css";
import { Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

import Dropzone from "../../components/Dropzone";

const Publish = ({ token }) => {
  const [picture, setPicture] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [condition, setCondition] = useState("");
  const [city, setCity] = useState("");
  const [price, setPrice] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("picture", picture);
      formData.append("title", title);
      formData.append("description", description);
      formData.append("price", price.replace(",", ".").replace(" ", ""));
      formData.append("size", size);
      formData.append("color", color);
      formData.append("condition", condition);
      formData.append("city", city);
      formData.append("brand", brand);

      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/offer/publish",
        formData,
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data._id) {
        navigate(`/offer/${response.data._id}`);
      } else {
        alert("aled ?");
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        alert(error?.response?.data?.message);
      } else {
        console.log(error);
      }
    }
  };

  return !token ? (
    <Navigate to="/login" state={{ previousPage: "/publish" }} />
  ) : (
    <>
      <main>
        <div className="publish--container">
          <h2>Vends ton article</h2>
          <form onSubmit={handleSubmit}>
            <div className="picture-input--container">
              <Dropzone setPicture={setPicture} picture={picture} />
            </div>
            <div className="title-description-input--container">
              <div className="field--container">
                <h3>Titre</h3>
                <input
                  type="text"
                  name="title"
                  placeholder="ex: Chemise S??zane verte"
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                />
              </div>
              <div className="field--container">
                <h3>D??cris ton article</h3>
                <textarea
                  name="description"
                  placeholder="ex: port?? quelquefois, taille correctement"
                  rows="5"
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                ></textarea>
              </div>
            </div>
            <div className="details-input--container">
              <div className="field--container">
                <h3>Marque</h3>
                <input
                  type="text"
                  name="brand"
                  placeholder="ex: Zara"
                  value={brand}
                  onChange={(event) => setBrand(event.target.value)}
                />
              </div>
              <div className="field--container">
                <h3>Taille</h3>
                <input
                  type="text"
                  name="size"
                  placeholder="ex: L/40/12"
                  value={size}
                  onChange={(event) => setSize(event.target.value)}
                />
              </div>
              <div className="field--container">
                <h3>Couleur</h3>
                <input
                  type="text"
                  name="color"
                  placeholder="ex: Fushia"
                  value={color}
                  onChange={(event) => setColor(event.target.value)}
                />
              </div>
              <div className="field--container">
                <h3>Etat</h3>
                <input
                  type="text"
                  name="condition"
                  placeholder="ex: Neuf avec ??tiquette"
                  value={condition}
                  onChange={(event) => setCondition(event.target.value)}
                />
              </div>
              <div className="field--container">
                <h3>Lieu</h3>
                <input
                  type="text"
                  name="city"
                  placeholder="ex: Paris"
                  value={city}
                  onChange={(event) => setCity(event.target.value)}
                />
              </div>
            </div>
            <div className="price-input--container">
              <div className="field--container">
                <h3>Price</h3>
                <div className="checkbox-price">
                  <input
                    type="text"
                    name="price"
                    placeholder="ex: 0,00???"
                    value={price}
                    onChange={(event) => setPrice(event.target.value)}
                  />
                  <input type="checkbox" />
                  <span>Je suis int??ress??(e) par les ??changes</span>
                </div>
              </div>
            </div>
            <div></div>
            <div className="submit--container">
              <input type="submit" value="Ajouter" />
            </div>
          </form>
        </div>
      </main>
    </>
  );
};

export default Publish;
