import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

import Main from "../Main/Main";
import SavedNews from "../SavedNews/SavedNews";
import Footer from "../Footer/Footer";
import PopupSignin from "../PopupSignin/PopupSignin";
import PopupSignup from "../PopupSignup/PopupSignup";
import PopupSignupSuccess from "../PopupSignupSuccess/PopupSignupSuccess";

import { newsApi } from "../../utils/NewsApi";

import "./App.css";

function App() {
  const [registeredUser, setRegisteredUser] = useState([]);
  const [currentUser, setCurrentUser] = useState(registeredUser[0]);
  const [searchedKeyword, setsearchedKeyword] = useState();
  const [isSearching, setIsSearching] = useState(false);
  const [foundNews, setFoundNews] = useState(false);
  const [foundNewsData, setFoundNewsData] = useState([]);
  const [isPopupSigninOpen, setIsPopupSigninOpen] = useState(false);
  const [isPopupSignupOpen, setIsPopupSignupOpen] = useState(false);
  const [isPopupSignupSuccess, setIsPopupSignupSuccess] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

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

  function handleLogin(email, password) {
    const foundUser = registeredUser.find((user) => user.email === email);
    if (foundUser) {
      if (foundUser.password === password) {
        handleClosePopup();
        setCurrentUser(foundUser);
        return { success: true };
      }
      return { success: false, error: "Incorrect password" };
    } else {
      return { success: false, error: "Email not found" };
    }
  }

  function handleRegister(email, password, username) {
    const userExist = registeredUser.find((user) => user.email === email);
    if (userExist) {
      return { success: false, error: "Email tidak tersedia" };
    }

    let latestId = 0;
    if (registeredUser.length === 0) {
      latestId = 0;
    } else {
      latestId = registeredUser[registeredUser.length - 1].id + 1;
    }

    setRegisteredUser((prevData) => [
      ...prevData,
      {
        id: latestId,
        email: email,
        password: password,
        username: username,
        savedNews: [],
      },
    ]);
    return { success: true };
  }

  function handleLogout() {
    setCurrentUser();
  }

  function handleSearchNews(query) {
    newsApi.searchNews(query).then((result) => {
      setsearchedKeyword(query);
      setFoundNewsData(result);
      setIsSearching(false);
      setFoundNews(true);
    });
  }

  function handleSaveNews(news) {
    const userIndex = registeredUser.findIndex(
      (user) => user.id === currentUser.id
    );
    news.keyword = searchedKeyword;
    registeredUser[userIndex].savedNews.push(news);
    const newSaveCard = registeredUser[userIndex].savedNews;
    setCurrentUser((prevData) => ({
      ...prevData,
      savedNews: newSaveCard,
    }));
  }

  function handleDeleteCard(title, author) {
    const userIndex = registeredUser.findIndex(
      (user) => user.id === currentUser.id
    );
    const updatedNews = registeredUser[userIndex].savedNews.filter((news) => {
      return !(news.title === title && news.author === author);
    });
    registeredUser[userIndex].savedNews = updatedNews;
    setCurrentUser((prevData) => ({
      ...prevData,
      savedNews: updatedNews,
    }));
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
                isPopupSigninOpen={isPopupSigninOpen}
                isPopupSignupOpen={isPopupSignupOpen}
                isPopupSignupSuccess={isPopupSignupSuccess}
                handleClosePopup={handleClosePopup}
              />
            }
          />
          <Route
            path="/saved-news"
            element={
              <SavedNews
                handleLogout={handleLogout}
                onCardDelete={handleDeleteCard}
              />
            }
          />
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
