import Header from "../Header/Header";
import About from "../About/About";
import FoundNews from "../FoundNews/FoundNews";
import Preloader from "../Preloader/Preloader";

import "./Main.css";

function Main(props) {
  return (
    <>
      <Header
        handleSearchNews={props.handleSearchNews}
        setIsSearching={props.setIsSearching}
        setFoundNews={props.setFoundNews}
        onSigninClick={props.onSigninClick}
        handleLogout={props.handleLogout}
        isAnyPopupOpened={props.isAnyPopupOpened}
        onPopupClose={props.onPopupClose}
      />
      {props.foundNews ? (
        <FoundNews
          foundNewsData={props.foundNewsData}
          handleSaveNews={props.handleSaveNews}
          onCardDelete={props.onCardDelete}
          savedNews={props.savedNews}
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
