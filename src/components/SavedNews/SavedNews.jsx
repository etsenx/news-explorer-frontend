import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

import SavedNewsHeader from "../SavedNewsHeader/SavedNewsHeader";
import NewsCardList from "../NewsCardList/NewsCardList";

import "./SavedNews.css";

function SavedNews(props) {
  const currentUser = useContext(CurrentUserContext);

  return currentUser ? (
    <>
      <SavedNewsHeader handleLogout={props.handleLogout} savedNews={props.savedNews} />
      { props.savedNews.length !== 0  ?
      <div className="saved-news">
        <NewsCardList
          foundNewsData={props.savedNews}
          onCardDelete={props.onCardDelete}
          savedNewsPage={true}
        />
      </div>
      : ""}
    </>
  ) : (
    ""
  );
}

export default SavedNews;
