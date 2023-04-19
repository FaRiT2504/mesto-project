
import { profileName, profileJob, profileAvatar } from "./modal.js"
const config = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-22',
  headers: {
    authorization: 'da373be5-de2f-43e0-943d-28642416cb3a',
    'Content-Type': 'application/json'
  }
}
// функция получения ответа сервера
const getResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  // если ошибка, отклоняем промис
  return Promise.reject(`Ошибка: ${res.statusText}`);
}

//универсальная функция запроса с проверкой ответа от сервера
export function request(url, options) {
  return fetch(url, options).then(getResponse)
}

//загрузка карточек с сервер
export const getInitialCards = () => {
  return request(`${config.baseUrl}/cards`, {
    headers: config.headers
  })
}

//загрузка информации о пользователе с сервера
export async function getProfileInfo() {
  return request(`${config.baseUrl}/users/me`, {
    headers: config.headers
  })
}

//функция сохраняет данные профиля на сервере
export const setProfileInfo = (name, about) => {
  return request(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: `${name}`,
      about: `${about}`
    })
  })
}

//Функция добаляет новую карточку на сервер
export function addNewCardServer(name, link) {
  return request(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: `${name}`,
      link: `${link}`
    })
  })
}

//функция удаляет карточку  с сервера
export function deleteCardServer(cardId) {
  return request(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
  })
}

//функция постановки лайка
export function setLike(cardId) {
  return request(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers,
  })
}

//функция снятия лайка
export function deleteLike(cardId) {
  return request(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
  })
}

//функция смены аватара
export const setAvatar = (url) => {
  return request(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: `${url}`,
    })
  })
}




