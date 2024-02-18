import { useContext, useEffect, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

import LogoutIcon from "../../images/logout.png";
import LogoutIconDark from "../../images/logout-dark.png";
import NavIcon from "../../images/menu.png";
import NavIconDark from "../../images/menu(dark).png";
import CloseIcon from "../../images/close.png";

import "./Navigation.css";

function Header(props) {
  const currentUser = useContext(CurrentUserContext);
  const navInsideRef = useRef(null);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState();
  const [notLoggedInButtonStyle, setNotLoggedInButtonStyle] = useState({
    width: "176px",
    margin: 0,
  });
  const [loggedInButtonStyle, setLoggedInButtonStyle] = useState({
    minWidth: "112px",
  });
  const [isAnyPopupOpen, setIsAnyPopupOpen] = useState(false);

  const navigate = useNavigate();
  const homeNavLink = {};

  useEffect(() => {
    // Mobile Popup doesnt have dark theme
    if (props.isDark && !isMenuOpen) {
      setIsDark("dark");
    } else {
      setIsDark("");
    }

    // Button Style
    function updateButtonStyles() {
      if (mobileCheck()) {
        setNotLoggedInButtonStyle({
          width: "100%",
        });
        setLoggedInButtonStyle({
          width: "100%",
        });
      } else if (tabletCheck()) {
        setNotLoggedInButtonStyle({
          width: "152px",
        });
        setLoggedInButtonStyle({
          minWidth: "100px",
        });
      } else {
        setNotLoggedInButtonStyle({
          width: "176px",
          margin: 0,
        });

        setLoggedInButtonStyle({
          minWidth: "112px",
          width: "auto",
        });
      }
    }

    // Handle outside menu click
    if (isMenuOpen && mobileCheck()) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }

    updateButtonStyles();

    window.addEventListener("resize", updateButtonStyles);

    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    if (
      props.isPopupSigninOpen ||
      props.isPopupSignupOpen ||
      props.isPopupSignupSuccess
    ) {
      setIsAnyPopupOpen(true);
    } else {
      setIsAnyPopupOpen(false);
    }

    return () => {
      window.removeEventListener("resize", updateButtonStyles);
      document.removeEventListener("click", handleClickOutside);
    };
  }, [
    isMenuOpen,
    props.isDark,
    props.isPopupSigninOpen,
    props.isPopupSignupOpen,
    props.isPopupSignupSuccess,
  ]);

  function handleLogout() {
    props.handleLogout();
    navigate("/");
  }

  function handleMenuClick(e) {
    e.preventDefault();
    if (isMenuOpen) {
      setIsMenuOpen(false);
    } else {
      setIsMenuOpen(true);
    }
  }

  function handleClickOutside(e) {
    if (navInsideRef.current && !navInsideRef.current.contains(e.target)) {
      setIsMenuOpen(false);
    }
  }

  function handleSigninButtonClick() {
    setIsMenuOpen(false);
    props.onSigninClick();
  }

  function mobileCheck() {
    return (
      window.matchMedia &&
      window.matchMedia("(min-width: 320px)").matches &&
      window.matchMedia("(max-width: 767px)").matches
    );
  }

  function tabletCheck() {
    return (
      window.matchMedia &&
      window.matchMedia("(min-width: 768px)").matches &&
      window.matchMedia("(max-width: 1023px)").matches
    );
  }

  return (
    // Check if menu is open and is mobile
    <nav className={`nav ${isMenuOpen && mobileCheck() ? "nav-opened" : ""} `}>
      {/* Check if mobile */}
      {mobileCheck() ? (
        <div
          className={`${isMenuOpen ? "nav-inside-opened" : ""} ${
            isMenuOpen && currentUser ? "nav-logged-in" : ""
          }`}
          ref={navInsideRef}
        >
          {/* Check if mobile and any popup open, if true nav is close button to close mobile popup */}
          {mobileCheck() && isAnyPopupOpen ? (
            <div
              style={{ display: "flex", justifyContent: "flex-end" }}
              className='nav-mobile'
            >
              <button
                style={{
                  border: "none",
                  background: "none",
                  padding: "none",
                }}
              >
                <img
                  src={CloseIcon}
                  className='nav-icon'
                  alt='close'
                  onClick={props.handleClosePopup}
                />
              </button>
            </div>
          ) : (
            <div style={{ display: "flex" }} className='nav-mobile'>
              <p className={`logo ${isDark}`}>NewsExplorer</p>
              {isMenuOpen ? (
                <button
                  style={{
                    border: "none",
                    background: "none",
                    padding: "none",
                  }}
                >
                  <img
                    src={CloseIcon}
                    className='nav-icon'
                    alt='close'
                    onClick={handleMenuClick}
                  />
                </button>
              ) : (
                <button
                  style={{
                    border: "none",
                    background: "none",
                    padding: "none",
                  }}
                  onClick={handleMenuClick}
                >
                  <img
                    src={isDark ? NavIconDark : NavIcon}
                    className='nav-icon'
                    alt='menu'
                  />
                </button>
              )}
            </div>
          )}
          <div className={`nav__container ${!isMenuOpen ? "hide-menu" : ""}`}>
            <NavLink
              to='/'
              style={homeNavLink}
              className={`nav__link ${isDark} nav__link_selected`}
            >
              <span>Beranda</span>
            </NavLink>
            {currentUser ? (
              <>
                <NavLink to='/saved-news' className={`nav__link ${isDark}`}>
                  <span>Artikel tersimpan</span>
                </NavLink>
                <button
                  style={{ marginTop: "16px", marginBottom: "16px" }}
                  className={`nav__login ${
                    props.isDark ? "nav__login_dark" : ""
                  }`}
                  onClick={handleLogout}
                >
                  <span className='nav__login-span' style={loggedInButtonStyle}>
                    <span className={`nav__login-span-name ${isDark}`}>
                      {currentUser.username}
                    </span>
                    <img
                      src={
                        props.isDark && !isMenuOpen
                          ? LogoutIconDark
                          : LogoutIcon
                      }
                      alt='logout-icon'
                    />
                  </span>
                </button>
              </>
            ) : (
              <button
                className={`nav__login ${
                  props.isDark ? "nav__login_dark" : ""
                }`}
                onClick={handleSigninButtonClick}
              >
                <span
                  className='nav__login-span'
                  style={notLoggedInButtonStyle}
                >
                  Masuk
                </span>
              </button>
            )}
          </div>
        </div>
      ) : (
        <>
          <div style={{ display: "flex" }}>
            <p className={`logo ${isDark}`}>NewsExplorer</p>
            {isMenuOpen ? (
              <button
                style={{ border: "none", background: "none", padding: "none" }}
              >
                <img
                  src={CloseIcon}
                  className='nav-icon'
                  alt='close'
                  onClick={handleMenuClick}
                />
              </button>
            ) : (
              <button
                style={{ border: "none", background: "none", padding: "none" }}
                onClick={handleMenuClick}
              >
                <img src={NavIcon} className='nav-icon' alt='menu' />
              </button>
            )}
          </div>
          <div className={`nav__container ${!isMenuOpen ? "hide-menu" : ""}`}>
            <NavLink
              to='/'
              style={homeNavLink}
              className={`nav__link ${isDark} nav__link_selected`}
            >
              <span>Beranda</span>
            </NavLink>
            {currentUser ? (
              <>
                <NavLink to='/saved-news' className={`nav__link ${isDark}`}>
                  <span>Artikel tersimpan</span>
                </NavLink>
                <button
                  style={{ marginTop: "16px", marginBottom: "16px" }}
                  className={`nav__login ${
                    props.isDark ? "nav__login_dark" : ""
                  }`}
                  onClick={handleLogout}
                >
                  <span className='nav__login-span' style={loggedInButtonStyle}>
                    <span className={`nav__login-span-name ${isDark}`}>
                      {currentUser.username}
                    </span>
                    <img
                      src={props.isDark ? LogoutIconDark : LogoutIcon}
                      alt='logout-icon'
                    />
                  </span>
                </button>
              </>
            ) : (
              <button
                className={`nav__login ${
                  props.isDark ? "nav__login_dark" : ""
                }`}
                onClick={props.onSigninClick}
              >
                <span
                  className='nav__login-span'
                  style={notLoggedInButtonStyle}
                >
                  Masuk
                </span>
              </button>
            )}
          </div>
        </>
      )}
    </nav>
  );
}

export default Header;
