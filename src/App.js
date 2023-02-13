import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Cookies from "js-cookie";

//Pages
import Home from "./pages/Home";
import Offer from "./pages/Offer";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

//Components
import Header from "./components/Header";
import Modal from "./components/Modal";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faXmark, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import Publish from "./pages/Publish";
library.add(faXmark, faMagnifyingGlass);

function App() {
  const [token, setToken] = useState(Cookies.get("token") || null);
  const [modalContent, setModalContent] = useState(null);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState(false);
  // memorize the last page, to redirect after a login/signup
  const [previousPage, setPreviousPage] = useState("/");

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
        search={search}
        setSearch={setSearch}
        sort={sort}
        setSort={setSort}
      />
      <Routes>
        <Route path="/" element={<Home search={search} sort={sort} />} />
        <Route path="/offer/:id" element={<Offer />} />
        <Route
          path="/publish"
          element={
            <Publish
              token={token}
              setPreviousPage={setPreviousPage}
              previousPage={previousPage}
            />
          }
        />
        <Route
          path="/login"
          element={
            <Login updateToken={updateToken} previousPage={previousPage} />
          }
        />
        <Route
          path="/signup"
          element={
            <Signup updateToken={updateToken} previousPage={previousPage} />
          }
        />
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
