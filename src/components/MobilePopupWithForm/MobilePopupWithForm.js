import "./MobilePopupWithForm.css";

function MobilePopupWithForm(props) {
  return props.isOpen ? (
    <div className="mobile-popup">
      <div className="mobile-popup-container">
        <div className="mobile-popup-content">
          <h2 className="mobile-popup-heading">{props.heading}</h2>
          <form onSubmit={props.onSubmit}>
            {props.children}
            <button
              className={`mobile-popup-form__submit popup-form__submit ${
                props.isInputEmpty ? "popup-form__submit-inactive" : ""
              }`}
              disabled={props.isInputEmpty}
              ref={props.saveButton}
            >
              {props.button}
            </button>
          </form>
          <p className="popup__option">
            atau{" "}
            <span className="popup__link" onClick={props.handlePopupOpen}>
              {props.link}
            </span>
          </p>
        </div>
      </div>
    </div>
  ) : (
    ""
  );
}

export default MobilePopupWithForm;
