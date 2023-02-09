import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Cookies from "js-cookie";

//Pages
import Home from "./pages/Home";
import Offer from "./pages/Offer";
import Signup from "./pages/Signup";
import Login from "./pages/Login";

//Components
import Header from "./components/Header";
import LoginModal from "./components/LoginModal";

function App() {
  const [token, setToken] = useState(Cookies.get("token") || null);
  const [loginVisible, setLoginVisible] = useState(false);

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
        loginVisible={loginVisible}
        setLoginVisible={setLoginVisible}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/offer/:id" element={<Offer />} />
        <Route path="/signup" element={<Signup updateToken={updateToken} />} />
        <Route path="/login" element={<Login updateToken={updateToken} />} />
        <Route />
      </Routes>
      {loginVisible && (
        <LoginModal
          setLoginVisible={setLoginVisible}
          updateToken={updateToken}
        />
      )}
    </Router>
  );
}

export default App;
