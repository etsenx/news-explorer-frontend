import NewsCard from "../NewsCard/NewsCard";

import "./NewsCardList.css";

function NewsCardList(props) {
  return (
    <div className="news-cards">
      {props.foundNewsData.map((data, index) =>
        index < props.showCardCounter || props.savedNewsPage ? (
          <NewsCard
            key={index}
            data={data}
            index={index}
            savedNewsPage={props.savedNewsPage || false}
            onCardDelete={props.onCardDelete}
            handleSaveNews={props.handleSaveNews}
          />
        ) : (
          ""
        )
      )}
    </div>
  );
}

export default NewsCardList;
