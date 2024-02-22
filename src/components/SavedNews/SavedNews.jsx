import { useContext, useEffect } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useNavigate } from "react-router-dom";

import SavedNewsHeader from "../SavedNewsHeader/SavedNewsHeader";
import NewsCardList from "../NewsCardList/NewsCardList";

import "./SavedNews.css";

function SavedNews(props) {
  const currentUser = useContext(CurrentUserContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (!currentUser) {
      navigate("/")
    }
  }, [currentUser, navigate])
  return (
    currentUser ?
    <>
      <SavedNewsHeader
        handleLogout={props.handleLogout}
      />
      { currentUser.savedNews.length !== 0  ?
      <div className="saved-news">
        <NewsCardList
          foundNewsData={currentUser.savedNews}
          onCardDelete={props.onCardDelete}
          savedNewsPage={true}
        />
      </div>
      : ""}
    </> : ""
  );
}

export default SavedNews;
