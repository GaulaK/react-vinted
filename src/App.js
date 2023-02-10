import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Cookies from "js-cookie";

//Pages
import Home from "./pages/Home";
import Offer from "./pages/Offer";

//Components
import Header from "./components/Header";
import Modal from "./components/Modal";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
library.add(faXmark);

function App() {
  const [token, setToken] = useState(Cookies.get("token") || null);
  // const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const updateToken = (token) => {
    if (token) {
      setToken(token);
      Cookies.set("token", token);
    } else {
      Cookies.remove("token");
      setToken(null);
    }
  };

  return (
    <Router>
      <Header
        updateToken={updateToken}
        token={token}
        modalContent={modalContent}
        setModalContent={setModalContent}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/offer/:id" element={<Offer />} />
        <Route />
      </Routes>
      {modalContent && (
        <Modal
          modalContent={modalContent}
          setModalContent={setModalContent}
          updateToken={updateToken}
        />
      )}
    </Router>
  );
}

export default App;
