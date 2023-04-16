import { openPopup } from "./utils.js"
import { getInitialCards, getProfileInfo, setLike, deleteLike } from "./api.js"
import { popupDelete } from "./modal.js"
//нахожу секцию куда буду добавлять свои карточки
const cards = document.querySelector('.cards');
//нахожу div для вставки картинки в попап с всплывающей картинкой
const popupPictureImg = document.querySelector('.popup-picture__img');
//нахожу div для вставки описания к картинке в попапе с всплывающей картинкой
const popupPictureCaption = document.querySelector('.popup-picture__caption');
//нахожу модальное окно с всплывающей картинкой в DOM
const popupPicture = document.querySelector('#popup-picture');


// //массив готовых карточек
// const initialCards = [
//   {
//     name: 'Архыз',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
//   },
//   {
//     name: 'Челябинская область',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
//   },
//   {
//     name: 'Иваново',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
//   },
//   {
//     name: 'Камчатка',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
//   },
//   {
//     name: 'Холмогорский район',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
//   },
//   {
//     name: 'Байкал',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
//   }
// ];

// //добавляю в template шесть карточек из массива initialCards
// initialCards.forEach((item) => addcard(item.name, item.link))

//получаю карточки c сервера
getInitialCards()
  .then((res) => {
    res.forEach((item) => addСard(item.name, item.link, item))
  })


//функция создания карточек
function createCard(titleValue, linkValue, data) {
  //получаю содержимое тега template
  const cardTemplate = document.querySelector('#card-template').content;
  //клонирую содержимое  тега template
  const card = cardTemplate.querySelector('.card').cloneNode(true);
  //нахожу картинку в модальном окне
  const cardPicture = card.querySelector('.card__img');
  //нахожу div с количеством лайков (card__likes-count)
  const cardLikesCount = card.querySelector('.card__likes-count');
  //нахожу кнопку корзины
  const cardTrash = card.querySelector('.card__trash')
  //показываю количество лайков
  cardLikesCount.textContent = data.likes.length
  //присваиваю название карточке
  card.querySelector('.card__description').textContent = String(titleValue);
  //вставляю картинку в  карточку
  cardPicture.style.backgroundImage = `url(${String(linkValue)})`;
  //вешаю событие на кнопку лайка
  card.querySelector('.card__icon').addEventListener('click', function (evt) {
    //проверяю есть класс card__icon_active в элементе
    if (evt.target.classList.contains('card__icon_active')) {
      //если есть то закраштваю сердечко
      evt.target.classList.remove('card__icon_active');
      //и прибавляю  лайк
      deleteLike(data._id).then((res) => {
        cardLikesCount.textContent = res.likes.length
      })
    } else {
      //если класса card__icon_active
      evt.target.classList.add('card__icon_active');
      setLike(data._id).then((res) => {
        cardLikesCount.textContent = res.likes.length
      })
    }

    // //добавляю класс card__icon_active если его нет и удаляю  если он есть
    // evt.target.classList.toggle('card__icon_active');
  });
  //вешаем событие на  картинку(открытие popup)
  cardPicture.addEventListener('click', function () {
    //вставляю картинку в попап с всплывающей картинкой
    popupPictureImg.style.backgroundImage = `url(${String(linkValue)})`;
    //вставляю описание к картинке в попап с всплывающей картинкой
    popupPictureCaption.textContent = String(titleValue);
    openPopup(popupPicture)
  });

  getProfileInfo().then((res) => {
    //если карточка моя
    if (res._id === data.owner._id) {
      // вешаю событие на корзину
      cardTrash.addEventListener('click', function () {
        openPopup(popupDelete)
        //запиcываю id карточки в id попапа формы удаления
        popupDelete.querySelector('.popup__form').id = data._id
        //если не моя удаляю карточку со страницы
        card.remove();
      });
    } else {
      //удаляю кнопку корзины
      cardTrash.remove('.card__trash')
    }
  })

  return card
}

//функция добавления карточек
function addСard(titleValue, linkValue, data) {
  //вызываю функцию создания карточек
  const element = createCard(titleValue, linkValue, data);
  //добавляю новую карточку в DOM
  cards.prepend(element);
}

export { addСard }

