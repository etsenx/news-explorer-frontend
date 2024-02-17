import './PopupSignupSuccess.css';
import closeButton from '../../images/close.png';

function PopupSignupSuccess(props) {
  return (props.isOpen && (props.isMobile ? (
    <div className={`${props.isOpen ? "mobile-popup" : ""}`}>
      <div className="popup-container mobile-popup-success-container">
        <div className="popup-content">
          <h2 className="popup-success__heading">Registrasi berhasil!</h2>
          <span onClick={props.onSigninOpen} className="popup-success__link">Masuk</span>
          <button className="popup__close-button">
            <img src={closeButton} onClick={props.onClose} alt='Close Button' />
          </button>
        </div>
      </div>
    </div>
  ) : (
    <div className={`popup ${props.isOpen ? "popup_opened" : ""}`}>
      <div className="popup-container popup-success-container">
        <div className="popup-content">
          <h2 className="popup-success__heading">Registrasi berhasil!</h2>
          <span onClick={props.onSigninOpen} className="popup-success__link">Masuk</span>
          <button className="popup__close-button">
            <img src={closeButton} onClick={props.onClose} alt='Close Button' />
          </button>
        </div>
      </div>
    </div>
  )))
}

export default PopupSignupSuccess;