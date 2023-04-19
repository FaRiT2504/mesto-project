import { object, enableValidation, disableButton } from "./validate.js"
import { popupCard, popupProfile, popupName, profileName, popupJob, profileJob, updateProfileInfo, popupAvatar, popupButtonCard, popupButtonProfile, popupButtonAvatar, profileForm, cardForm, cardDeleteForm, avatarForm, handlerCardFormAvatar, handlerProfileFormSubmit, handlerCardFormSubmit } from "./modal.js"
import { openPopup, closePopup } from "./utils.js"
import { getProfileInfo, getInitialCards } from "./api.js"
import { popupButtonDelete } from "./card.js"
import './../pages/index.css'
// Нахожу кнопку редактировать в DOM
const profileButton = document.querySelector('.profile__button_type_edit');
// Нахожу кнопку добавить новое место в DOM
const cardButton = document.querySelector('.profile__button_type_add');
//нахожу все попапы в DOM
const popups = document.querySelectorAll('.popup');
//нахожу аватар на в DOM
const avatar = document.querySelector('.profile__avatar');

// //находим все крестики в проекте по универсальному селектору
// const closeButtons = document.querySelectorAll('.popup__close')

//Присваиваю кнопкам значение
popupButtonCard.textContent = "Создать"
popupButtonProfile.textContent = "Сохранение"
popupButtonAvatar.textContent = "Сохранение"
popupButtonDelete.textContent = "Да"

// Прикрепляю обработчик к формам:
profileForm.addEventListener('submit', handlerProfileFormSubmit);
cardForm.addEventListener('submit', handlerCardFormSubmit);
// cardDeleteForm.addEventListener('submit', handlerCardFormDelete);
avatarForm.addEventListener('submit', handlerCardFormAvatar);

//вешаем событие на кнопку редактировать(открытие popup)
profileButton.addEventListener('click', () => {
  //присваиваем значениям формы «Имя» и «О себе» значения
  //которые отображаются на странице
  popupName.value = profileName.textContent;
  popupJob.value = profileJob.textContent;
  //вызываю функцию открытия попапа
  openPopup(popupProfile)
});

//обновляю информацию о пользователе с сервера  и получаю id
export let userId = getProfileInfo().then(function (res) {
  updateProfileInfo(res)
  return userId = res._id;
})
  .catch((err) => {
    console.log(err); // выводим ошибку в консоль
  });

//вешаю событие на крестик и на оверлей
popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup_opened')) {
      closePopup(popup)
    }
    if (evt.target.classList.contains('popup__close')) {
      closePopup(popup)
    }
  })
})

//вешаем событие на кнопку добавить новое место(открытие popup)
cardButton.addEventListener('click', () => openPopup(popupCard));

//вешаем событие на картинку аватара
avatar.addEventListener('click', () => openPopup(popupAvatar));

//функция валидации
enableValidation(object);




// (async function main() {
//   let temp = await getProfileInfo().then(function (res) {
//     updateProfileInfo(res)
//     return res._id
//   });
//   console.log(temp);
// })()





























