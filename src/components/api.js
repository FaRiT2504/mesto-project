// const config = {
//   baseUrl: 'https://nomoreparties.co/v1/plus-cohort-22',
//   headers: {
//     authorization: 'da373be5-de2f-43e0-943d-28642416cb3a',
//     'Content-Type': 'application/json'
//   }
// }

// export const getInitialCards = () => {
//   return fetch(`${config.baseUrl}/cards`, {
//     headers: config.headers
//   })
//     .then(res => {
//       if (res.ok) {
//         return res.json();
//       }

//       // если ошибка, отклоняем промис
//       return Promise.reject(`Ошибка: ${res.status}`);
//     })
//     .catch((err) => {
//       console.log(err); // выводим ошибку в консоль
//     });
// }
