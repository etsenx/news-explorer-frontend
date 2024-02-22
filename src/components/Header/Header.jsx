import SearchForm from "../SearchForm/SearchForm";
import Navigation from "../Navigation/Navigation";
import "./Header.css";

function Header(props) {
  return (
    <>
      <Navigation
        onSigninClick={props.onSigninClick}
        handleLogout={props.handleLogout}
        isAnyPopupOpened={props.isAnyPopupOpened}
        onPopupClose={props.onPopupClose}
      />
      <header className="home-header">
        <div className="home-header__content">
          <h1 className="home-header__heading">Apa kabar terkini?</h1>
          <p className="home-header__description">
            Temukan berita terkini tentang berbagai topik dan simpan di akun
            pribadimu.
          </p>
          <SearchForm
            handleSearchNews={props.handleSearchNews}
            setIsSearching={props.setIsSearching}
            setFoundNews={props.setFoundNews}
          />
        </div>
      </header>
    </>
  );
}

export default Header;
