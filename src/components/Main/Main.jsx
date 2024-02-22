import "./Main.css";
import Header from "../Header/Header";
import About from "../About/About";
import FoundNews from "../FoundNews/FoundNews";
import Preloader from "../Preloader/Preloader";

function Main(props) {
  return (
    <>
      <Header
        handleSearchNews={props.handleSearchNews}
        setIsSearching={props.setIsSearching}
        setFoundNews={props.setFoundNews}
        onSigninClick={props.onSigninClick}
        handleLogout={props.handleLogout}
        isPopupSigninOpen={props.isPopupSigninOpen}
        isPopupSignupOpen={props.isPopupSignupOpen}
        isPopupSignupSuccess={props.isPopupSignupSuccess}
        handleClosePopup={props.handleClosePopup}
      />
      {props.foundNews ? (
        <FoundNews
          foundNewsData={props.foundNewsData}
          handleSaveNews={props.handleSaveNews}
          onCardDelete={props.onCardDelete}
        />
      ) : (
        ""
      )}
      {props.isSearching && <Preloader />}
      <About />
    </>
  );
}

export default Main;
