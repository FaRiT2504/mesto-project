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
// Нахожу поле с именем на странице
const profileName = document.querySelector('.profile__name');
// Нахожу поле "О себе" на странице
const profileJob = document.querySelector('.profile__job');
// Нахожу поле с именем в попап
const popupName = document.querySelector('.popup__input_type_name');
// Нахожу поле "О себе" в попап
const popupJob = document.querySelector('.popup__input_type_job');
//нахожу секцию куда буду добавлять свои карточки
const cards = document.querySelector('.cards');
//находим все крестики в проекте по универсальному селектору
const closeButton = document.querySelectorAll('.popup__close')
//массив готовых карточек
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

//функция закрытия попапа
function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

//перебираем closeButton, находим крестик и вешаем событие
closeButton.forEach((button) => {
  //находим 1 раз ближайший к крестику попап
  const popup = button.closest('.popup')
  //устанавливаем отбработчик закрытия на крестик
  button.addEventListener('click', () => closePopup(popup))
});

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
  addcard(popupCardTitle.value, popupCardLink.value);
  //ощищаю импуты
  cardForm.reset();
  //закрываю попап
  closePopup(popupCard);
}

// Прикрепляю обработчик к формам:
profileForm.addEventListener('submit', handlerProfileFormSubmit);
cardForm.addEventListener('submit', handlerCardFormSubmit);

//добавляю в template шесть карточек из массива initialCards
initialCards.forEach((item) => addcard(item.name, item.link))

//функция создания карточек
function createCard(titleValue, linkValue) {
  //получаю содержимое тега template
  const cardTemplate = document.querySelector('#card-template').content;;
  //клонирую содержимое  тега template
  const card = cardTemplate.querySelector('.card').cloneNode(true);
  //нахожу картинку в модальном окне
  const cardPicture = card.querySelector('.card__img');
  //присваиваю название карточке
  card.querySelector('.card__description').textContent = String(titleValue);
  //вставляю картинку в  карточку
  cardPicture.style.backgroundImage = `url(${String(linkValue)})`;
  //вешаю событие на кнопку лайка
  card.querySelector('.card__icon').addEventListener('click', function (evt) {
    //добавляю класс card__icon_active если его нет и удаляю  если он есть
    evt.target.classList.toggle('card__icon_active');
  });
  //вешаем событие на  картинку(открытие popup)
  cardPicture.addEventListener('click', function () {
    //нахожу div для вставки картинки модального окна с всплывающей картинкой
    document.querySelector('.popup-picture__img').style.backgroundImage = `url(${String(linkValue)})`;
    //вставляю описание к картинке в модальноое окно с всплывающей картинкой
    document.querySelector('.popup-picture__caption').textContent = String(titleValue);
    openPopup(popupPicture)
  });
  // вешаю событие на корзину
  card.querySelector('.card__trash').addEventListener('click', function () {
    //удаляю карточку
    card.remove();
  });
  //возвращаю готовую карточку
  return card
}

//функция добавления карточек
function addcard(titleValue, linkValue) {
  //вызываю функцию создания карточек
  const element = createCard(titleValue, linkValue);
  //добавляю новую карточку в DOM
  cards.prepend(element);
}




