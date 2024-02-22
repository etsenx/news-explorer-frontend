import { createRef, useEffect, useState } from "react";

import PopupWithForm from "../PopupWithForm/PopupWithForm";

import "./PopupSignin.css";
import MobilePopupWithForm from "../MobilePopupWithForm/MobilePopupWithForm";

function PopupSignin(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showEmailError, setShowEmailError] = useState(false);
  const [showPasswordError, setShowPasswordError] = useState(false);
  const [isInputEmpty, setIsInputEmpty] = useState(true);
  const saveButton = createRef();

  useEffect(() => {
    if (email === "" || password === "") {
      setIsInputEmpty(true);
    } else {
      setIsInputEmpty(false);
    }
  }, [email, password]);

  function handleInputChange(e) {
    e.preventDefault();
    if (e.target.id === "email") {
      setEmail(e.target.value);
    } else {
      setPassword(e.target.value);
    }
  }

  function hideError() {
    setShowEmailError(false);
    setShowPasswordError(false);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    hideError();
    const result = await props.handleLogin(email, password);
    if (result.success) {
      setEmail("");
      setPassword("");
    } else {
      if (result.error === "Email not found") {
        setShowEmailError(true);
      } else {
        setShowPasswordError(true);
      }
    }
  }

  return props.isMobile ? (
    <MobilePopupWithForm
      heading="Masuk"
      button="Masuk"
      link="Daftar"
      isOpen={props.isOpen}
      onClose={props.onClose}
      handlePopupOpen={props.onSignupOpen}
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
          value={email}
          onChange={handleInputChange}
        />
        <span
          style={{ display: showEmailError ? "block" : "none" }}
          className="popup-input__error popup-input__email-error"
        >
          Alamat email salah
        </span>
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
          value={password}
          onChange={handleInputChange}
        />
        <span
          style={{ display: showPasswordError ? "block" : "none" }}
          className="popup-input__error popup-input__password-error"
        >
          Kata sandi salah
        </span>
      </div>
    </MobilePopupWithForm>
  ) : (
    <PopupWithForm
      heading="Masuk"
      button="Masuk"
      link="Daftar"
      isOpen={props.isOpen}
      onClose={props.onClose}
      handlePopupOpen={props.onSignupOpen}
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
          value={email}
          onChange={handleInputChange}
        />
        <span
          style={{ display: showEmailError ? "block" : "none" }}
          className="popup-input__error popup-input__email-error"
        >
          Alamat email salah
        </span>
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
          value={password}
          onChange={handleInputChange}
        />
        <span
          style={{ display: showPasswordError ? "block" : "none" }}
          className="popup-input__error popup-input__password-error"
        >
          Kata sandi salah
        </span>
      </div>
    </PopupWithForm>
  );
}

export default PopupSignin;
