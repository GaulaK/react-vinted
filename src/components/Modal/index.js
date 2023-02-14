import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./Modal.css";
import LoginForm from "../loginForm";
import SignUpForm from "../SignUpForm";

const Modal = ({ updateToken, modalContent, setModalContent }) => {
  return (
    <div
      className="modal-root"
      onClick={() => {
        setModalContent(null);
        const body = document.querySelector("body");
        body.style.overflow = "auto";
      }}
    >
      {
        <div
          className="modal--container"
          onClick={(event) => {
            event.stopPropagation();
          }}
        >
          <div className="close-modal--button--container">
            <button
              className="close-modal--button"
              onClick={() => {
                setModalContent(null);
                const body = document.querySelector("body");
                body.style.overflow = "auto";
              }}
            >
              <FontAwesomeIcon
                className="cross--remove--form"
                icon="fa-solid fa-xmark"
              />
            </button>
          </div>
          {modalContent === "login" && (
            <LoginForm
              updateToken={updateToken}
              setModalContent={setModalContent}
            />
          )}
          {modalContent === "signup" && (
            <SignUpForm
              updateToken={updateToken}
              setModalContent={setModalContent}
            />
          )}
        </div>
      }
    </div>
  );
};

export default Modal;
