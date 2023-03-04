////// 1. Работа модальных окон
// ////Открытие и закрытие модальных окон
// Нахожу кнопку редактировать в DOM
const profileButton = document.querySelector('.profile__button_type_edit');
// Нахожу модальное окно "редактировать" в DOM
const popupProfile = document.querySelector('#popup-edit');
// Нахожу кнопку добавить новое место в DOM
const cardButton = document.querySelector('.profile__button_type_add');
// Нахожу модальное окно "новое место" в DOM
const popupCard = document.querySelector('#popup-add');
//нахожу модальное окно с всплывающей картинкой в DOM
const popupPicture = document.querySelector('#popup-picture');
//Нахожу элемент с названием картинки  в DOM
const popupCardTitle = popupCard.querySelector('.popup__input_type_title');
//Нахожу элемент с ссылкой на картинку  в DOM
const popupCardLink = popupCard.querySelector('.popup__input_type_link');
// находим формы в проекте
const profileForm = document.forms['profile-form'];
const cardForm = document.forms['card-form'];
// // Нахожу кнопку закрытия для модального окна "редакторовать" в DOM
// const profileCloseButton = popupProfile.querySelector('.popup__close');
// // Нахожу кнопку закрытия для модального окна "новое место" в DOM
// const cardCloseButton = popupCard.querySelector('.popup__close');
// // Нахожу кнопку закрытия для модального окна с всплывающей картинкой в DOM
// const pictureCloseButton = popupPicture.querySelector('.popup__close');

////Поля формы
////При открытии формы поля «Имя» и «О себе»  заполняются теми значениями, которые отображаются на странице.
// Находим поля в DOM
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const popupName = document.querySelector('.popup__input_type_name');
const popupJob = document.querySelector('.popup__input_type_job');

// //Нахожу кнопку "создать карточку" в DOM
// const popupCardButtonSave = popupCard.querySelector('.popup__save');

// //получаю содержимое тега template
// const elementTemplate = document.querySelector('#element-template').content;
//Нахожу контейнер для карточек в DOM
const elements = document.querySelector('.elements');
// //клонирую содержимое  тега template
// const element = elementTemplate.querySelector('.element').cloneNode(true);
// //нахожу картинку в модальном окне
// const cardPicture = element.querySelector('.element__img');



///Открытие модальных окон
//функция открытия попапа
function openPopup(popup) {
  //присваиваем значениям формы «Имя» и «О себе» значения
  //которые отображаются на странице
  popupName.value = profileName.textContent;
  popupJob.value = profileJob.textContent;
  //открываю попап
  popup.classList.add('popup_opened');
};
//вешаем событие на кнопку редактировать(открытие popup)
profileButton.addEventListener('click', () => openPopup(popupProfile));
//вешаем событие на кнопку добавить новое место(открытие popup)
cardButton.addEventListener('click', () => openPopup(popupCard));
// //вешаем событие на кнопку картинку(открытие popup)
// cardPicture.addEventListener('click', () => openPopup(popupPicture));


////Закрытие модальных окон
//функция закрытия попапа
function closePopup(popup) {
  popup.classList.remove('popup_opened');
}
//находим все крестики в проекте по универсальному селектору
const closeButton = document.querySelectorAll('.popup__close')
//перебираем closeButton, находим крестик и вешаем событие
closeButton.forEach((button) => {
  //находим 1 раз ближайший к крестику попап
  const popup = button.closest('.popup')
  //устанавливаем отбработчик закрытия на крестик
  button.addEventListener('click', () => closePopup(popup))
});
// //вешаем событие на крестик (модальное окно - редактировать)
// profileCloseButton.addEventListener('click', () => closePopup(popupProfile));
// //вешаем событие на крестик (модальное окно - добавить)
// cardCloseButton.addEventListener('click', () => closePopup(popupCard));
// //вешаем событие на крестик (модальное окно с картинкой)
// pictureCloseButton.addEventListener('click', () => closePopup(popupPicture));

////Редактирование имени и информации о себе

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
//функция обработчик «отправки» формы для карточек
function handlerCardFormSubmit(evt) {
  // Эта строчка отменяет стандартную отправку формы.
  evt.preventDefault();
  //вызываю функцию добавления карточек
  addElement(popupCardTitle.value, popupCardLink.value);
  //ощищаю импуты
  cardForm.reset();
  //закрываю попап
  closePopup(popupCard);
}


// Прикрепляем обработчик к формам:
profileForm.addEventListener('submit', handlerProfileFormSubmit);
cardForm.addEventListener('submit', handlerCardFormSubmit);

//// 2. Добавляю шесть карточек используя template
//готовый массив карточек
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

// //вешаю событие на кнопку "создать карточку"
// popupCardButtonSave.addEventListener('click', function () {

//   //вызываю функцию добавления карточек
//   addElement(popupCardTitle.value, popupCardLink.value);
// });

//добавляю в template шесть карточек из массива initialCards
// for (let i = 0; i < initialCards.length; i++) {
//   // //наполняю template содержимым из массива initialCards
//   // element.querySelector('.element__description').textContent = initialCards[i].name;
//   // cardPicture.style.backgroundImage = `url(${initialCards[i].link})`;
//   //добавляю карточку  на страницу
//   addElement(initialCards[i].name, initialCards[i].link)
// }


//добавляю в template шесть карточек из массива initialCards
initialCards.forEach((item) => addElement(item.name, item.link))

//функция создания карточек
function createCard(titleValue, linkValue) {
  //получаю содержимое тега template
  const elementTemplate = document.querySelector('#element-template').content;
  // //Нахожу контейнер для карточек в DOM
  // const elements = document.querySelector('.elements');
  //клонирую содержимое  тега template
  const element = elementTemplate.querySelector('.element').cloneNode(true);
  //нахожу картинку в модальном окне
  const cardPicture = element.querySelector('.element__img');
  //добавляю название для карточки из поля "название" в popup
  element.querySelector('.element__description').textContent = String(titleValue);
  //добавляю ссылку для карточки из поля "Ссылка на картинку" в popup
  cardPicture.style.backgroundImage = `url(${String(linkValue)})`;
  //вешаю событие на кнопку лайка
  element.querySelector('.element__icon').addEventListener('click', function (evt) {
    //добавляю класс element__icon_active если его нет и удаляю  если он есть
    evt.target.classList.toggle('element__icon_active');
  });
  //вешаем событие на  картинку(открытие popup)
  cardPicture.addEventListener('click', () => openPopup(popupPicture));
  // вешаю событие на корзину
  element.querySelector('.element__trash').addEventListener('click', function () {
    //удаляю карточку
    element.remove();
  });
  return element
}

//функция добавления карточек
function addElement(titleValue, linkValue) {
  const card = createCard(titleValue, linkValue);
  //добавляю содержимое тега template  в DOM
  elements.prepend(card);
}




