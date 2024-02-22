class MainApi {
  constructor({ baseUrl }) {
    this.baseUrl = baseUrl;
  }

  signUp(email, password, name) {
    return fetch(`${this.baseUrl}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
        name,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(res);
      })
      .then(() => {
        return Promise.resolve({ success: true });
      })
      .catch((err) => {
        if (err.status === 409) {
          return Promise.reject({
            success: false,
            error: 'Email tidak tersedia',
          });
        }
        return Promise.reject(err);
      });
  }

  signIn(email, password) {
    return fetch(`${this.baseUrl}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })
      .then((res) => {
        return res.json();
      })
      .then((result) => {
        if (result.token) {
          localStorage.setItem('token', result.token);
          return Promise.resolve(result);
        }
        return Promise.reject(result);
      })
      .catch((err) => {
        return Promise.reject({ success: false, error: err.message });
      });
  }

  getUserData(token) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(res);
      })
      .then((result) => {
        result.username = result.name;
        delete result.name;
        return Promise.resolve(result);
      });
  }

  getAllSavedArticle(token) {
    return fetch(`${this.baseUrl}/articles`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(res);
      })
      .then((result) => {
        return Promise.resolve(result);
      })
      .catch((err) => {
        return Promise.reject(err);
      });
  }

  saveArticle(token, article) {
    return fetch(`${this.baseUrl}/articles`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(article),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(res);
      })
      .then((result) => {
        return result;
      })
      .catch((err) => {
        return Promise.reject(err);
      });
  }

  deleteSavedArticle(token, articleId) {
    return fetch(`${this.baseUrl}/articles/${articleId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      return res.json();
    });
  }
}

export const mainApi = new MainApi({
  baseUrl: process.env.REACT_APP_MAIN_API_URL,
});
