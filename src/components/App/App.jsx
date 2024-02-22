import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

import Main from "../Main/Main";
import SavedNews from "../SavedNews/SavedNews";
import Footer from "../Footer/Footer";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import PopupSignin from "../PopupSignin/PopupSignin";
import PopupSignup from "../PopupSignup/PopupSignup";
import PopupSignupSuccess from "../PopupSignupSuccess/PopupSignupSuccess";

import { newsApi } from "../../utils/NewsApi";
import { mainApi } from "../../utils/MainApi";

import "./App.css";

function App() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState();
  const [searchedKeyword, setsearchedKeyword] = useState();
  const [isSearching, setIsSearching] = useState(false);
  const [foundNews, setFoundNews] = useState(false);
  const [foundNewsData, setFoundNewsData] = useState([]);
  const [savedNews, setSavedNews] = useState([]);
  const [isPopupSigninOpen, setIsPopupSigninOpen] = useState(false);
  const [isPopupSignupOpen, setIsPopupSignupOpen] = useState(false);
  const [isPopupSignupSuccess, setIsPopupSignupSuccess] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    function checkToken() {
      if (localStorage.getItem("token")) {
        const token = localStorage.getItem("token");
        mainApi
          .getUserData(token)
          .then((user) => {
            if (user) {
              setCurrentUser(user);
              const token = localStorage.getItem("token");
              mainApi.getAllSavedArticle(token).then((articles) => {
                setSavedNews(articles);
              });
            }
          })
          .catch(() => {
            localStorage.removeItem("token");
            navigate('/');
          });
      }
    }

    checkToken();
  }, [navigate]);

  useEffect(() => {
    if (isPopupSigninOpen || isPopupSignupOpen || isPopupSignupSuccess) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    function resizeDevice() {
      if (mobileCheck()) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    }
    resizeDevice();
    window.addEventListener("resize", resizeDevice);
    return () => {
      window.removeEventListener("resize", resizeDevice);
    };
  }, [isPopupSigninOpen, isPopupSignupOpen, isPopupSignupSuccess]);

  function mobileCheck() {
    return (
      window.matchMedia &&
      window.matchMedia("(min-width: 320px)").matches &&
      window.matchMedia("(max-width: 767px)").matches
    );
  }

  function handleSigninClick() {
    handleClosePopup();
    setIsPopupSigninOpen(true);
  }

  function handleSignupClick() {
    handleClosePopup();
    setIsPopupSignupOpen(true);
  }

  function handleSuccessClick() {
    handleClosePopup();
    setIsPopupSignupSuccess(true);
  }

  function handleClosePopup() {
    setIsPopupSigninOpen(false);
    setIsPopupSignupOpen(false);
    setIsPopupSignupSuccess(false);
  }

  async function handleLogin(email, password) {
    return await mainApi
      .signIn(email, password)
      .then((result) => {
        if (result.token) {
          return mainApi.getUserData(result.token).then((user) => {
            handleClosePopup();
            setCurrentUser(user);
            mainApi.getAllSavedArticle(result.token).then((articles) => {
              setSavedNews(articles);
            });
            return { success: true };
          });
        }
      })
      .catch((err) => {
        return err;
      });
  }

  async function handleRegister(email, password, username) {
    return await mainApi
      .signUp(email, password, username)
      .then((result) => {
        return result;
      })
      .catch((err) => {
        return err;
      });
  }

  function handleLogout() {
    setCurrentUser();
    localStorage.removeItem("token");
    navigate('/');
  }

  function handleSearchNews(query) {
    newsApi.searchNews(query).then((result) => {
      setsearchedKeyword(query);
      setFoundNewsData(result);
      setIsSearching(false);
      setFoundNews(true);
    });
  }

  async function handleSaveNews(article) {
    article.keyword = searchedKeyword;
    if (!article.image) {
      article.image =
        "https://t4.ftcdn.net/jpg/04/70/29/97/360_F_470299797_UD0eoVMMSUbHCcNJCdv2t8B2g1GVqYgs.jpg";
    }
    return await mainApi
      .saveArticle(localStorage.getItem("token"), article)
      .then((res) => {
        setSavedNews([...savedNews, res]);
        return res;
      });
  }

  async function handleDeleteCard(articleId) {
    return await mainApi
      .deleteSavedArticle(localStorage.getItem("token"), articleId)
      .then((res) => {
        setSavedNews(savedNews.filter((article) => article._id !== articleId));
      });
  }

  return (
    <div className="App">
      <CurrentUserContext.Provider value={currentUser}>
        <Routes>
          <Route
            path="/"
            element={
              <Main
                onSigninClick={handleSigninClick}
                handleLogout={handleLogout}
                handleSaveNews={handleSaveNews}
                handleSearchNews={handleSearchNews}
                isSearching={isSearching}
                setIsSearching={setIsSearching}
                setFoundNews={setFoundNews}
                foundNews={foundNews}
                foundNewsData={foundNewsData}
                onCardDelete={handleDeleteCard}
                savedNews={savedNews}
                isAnyPopupOpened={
                  isPopupSigninOpen || isPopupSignupOpen || isPopupSignupSuccess
                }
                onPopupClose={handleClosePopup}
              />
            }
          />
          <Route element={<ProtectedRoute />}>
            <Route
              path="/saved-news"
              element={
                <SavedNews
                  handleLogout={handleLogout}
                  onCardDelete={handleDeleteCard}
                  savedNews={savedNews}
                />
              }
            />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Footer />
        <PopupSignin
          isOpen={isPopupSigninOpen}
          onClose={handleClosePopup}
          onSignupOpen={handleSignupClick}
          handleLogin={handleLogin}
          isMobile={isMobile}
        />
        <PopupSignup
          isOpen={isPopupSignupOpen}
          onClose={handleClosePopup}
          onSigninOpen={handleSigninClick}
          openSuccessPopup={handleSuccessClick}
          handleRegister={handleRegister}
          isMobile={isMobile}
        />
        <PopupSignupSuccess
          isOpen={isPopupSignupSuccess}
          onClose={handleClosePopup}
          onSigninOpen={handleSigninClick}
          isMobile={isMobile}
        />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
