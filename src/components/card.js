import { openPopup, closePopup } from "./utils.js"
import { getInitialCards, getProfileInfo, setLike, deleteLike, deleteCardServer } from "./api.js"
import { userId } from "./index.js"
import { object, activeButton } from "./validate.js"
import { cardDeleteForm, popupDelete, handleSubmit } from "./modal.js"
//нахожу секцию куда буду добавлять свои карточки
const cards = document.querySelector('.cards');
//нахожу div для вставки картинки в попап с всплывающей картинкой
const popupPictureImg = document.querySelector('.popup-picture__img');
//нахожу div для вставки описания к картинке в попапе с всплывающей картинкой
const popupPictureCaption = document.querySelector('.popup-picture__caption');
//нахожу модальное окно с всплывающей картинкой в DOM
const popupPicture = document.querySelector('#popup-picture');
//нахожу кнопку удаления карточки .popup__button_delete
export const popupButtonDelete = document.querySelector('.popup__button_delete');
//при открытии попапа записываю сюда карточку которую хочу удалить и её id
export let cardDelete = null

//класс создания карточек
export default class Card {
  constructor(data, titleValue, linkValue, setLike, deleteLike, activeButton, selector) {
    this.titleValue = titleValue;
    this.linkValue = linkValue;
    this._selector = selector;
    this.likes = data.likes;
    this._id = data._id;
    this.owner._id = data.owner._id;
    this.setLike = setLike;
    this.deleteLike = deleteLike;
    this.activeButton = activeButton;
  }

  //метод возвращает шаблон карточки
  _getElement() {
    const card = document
      .querySelector(this._selector)
      .content
      .querySelector('.card')
      .cloneNode(true);
    return card;
  }

  //метод генерирует готовую карточку(наполняет содержимым)
  generate() {
    this._element = this._getElement();
    this._setEventListeners();
    //вставляю картинку в  карточку
    this._element.querySelector('.card__img').style.backgroundImage = `url(${String(this.linkValue)})`;
    //показываю количество лайков
    this._element.querySelector('.card__likes-count').textContent = this.likes.length;
    //присваиваю название карточке
    this._element.querySelector('.card__description').textContent = String(this.titleValue);
    //нахожу иконку лайка
    const cardIcon = this._element.querySelector('.card__icon')
    //проверяю есть ли лайк пользователя на карточке
    const likeActive = this.likes.some((item) => {
      return item._id = userId
    })
    //если есть делаю лайк активным
    if (likeActive) {
      cardIcon.classList.add('card__icon_active');
    }

    return this._element;
  }


  //метод устанавливает слушатели
  _setEventListeners() {
    //нахожу кнопку корзины
    const cardTrash = this._element.querySelector('.card__trash')
    //вешаю событие на кнопку лайка
    this._element.querySelector('.card__icon').addEventListener('click', function (evt) {
      //проверяю есть ли класс card__icon_active в элементе
      if (evt.target.classList.contains('card__icon_active')) {
        //если есть удаляю  лайк
        this.deleteLike(data._id)
          .then((res) => {
            cardLikesCount.textContent = res.likes.length
            //и стираю сердечко
            evt.target.classList.remove('card__icon_active');
          })
          .catch((err) => {
            console.log(err); // выводим ошибку в консоль
          });
      } else {
        //если класса card__icon_active нет в элементе
        //ставлю лайк
        this.setLike(this._id)
          .then((res) => {
            cardLikesCount.textContent = res.likes.length
            //и закрашиваю сердечко
            evt.target.classList.add('card__icon_active');
          })
          .catch((err) => {
            console.log(err); // выводим ошибку в консоль
          });
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

    //если карточка моя
    if (userId === this.owner._id) {
      // вешаю событие на корзину
      cardTrash.addEventListener('click', function () {
        openPopup(popupDelete)
        //активирую кнопку
        this.activeButton(popupButtonDelete, object)
        //записываю  саму карточку которую хочу удалить
        cardDelete = this._element
        //записываю id карточки которую хочу удалить
        cardDelete.id = this._id
      });
    } else {
      //удаляю кнопку корзины
      cardTrash.remove('.card__trash')
    }
  }
}





// //функция создания карточек
// function createCard(titleValue, linkValue, data) {
//   //получаю содержимое тега template
//   const cardTemplate = document.querySelector('#card-template').content;
//   //клонирую содержимое  тега template
//   const card = cardTemplate.querySelector('.card').cloneNode(true);
//   //нахожу картинку в модальном окне
//   const cardPicture = card.querySelector('.card__img');
//   //нахожу div с количеством лайков (card__likes-count)
//   const cardLikesCount = card.querySelector('.card__likes-count');
//   //нахожу кнопку корзины
//   const cardTrash = card.querySelector('.card__trash')
//   //нахожу иконку лайка
//   const cardIcon = card.querySelector('.card__icon')
//   //показываю количество лайков
//   cardLikesCount.textContent = data.likes.length
//   //проверяю есть ли лайк пользователя на карточке
//   const likeActive = data.likes.some((item) => {
//     return item._id = userId
//   })
//   //если есть делаю лайк активным
//   if (likeActive) {
//     cardIcon.classList.add('card__icon_active');
//   }
//   //присваиваю название карточке
//   card.querySelector('.card__description').textContent = String(titleValue);
//   //вставляю картинку в  карточку
//   cardPicture.style.backgroundImage = `url(${String(linkValue)})`;
//   //вешаю событие на кнопку лайка
//   card.querySelector('.card__icon').addEventListener('click', function (evt) {
//     //проверяю есть ли класс card__icon_active в элементе
//     if (evt.target.classList.contains('card__icon_active')) {
//       //если есть удаляю  лайк
//       deleteLike(data._id)
//         .then((res) => {
//           cardLikesCount.textContent = res.likes.length
//           //и стираю сердечко
//           evt.target.classList.remove('card__icon_active');
//         })
//         .catch((err) => {
//           console.log(err); // выводим ошибку в консоль
//         });
//     } else {
//       //если класса card__icon_active нет в элементе
//       //ставлю лайк
//       setLike(data._id)
//         .then((res) => {
//           cardLikesCount.textContent = res.likes.length
//           //и закрашиваю сердечко
//           evt.target.classList.add('card__icon_active');
//         })
//         .catch((err) => {
//           console.log(err); // выводим ошибку в консоль
//         });
//     }

//     // //добавляю класс card__icon_active если его нет и удаляю  если он есть
//     // evt.target.classList.toggle('card__icon_active');
//   });
//   //вешаем событие на  картинку(открытие popup)
//   cardPicture.addEventListener('click', function () {
//     //вставляю картинку в попап с всплывающей картинкой
//     popupPictureImg.style.backgroundImage = `url(${String(linkValue)})`;
//     //вставляю описание к картинке в попап с всплывающей картинкой
//     popupPictureCaption.textContent = String(titleValue);
//     openPopup(popupPicture)
//   });

//   //если карточка моя
//   if (userId === data.owner._id) {
//     // вешаю событие на корзину
//     cardTrash.addEventListener('click', function () {
//       openPopup(popupDelete)
//       //активирую кнопку
//       activeButton(popupButtonDelete, object)
//       //записываю  саму карточку которую хочу удалить
//       cardDelete = card
//       //записываю id карточки которую хочу удалить
//       cardDelete.id = data._id
//     });
//   } else {
//     //удаляю кнопку корзины
//     cardTrash.remove('.card__trash')
//   }
//   return card
// }

// //функция добавления карточек
// function addСard(titleValue, linkValue, data) {
//   //вызываю функцию создания карточек
//   const element = createCard(titleValue, linkValue, data);
//   //добавляю новую карточку в DOM
//   cards.prepend(element);
// }

// export { addСard }






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
