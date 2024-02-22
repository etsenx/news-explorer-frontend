import { useState, useEffect, createRef } from "react";

import PopupWithForm from "../PopupWithForm/PopupWithForm";

import "./PopupSignup.css";
import MobilePopupWithForm from "../MobilePopupWithForm/MobilePopupWithForm";

function PopupSignin(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [isInputEmpty, setIsInputEmpty] = useState(true);
  const [showError, setShowError] = useState(false);
  const saveButton = createRef();

  useEffect(() => {
    if (email === "" || password === "" || username === "") {
      setIsInputEmpty(true);
    } else {
      setIsInputEmpty(false);
    }
  }, [email, password, username]);

  function handleInputChange(e) {
    e.preventDefault();
    if (e.target.id === "email") {
      setEmail(e.target.value);
    } else if (e.target.id === "password") {
      setPassword(e.target.value);
    } else {
      setUsername(e.target.value);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const result = await props.handleRegister(email, password, username);
    if (result.success) {
      setEmail("");
      setPassword("");
      setUsername("");
      setShowError(false);
      props.onClose();
      props.openSuccessPopup();
    } else {
      setShowError(true);
    }
  }

  return props.isMobile ? (
    <MobilePopupWithForm
      button="Daftar"
      heading="Daftar"
      link="Masuk"
      isOpen={props.isOpen}
      onClose={props.onClose}
      handlePopupOpen={props.onSigninOpen}
      isInputEmpty={isInputEmpty}
      saveButton={saveButton}
      onSubmit={handleSubmit}
    >
      <div className="popup-input__container">
        <label htmlFor="email" className="popup-input__label">
          Email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          className="popup-input"
          placeholder="Masukkan email"
          required
          onChange={handleInputChange}
        />
      </div>
      <div className="popup-input__container">
        <label htmlFor="password" className="popup-input__label">
          Kata sandi
        </label>
        <input
          type="password"
          name="password"
          id="password"
          className="popup-input"
          placeholder="Masukkan kata sandi"
          required
          onChange={handleInputChange}
        />
      </div>
      <div className="popup-input__container">
        <label htmlFor="username" className="popup-input__label">
          Nama pengguna
        </label>
        <input
          type="text"
          name="username"
          id="username"
          className="popup-input"
          placeholder="Masukkan nama pengguna"
          required
          onChange={handleInputChange}
        />
      </div>
      <div
        style={{ display: showError ? "block" : "none" }}
        className="popup-input__email-notavail-container"
      >
        <span className="popup-input__error popup-input__email-notavail">
          Email ini tidak tersedia
        </span>
      </div>
    </MobilePopupWithForm>
  ) : (
    <PopupWithForm
      button="Daftar"
      heading="Daftar"
      link="Masuk"
      isOpen={props.isOpen}
      onClose={props.onClose}
      handlePopupOpen={props.onSigninOpen}
      isInputEmpty={isInputEmpty}
      saveButton={saveButton}
      onSubmit={handleSubmit}
    >
      <div className="popup-input__container">
        <label htmlFor="email" className="popup-input__label">
          Email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          className="popup-input"
          placeholder="Masukkan email"
          required
          onChange={handleInputChange}
        />
      </div>
      <div className="popup-input__container">
        <label htmlFor="password" className="popup-input__label">
          Kata sandi
        </label>
        <input
          type="password"
          name="password"
          id="password"
          className="popup-input"
          placeholder="Masukkan kata sandi"
          required
          onChange={handleInputChange}
        />
      </div>
      <div className="popup-input__container">
        <label htmlFor="username" className="popup-input__label">
          Nama pengguna
        </label>
        <input
          type="text"
          name="username"
          id="username"
          className="popup-input"
          placeholder="Masukkan nama pengguna"
          required
          onChange={handleInputChange}
        />
      </div>
      <div
        style={{ display: showError ? "block" : "none" }}
        className="popup-input__email-notavail-container"
      >
        <span className="popup-input__error popup-input__email-notavail">
          Email ini tidak tersedia
        </span>
      </div>
    </PopupWithForm>
  );
}

export default PopupSignin;
