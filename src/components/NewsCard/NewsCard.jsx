import { useContext, useState } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

import saveIcon from "../../images/bookmark.svg";
import saveIconHover from "../../images/bookmark-hovered.svg";
import saveIconActive from "../../images/bookmark-filled.svg";
import trashIcon from "../../images/trash.svg";
import trashIconHover from "../../images/trash-hovered.svg";

import "./NewsCard.css";

function NewsCard(props) {
  const currentUser = useContext(CurrentUserContext);
  const [isSaved, setIsSaved] = useState(props.isSaved);
  const [isHovered, setIsHovered] = useState(false);
  const { source, title, description, publishedAt, url, urlToImage, keyword } =
    props.data;
  function onSaveButtonOver() {
    setIsHovered(true);
  }

  function onSaveButtonOut() {
    setIsHovered(false);
  }

  function handleSaveButtonClick() {
    if (currentUser) {
      if (!isSaved) {
        const article = {
          title: title,
          text: description,
          date: publishedAt,
          source: source,
          link: url,
          image: urlToImage,
        };
        props.handleSaveNews(article).then((res) => {
          if (res) {
            setIsSaved(true);
          }
        });
      } else {
        setIsSaved(false);
        handleDelete();
      }
    }
  }

  function handleDelete() {
    props.onCardDelete(props.id);
  }

  function formatDate(inputDate) {
    const date = new Date(inputDate);
    const month = date.toLocaleString("default", { month: "long" });
    const formattedDate =
      date.getDate() + " " + month + ", " + date.getFullYear();
    return formattedDate;
  }
  const publishedDate = formatDate(publishedAt);
  return (
    <div className="news-card__container">
      <img src={urlToImage} className="news-card__image" alt="card" />
      <div className="news-card__content">
        <p className="news-card__published-date">{publishedDate}</p>
        <h2 className="news-card__heading">{title}</h2>
        <p className="news-card__brief-description">{description}</p>
        <p className="news-card__source">{source}</p>
      </div>
      {props.savedNewsPage ? (
        <>
          <div className="news-card__keyword-container">
            <p className="news-card__keyword-content">{keyword}</p>
          </div>
          <div className="news-card__save-container">
            <div
              className={`news-card__save-signin ${isHovered ? "slideIn" : ""}`}
            >
              <p className="news-card__save-signin-span">
                Hapus dari daftar tersimpan
              </p>
            </div>
            <button
              className="news-card__save-button"
              onMouseOver={onSaveButtonOver}
              onMouseOut={onSaveButtonOut}
              onClick={handleDelete}
            >
              <img
                src={isHovered ? trashIconHover : trashIcon}
                className="news-card__save-button-icon"
                alt="Delete Button"
              />
            </button>
          </div>
        </>
      ) : (
        <div className="news-card__save-container">
          {currentUser ? (
            ""
          ) : (
            <div
              className={`news-card__save-signin ${isHovered ? "slideIn" : ""}`}
            >
              <p className="news-card__save-signin-span">
                Sign in to save articles
              </p>
            </div>
          )}
          <button
            className="news-card__save-button"
            onMouseOver={onSaveButtonOver}
            onMouseOut={onSaveButtonOut}
            onClick={handleSaveButtonClick}
          >
            <img
              src={
                currentUser && isSaved
                  ? saveIconActive
                  : isHovered
                  ? saveIconHover
                  : saveIcon
              }
              className="news-card__save-button-icon"
              alt="Save Button"
            />
          </button>
        </div>
      )}
    </div>
  );
}

export default NewsCard;
