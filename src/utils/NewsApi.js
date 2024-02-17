class NewsApi {
  constructor({ baseUrl, apiKey }) {
    this.baseUrl = baseUrl;
    this.apiKey = apiKey;
  }

  searchNews(query) {
    const dateFrom = new Date();
    dateFrom.setDate(dateFrom.getDate() - 7);
    const dateToday = new Date();

    const formatDateFrom = `${dateFrom.getFullYear()}-${dateFrom.getMonth() + 1}-${dateFrom.getDate()}`; 
    const formatDateToday = `${dateToday.getFullYear()}-${dateToday.getMonth() + 1}-${dateToday.getDate()}`;
    const queryParams = `?apiKey=${this.apiKey}&q=${query}&from=${formatDateFrom}&to=${formatDateToday}&pageSize=100`;
    return fetch(`${this.baseUrl}/everything${queryParams}`)
    .then((res) => {
      if (res.status === 200) {
        return res.json();
      }
    })
    .then((data) => {
      if (data.status === 'ok') {
        return data.articles;
      }
    })
  }
}

export const newsApi = new NewsApi({
  baseUrl: process.env.REACT_APP_NEWS_API_URL,
  apiKey: process.env.REACT_APP_NEWS_API_KEY
})

// newsApi.getNews();