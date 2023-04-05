import { object, enableValidation } from "./validate.js"
import { popupCard, popupProfile, popupName, profileName, popupJob, profileJob } from "./modal.js"
import { openPopup, closePopup } from "./utils.js"
import './../pages/index.css'
// Нахожу кнопку редактировать в DOM
const profileButton = document.querySelector('.profile__button_type_edit');
// Нахожу кнопку добавить новое место в DOM
const cardButton = document.querySelector('.profile__button_type_add');
//нахожу все попапы в DOM
const popups = document.querySelectorAll('.popup');
//находим все крестики в проекте по универсальному селектору
const closeButtons = document.querySelectorAll('.popup__close')

//вешаем событие на кнопку редактировать(открытие popup)
profileButton.addEventListener('click', () => {
  //присваиваем значениям формы «Имя» и «О себе» значения
  //которые отображаются на странице
  popupName.value = profileName.textContent;
  popupJob.value = profileJob.textContent;
  //вызываю функцию открытия попапа
  openPopup(popupProfile)
});

//перебираю все попапы и вешаю события на оверлей и на esc
popups.forEach((popup) => {
  //вешаю событие при клике на оверлей
  popup.addEventListener('click', (evt) => closePopup(evt.target))
  ////вешаю событие при клике на Escape
  popup.addEventListener('keydown', function (evt) {
    if (evt.key === 'Escape') {
      closePopup(evt.target)
    }
  })
})

//перебираем closeButtons, находим крестик и вешаем событие
closeButtons.forEach((button) => {
  //находим 1 раз ближайший к крестику попап
  const popup = button.closest('.popup')
  //устанавливаем отбработчик закрытия на крестик
  button.addEventListener('click', () => closePopup(popup))
});

//вешаем событие на кнопку добавить новое место(открытие popup)
cardButton.addEventListener('click', () => openPopup(popupCard));
//функция валидации
enableValidation(object);










