////// 1. Работа модальных окон
////Открытие и закрытие модальных окон
// Нахожу кнопку редактировать в DOM
const profileEdit = document.querySelector('.profile__button_type_edit');
// Нахожу модальное окно "редактировать" в DOM
const popupEdit = document.querySelector('#popup-edit');
// Нахожу кнопку добавить новое место в DOM
const profileAdd = document.querySelector('.profile__button_type_add');
// Нахожу модальное окно "новое место" в DOM
const popupAdd = document.querySelector('#popup-add');
//нахожу модальное окно с всплывающей картинкой в DOM
const popupFigure = document.querySelector('#popup-figure');
//вешаем событие на кнопку редактировать(открытие popup)
profileEdit.addEventListener('click', function () {
  popupEdit.classList.add('popup_opened');
});
//вешаем событие на кнопку добавить новое место(открытие popup)
profileAdd.addEventListener('click', function () {
  popupAdd.classList.add('popup_opened');
});


////Закрытие модальных окон
// Нахожу кнопку закрытия для модального окна "редакторовать" в DOM
const popupEditClose = popupEdit.querySelector('.popup__close-icon');
// Нахожу кнопку закрытия для модального окна "новое место" в DOM
const popupAddClose = popupAdd.querySelector('.popup__close-icon');
// Нахожу кнопку закрытия для модального окна с всплывающей картинкой в DOM
const popupFigureClose = popupFigure.querySelector('.popup__close-icon');
//вешаем событие на крестик (модальное окно - редактировать)
popupEditClose.addEventListener('click', function () {
  popupEdit.classList.remove('popup_opened');
});
//вешаем событие на крестик (модальное окно - добавить)
popupAddClose.addEventListener('click', function () {
  popupAdd.classList.remove('popup_opened');
});
//вешаем событие на крестик (модальное окно с картинкой)
popupFigureClose.addEventListener('click', function () {
  popupFigure.classList.remove('popup_opened');
});

////Поля формы
////При открытии формы поля «Имя» и «О себе»  заполняются теми значениями, которые отображаются на странице.
// Находим поля в DOM
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const popupName = document.querySelector('.popup__input_type_name');
const popupJob = document.querySelector('.popup__input_type_job');
//присваиваем значениям формы «Имя» и «О себе» значения которые отображаются на странице
popupName.value = profileName.textContent;
popupJob.value = profileJob.textContent;


////Редактирование имени и информации о себе
// Нахожу поле формы "редактировать" в DOM
const formElementEdit = popupEdit.querySelector('.popup__form')
// Нахожу поле формы "новое место" в DOM
const formElementAdd = popupAdd.querySelector('.popup__form')
// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler(evt) {
  // Эта строчка отменяет стандартную отправку формы.
  evt.preventDefault();
  //отображаем на странице то что сохранилось в форме «Имя» и «О себе»
  profileName.textContent = popupName.value;
  profileJob.textContent = popupJob.value;
}
// Прикрепляем обработчик к форме "редактировать":
// он будет следить за событием “submit” - «отправка»
formElementEdit.addEventListener('submit', formSubmitHandler);


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
//Нахожу кнопку "создать карточку" в DOM
const popupAddButtonSave = popupAdd.querySelector('.popup__save');
//получаю содержимое тега template
const elementTemplate = document.querySelector('#element-template').content;
//Нахожу контейнер для карточек в DOM
const elements = document.querySelector('.elements');
//клонирую содержимое  тега template
const element = elementTemplate.querySelector('.element').cloneNode(true);
//вешаю событие на кнопку "создать карточку"
popupAddButtonSave.addEventListener('click', function () {
  //Нахожу элемент с названием картинки  в DOM
  const popupAddTitle = popupAdd.querySelector('.popup__input_type_title');
  //Нахожу элемент с ссылкой на картинку  в DOM
  const popupAddLink = popupAdd.querySelector('.popup__input_type_link');
  //вызываю функцию добавления карточек
  addElement(popupAddTitle.value, popupAddLink.value);
});
//добавляю в template шесть карточек из массива initialCards
for (let i = 0; i < initialCards.length; i++) {
  //наполняю template содержимым из массива initialCards
  element.querySelector('.element__description').textContent = initialCards[i].name;
  element.querySelector('.element__mask').style.backgroundImage = `url(${initialCards[i].link})`;
  //добавляю карточку  на страницу
  addElement(initialCards[i].name, initialCards[i].link)
}
// Прикрепляем обработчик к форме "новое место":
// он будет следить за событием “submit” - «отправка»
formElementAdd.addEventListener('submit', formSubmitHandler);
//функция добавления карточек
function addElement(titleValue, linkValue) {
  //клонирую содержимое тега template
  const element = elementTemplate.querySelector('.element').cloneNode(true);
  //добавляю название для карточки из поля "название" в popup
  element.querySelector('.element__description').textContent = String(titleValue);
  //добавляю ссылку для карточки из поля "Ссылка на картинку" в popup
  element.querySelector('.element__mask').style.backgroundImage = `url(${String(linkValue)})`;
  console.dir(element.querySelector('.element__mask').style);

  //вешаю событие на кнопку лайка
  element.querySelector('.element__icon').addEventListener('click', function (evt) {
    //добавляю класс element__icon_active если его нет и удаляю  если он есть
    evt.target.classList.toggle('element__icon_active');
  });
  //вешаю событие на картинку
  element.querySelector('.element__mask').addEventListener('click', function () {
    //нахожу нужный div в DOM для вставки картики
    const popupFigureMask = document.querySelector('.popup-figure__mask');
    //вставляю картинку в модальное окно
    popupFigureMask.style.backgroundImage = `url(${String(linkValue)})`;
    //нахожу тег figcaption в DOM для вставки описания к картинке
    const popupFigureCaption = document.querySelector('.popup-figure__caption');
    //вставляю описания к картинке в модальное окно
    popupFigureCaption.textContent = titleValue;
    //открываю модальное окно с картинкой
    popupFigure.classList.add('popup_opened');
  });
  //вешаю событие на корзину
  element.querySelector('.element__trash').addEventListener('click', function () {
    //удаляю карточку
    element.remove();
  });
  //добавляю содержимое тега template  в DOM
  elements.prepend(element);
}




