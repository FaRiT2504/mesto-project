import { object, enableValidation, disableButton } from "./validate.js"
import { popupCard, popupProfile, popupName, profileName, popupJob, profileJob, profileAvatar } from "./modal.js"
import { openPopup, closePopup } from "./utils.js"
// import { getProfileInfo } from "./api.js"
import './../pages/index.css'
// Нахожу кнопку редактировать в DOM
const profileButton = document.querySelector('.profile__button_type_edit');
// Нахожу кнопку добавить новое место в DOM
const cardButton = document.querySelector('.profile__button_type_add');
//нахожу все попапы в DOM
const popups = document.querySelectorAll('.popup');

// //находим все крестики в проекте по универсальному селектору
// const closeButtons = document.querySelectorAll('.popup__close')

//вешаем событие на кнопку редактировать(открытие popup)
profileButton.addEventListener('click', () => {
  //присваиваем значениям формы «Имя» и «О себе» значения
  //которые отображаются на странице
  popupName.value = profileName.textContent;
  popupJob.value = profileJob.textContent;
  //вызываю функцию открытия попапа
  openPopup(popupProfile)
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

//функция валидации
enableValidation(object);

// //функция обновляет информацию о пользователе с сервера
// const updateProfileInfo = (object) => {
//   profileName.textContent = object.name;
//   profileJob.textContent = object.about;
//   profileAvatar.style.backgroundImage = `url(${object.avatar})`;
// };
// updateProfileInfo(getProfileInfo);












