import { useContext, useEffect, useState } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

import Navigation from "../Navigation/Navigation";

import "./SavedNewsHeader.css";

function SavedNewsHeader(props) {
  const currentUser = useContext(CurrentUserContext);
  const [keywordText, setKeywordText] = useState();
  const [totalCard, setTotalCard] = useState();
  const [savedKeywords, setSavedKeywords] = useState();
  useEffect(() => {
    if (props.savedNews.length !== 0) {
      const keywordCounts = {};
      props.savedNews.forEach((item) => {
        keywordCounts[item.keyword] = (keywordCounts[item.keyword] || 0) + 1;
      });
      // If prev - next is negative, that means next is first (false)
      const sortedKeywords = Object.keys(keywordCounts).sort(
        (next, prev) => keywordCounts[prev] - keywordCounts[next]
      );
      setSavedKeywords(sortedKeywords);
      setTotalCard(props.savedNews.length);
    } else {
      setSavedKeywords();
      setTotalCard();
    }
  }, [props.savedNews]);

  useEffect(() => {
    function updateKeywordText() {
      if (savedKeywords) {
        if (savedKeywords.length === 1) {
          setKeywordText(`${savedKeywords[0]}`);
        } else if (savedKeywords.length === 2) {
          setKeywordText(`${savedKeywords[0]} dan ${savedKeywords[1]}`);
        } else {
          setKeywordText(
            `${savedKeywords[0]}, ${savedKeywords[1]}, dan ${
              savedKeywords.length - 2
            } lainnya`
          );
        }
      }
    }

    updateKeywordText();
  }, [savedKeywords]);
  return (
    <>
      <Navigation isDark={true} handleLogout={props.handleLogout} />
      <section className="saved-header">
        <div className="saved-header__content">
          <p className="saved-header__page">Artikel tersimpan</p>
          <h1 className="saved-header__title">
            {currentUser.username}, kamu {totalCard > 0 ? "" : "tidak"} memiliki{" "}
            {totalCard > 0 ? totalCard : ""} artikel tersimpan
          </h1>
          {savedKeywords && savedKeywords.length > 0 ? (
            <p className="saved-header__keyword">
              Berdasarkan kata kunci:{" "}
              <span className="saved-header__keyword-span">{keywordText}</span>
            </p>
          ) : (
            ""
          )}
        </div>
      </section>
    </>
  );
}

export default SavedNewsHeader;
