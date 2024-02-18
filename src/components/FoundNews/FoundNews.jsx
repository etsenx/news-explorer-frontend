import { useState } from "react";
import NewsCardList from "../NewsCardList/NewsCardList";
import NotFound from "../NotFound/NotFound";
import "./FoundNews.css";

function FoundNews(props) {
  const [showCardCounter, setShowCardCounter] = useState(3);
  function onClick() {
    const count = showCardCounter + 3;
    setShowCardCounter(count);
  }
  return props.foundNewsData.length !== 0 ? (
    <section className="found-news">
      <div className="found-news__container">
        <h2 className="found-news__heading">Hasil pencarian</h2>
        <NewsCardList
          foundNewsData={props.foundNewsData}
          showCardCounter={showCardCounter}
          handleSaveNews={props.handleSaveNews}
          onCardDelete={props.onCardDelete}
        />
        <div className="found-news__button-container">
          <button className="found-news__button" onClick={onClick}>
            Tampilkan lebih banyak
          </button>
        </div>
      </div>
    </section>
  ) : (
    <NotFound />
  );
}

export default FoundNews;
