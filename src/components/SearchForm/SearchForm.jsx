import { useEffect, useState } from "react";
import "./SearchForm.css";

function SearchForm(props) {
  const [searchInput, setSearchInput] = useState("");
  const [isInputEmpty, setIsInputEmpty] = useState(true);

  useEffect(() => {
    if (searchInput === "") {
      setIsInputEmpty(true);
    } else {
      setIsInputEmpty(false);
    }
  }, [searchInput]);

  function handleSearch(e) {
    e.preventDefault();
    props.setIsSearching(true);
    props.setFoundNews(false);
    props.handleSearchNews(searchInput);
  }

  function handleInputChange(e) {
    e.preventDefault();
    setSearchInput(e.target.value);
  }

  return (
    <div className="search__container">
      <form>
        <input
          type="text"
          className="search__input"
          placeholder="Masukkan topik"
          value={searchInput}
          onChange={handleInputChange}
        />
        <button
          type="submit"
          disabled={isInputEmpty}
          className="search__submit"
          onClick={handleSearch}
        >
          Cari
        </button>
      </form>
    </div>
  );
}

export default SearchForm;
