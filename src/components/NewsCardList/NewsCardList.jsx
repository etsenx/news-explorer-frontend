import NewsCard from "../NewsCard/NewsCard";

import "./NewsCardList.css";

function NewsCardList(props) {
  return (
    <div className="news-cards">
      {props.foundNewsData.map((data, index) => {
        let id = "";
        let isSaved = false;
        if (!props.savedNewsPage) {
            const savedData = props.savedNews.find(
              (savedData) =>
                savedData.title === data.title && savedData.text === data.description
            );
            if (savedData) {
              id = savedData._id;
              isSaved = true;
            } else {
              id = index;
            }
        } else {
          id = data._id;
        }
        return index < props.showCardCounter || props.savedNewsPage ? (
          <NewsCard
            key={id}
            id={id}
            data={
              props.savedNewsPage
                ? {
                    source: data.source,
                    title: data.title,
                    description: data.text,
                    publishedAt: data.date,
                    url: data.link,
                    urlToImage: data.image,
                    keyword: data.keyword,
                  }
                : {
                    ...data,
                    source: data.source.name,
                  }
            }
            index={index}
            savedNewsPage={props.savedNewsPage || false}
            isSaved={isSaved}
            onCardDelete={props.onCardDelete}
            handleSaveNews={props.handleSaveNews}
          />
        ) : (
          ""
        );
      })}
    </div>
  );
}

export default NewsCardList;
