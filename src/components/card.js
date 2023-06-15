//класс создания карточек
export default class Card {
  constructor(data, setLike, deleteLike, deleteCard, selector, popupPicture, popupDelete, getUserInfo) {
    this.titleValue = data.name;
    this.linkValue = data.link;
    this._selector = selector;
    this.likes = data.likes;
    this._id = data._id;
    this.ownerId = data.owner._id;
    this.setLike = setLike;
    this.deleteLike = deleteLike;
    this.deleteCard = deleteCard;
    this.popupPicture = popupPicture;
    this.popupDelete = popupDelete;
    this.getUserInfo = getUserInfo
  }

  //метод возвращает шаблон карточки
  _getElement() {
    const card = document
      .querySelector(this._selector)
      .content
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
    const likeActive = this.likes.map(user => user._id).some((item) => item === this.getUserInfo().userId)
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
    const cardLikesCount = this._element.querySelector('.card__likes-count')
    //вешаю событие на кнопку лайка
    this._element.querySelector('.card__icon').addEventListener('click', (evt) => {
      //проверяю есть ли класс card__icon_active в элементе
      if (evt.target.classList.contains('card__icon_active')) {
        //если есть удаляю  лайк
        this.deleteLike(this._id)
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
    this._element.querySelector('.card__img').addEventListener('click', () => {
      this.popupPicture.open(this.linkValue, this.titleValue)
    });

    //если карточка моя
    if (this.getUserInfo().userId === this.ownerId) {
      // вешаю событие на корзину
      cardTrash.addEventListener('click', (e) => {
        this.popupDelete.open(this._id, e.target.closest('.card'))
      });
    } else {
      //удаляю кнопку корзины
      cardTrash.remove('.card__trash')
    }
  }
}
