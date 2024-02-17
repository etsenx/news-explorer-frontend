import "./PopupWithForm.css";
import closeButton from "../../images/close.png";

function PopupWithForm(props) {
  return props.isOpen ? (
    <div className="popup popup_opened">
      <div className="popup-container">
        <div className="popup-content">
          <h2 className="popup-heading">{props.heading}</h2>
          <form onSubmit={props.onSubmit}>
            {props.children}
            <button
              className={`popup-form__submit ${props.isInputEmpty ? 'popup-form__submit-inactive' : ''}`}
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
        <button className="popup__close-button" onClick={props.onClose}>
          <img src={closeButton} alt="Close Button" />
        </button>
      </div>
    </div>
  ) : (
    ""
  );
}

export default PopupWithForm;
