
// import { profileName, profileJob, profileAvatar } from "./modal.js"
// const config = {
//   baseUrl: 'https://nomoreparties.co/v1/plus-cohort-22',
//   headers: {
//     authorization: 'da373be5-de2f-43e0-943d-28642416cb3a',
//     'Content-Type': 'application/json'
//   }
// }
// // функция получения ответа сервера
// const getResponse = (res) => {
//   if (res.ok) {
//     return res.json();
//   }
//   // если ошибка, отклоняем промис
//   return Promise.reject(`Ошибка: ${res.statusText}`);
// }
// //загрузка карточек сервера
// export const getInitialCards = () => {
//   return fetch(`${config.baseUrl}/cards`, {
//     headers: config.headers
//   })
//     .then(getResponse)
//     .catch((err) => {
//       console.log(err); // выводим ошибку в консоль
//     });
// }
// //загрузка информации о пользователе с сервера
// export const getProfileInfo = () => {
//   return fetch(`${config.baseUrl} / users / me`, {
//     headers: config.headers
//   })
//     .then(getResponse)
//     .then((res) => {
//       console.log(res);

//       profileName.textContent = res.name;
//       profileJob.textContent = res.about;
//       profileAvatar.style.backgroundImage = `url(${res.avatar})`;
//     })
//     .catch((err) => {
//       console.log(err); // выводим ошибку в консоль
//     });
// }
// //функция сохраняет данные профиля на сервере
// export const setProfileInfo = ({ name, about }) => {
//   return fetch(`${config.baseUrl} / users / me`, {
//     method: 'PATCH',
//     headers: config.headers,
//     body: JSON.stringify({
//       name: `${name}`,
//       about: `${about}`
//     })
//   })
//     .then(getResponse)
//     .catch((err) => {
//       console.log(err); // выводим ошибку в консоль
//     });
// }




