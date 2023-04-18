
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
//загрузка карточек с сервера
export let getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  })
    .then(getResponse)
    .then((res) => {
      return res;
    })
}
//загрузка информации о пользователе с сервера
export async function getProfileInfo() {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
  })
    .then(getResponse)
    .then((res) => { return res; })
}
//функция сохраняет данные профиля на сервере
export const setProfileInfo = (name, about) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: `${name}`,
      about: `${about}`
    })

  })
    .then(getResponse)
    .then((res) => { return res })
}

//Функция добаляет новую карточку на сервер
export function addNewCardServer(name, link) {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: `${name}`,
      link: `${link}`
    })
  })
    .then(getResponse)
    .then((res) => { return res; })
}

//функция удаляет карточку  с сервера
export function deleteCardServer(cardId) {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
  })
    .then(getResponse)
    .then((res) => { return res; })
}

//функция постановки лайка
export function setLike(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers,
  })
    .then(getResponse)
    .then((res) => { return res; })
}

//функция снятия лайка
export function deleteLike(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
  })
    .then(getResponse)
    .then((res) => { return res; })
}

//функция смены аватара
export const setAvatar = (url) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: `${url}`,
    })

  })
    .then(getResponse)
    .then((res) => { return res })
}




