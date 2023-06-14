export default class Api {
  constructor(options) {
    // тело конструктора
    this.baseUrl = options.baseUrl;
    this.headers = options.headers;
  }

  // метод получения ответа сервера
  getResponse(res) {
    if (res.ok) {
      return res.json();
    }
    // если ошибка, отклоняем промис
    return Promise.reject(`Ошибка: ${res.statusText}`);
  }

  //метод  запроса с проверкой ответа от сервера
  request(url, options) {
    return fetch(url, options).then(this.getResponse).catch(err => console.log(err))
  }

  //загрузка карточек с сервера
  getInitialCards = () => {
    return this.request(`${this.baseUrl}/cards`, {
      headers: this.headers
    })
  }

  //загрузка информации о пользователе с сервера
  getProfileInfo = () => {
    return this.request(`${this.baseUrl}/users/me`, {
      headers: this.headers
    })
  }

  //метод  сохраняет данные профиля на сервере
  setProfileInfo = (name, about) => {
    return this.request(`${this.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        name: `${name}`,
        about: `${about}`
      })
    })
  }

  //метод  добаляет новую карточку на сервер
  addNewCardServer = (name, link) => {
    return this.request(`${this.baseUrl}/cards`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        name: `${name}`,
        link: `${link}`
      })
    })
  }

  //метод  удаляет карточку  с сервера
  deleteCardServer = (cardId) => {
    return this.request(`${this.baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this.headers,
    })
  }

  //метод  постановки лайка
  setLike = (cardId) => {
    return this.request(`${this.baseUrl}/cards/likes/${cardId}`, {
      method: 'PUT',
      headers: this.headers,
    })
  }

  //метод  снятия лайка
  deleteLike = (cardId) => {
    return this.request(`${this.baseUrl}/cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: this.headers,
    })
  }

  //метод  смены аватара
  setAvatar = (url) => {
    return this.request(`${this.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        avatar: `${url}`,
      })
    })
  }
}
