import { openPopup } from "./utils.js"
import { getInitialCards } from "./api.js"
//нахожу секцию куда буду добавлять свои карточки
const cards = document.querySelector('.cards');
//нахожу div для вставки картинки в попап с всплывающей картинкой
const popupPictureImg = document.querySelector('.popup-picture__img');
//нахожу div для вставки описания к картинке в попапе с всплывающей картинкой
const popupPictureCaption = document.querySelector('.popup-picture__caption');
//нахожу модальное окно с всплывающей картинкой в DOM
const popupPicture = document.querySelector('#popup-picture');

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

//добавляю в template шесть карточек из сервера
// getInitialCards()
//   .then((res) => {
//     res.forEach((item) => addcard(item.name, item.link))
//   })

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
    //вставляю картинку в попап с всплывающей картинкой
    popupPictureImg.style.backgroundImage = `url(${String(linkValue)})`;
    //вставляю описание к картинке в попап с всплывающей картинкой
    popupPictureCaption.textContent = String(titleValue);
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

export { addcard }
