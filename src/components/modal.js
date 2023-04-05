import { addcard } from "./card.js"
import { closePopup } from "./utils.js"
// находим формы в проекте
const profileForm = document.forms['profile-form'];
const cardForm = document.forms['card-form'];
// Нахожу модальное окно "новое место" в DOM
const popupCard = document.querySelector('#popup-add');
//Нахожу элемент с названием картинки  в DOM
const popupCardTitle = popupCard.querySelector('.popup__input_type_title');
//Нахожу элемент с ссылкой на картинку  в DOM
const popupCardLink = popupCard.querySelector('.popup__input_type_link');
// Нахожу поле с именем в попап
const popupName = document.querySelector('.popup__input_type_name');
// Нахожу поле "О себе" в попап
const popupJob = document.querySelector('.popup__input_type_job');
// Нахожу поле с именем на странице
const profileName = document.querySelector('.profile__name');
// Нахожу поле "О себе" на странице
const profileJob = document.querySelector('.profile__job');
// Нахожу модальное окно "редактировать" в DOM
const popupProfile = document.querySelector('#popup-edit');

//функция обработчик «отправки» формы для карточек
function handlerCardFormSubmit(evt) {
  // Эта строчка отменяет стандартную отправку формы.
  evt.preventDefault();
  //вызываю функцию добавления карточек
  addcard(popupCardTitle.value, popupCardLink.value);
  //ощищаю импуты
  cardForm.reset();
  //закрываю попап
  closePopup(popupCard);
}

//функция обработчик «отправки» формы для профиля
function handlerProfileFormSubmit(evt) {
  // Эта строчка отменяет стандартную отправку формы.
  evt.preventDefault();
  //отображаем на странице то что сохранилось в форме «Имя» и «О себе»
  profileName.textContent = popupName.value;
  profileJob.textContent = popupJob.value;
  //закрываем попап
  closePopup(popupProfile);
}

// Прикрепляю обработчик к формам:
profileForm.addEventListener('submit', handlerProfileFormSubmit);
cardForm.addEventListener('submit', handlerCardFormSubmit);

export { popupCard, popupProfile, popupName, profileName, popupJob, profileJob }

