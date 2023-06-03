import { addСard, cardIdDelete, cardDelete } from "./card.js"
import { closePopup } from "./utils.js"
import { enableValidation, object } from "./validate.js"
import { setProfileInfo, addNewCardServer, getInitialCards, deleteCardServer, setAvatar } from "./api.js"
// находим формы в проекте
const profileForm = document.forms['profile-form'];
const cardForm = document.forms['card-form'];
const avatarForm = document.forms['avatar-form'];
const cardDeleteForm = document.forms['cardDelete-form'];
// Нахожу модальное окно "новое место" в DOM
const popupCard = document.querySelector('#popup-add');
// Нахожу модальное окно удаления карточки
const popupDelete = document.querySelector('#popup-delete');
// Нахожу модальное окно для удаления аватара
const popupAvatar = document.querySelector('#popup-avatar');
// Нахожу модальное окно "редактировать" в DOM
const popupProfile = document.querySelector('#popup-edit');
//нахожу кнопку попапа  обновления аватара (для улучшения UX буду менять на "Сохранение...")
const popupButtonAvatar = document.querySelector('.popup__button_avatar');
//нахожу кнопку попапа редактирования профиля(для улучшения UX буду менять на "Сохранение...")
const popupButtonProfile = document.querySelector('.popup__button_profile');
//нахожу кнопку попапа добавления новой карточки(для улучшения UX меняю на "Сохранение...")
const popupButtonCard = document.querySelector('.popup__button_card');
//Нахожу элемент с названием картинки  в DOM
const popupCardTitle = popupCard.querySelector('.popup__input_type_title');
//Нахожу элемент с ссылкой на картинку  в DOM
const popupCardLink = popupCard.querySelector('.popup__input_type_link');
//Нахожу элемент с ссылкой на картинку нового аватара в DOM
const popupAvatarLink = popupAvatar.querySelector('.popup__input_avatar_link');
// Нахожу поле с именем в попап
const popupName = document.querySelector('.popup__input_type_name');
// Нахожу поле "О себе" в попап
const popupJob = document.querySelector('.popup__input_type_job');
// Нахожу поле с именем на странице
const profileName = document.querySelector('.profile__name');
// Нахожу поле "О себе" на странице
const profileJob = document.querySelector('.profile__job');
//нахожу картинку пользователя
const profileAvatar = document.querySelector('.profile__avatar');
//универсальня функцию управления текстом кнопки с 3 и 4 необязательными аргументами
export function renderLoading(isLoading, button, buttonText = 'Сохранить', loadingText = 'Сохранение...') {
  if (isLoading) {
    button.textContent = loadingText
  } else {
    button.textContent = buttonText
  }
}

//универсальная функция, которая принимает функцию запроса, объект события и текст во время загрузки
export function handleSubmit(request, evt, loadingText = "Сохранение...") {
  // всегда нужно предотвращать перезагрузку формы при сабмите
  evt.preventDefault();
  // универсально получаем кнопку сабмита из `evt`
  const submitButton = evt.submitter;
  // записываем начальный текст кнопки до вызова запроса
  const initialText = submitButton.textContent;
  // изменяем текст кнопки до вызова запроса
  renderLoading(true, submitButton, initialText, loadingText);
  request()
    .then(() => {
      //  очистка формы после успешного ответа от сервера
      evt.target.reset();
      //закрытие попапа
      closePopup(evt.target.closest('.popup'))
    })
    .catch((err) => {
      // ловим ошибку
      console.error(`Ошибка: ${err}`);
    })
    //возвращаем обратно начальный текст кнопки
    .finally(() => {
      renderLoading(false, submitButton, initialText);
    });
}

//функция обработчик «отправки» формы для карточек
export function handlerCardFormSubmit(evt) {
  // функция которая возвращает промис
  function makeRequest() {
    //это позволяет потом дальше продолжать цепочку `then, catch, finally`
    return addNewCardServer(popupCardTitle.value, popupCardLink.value)
      .then((res) => {
        addСard(res.name, res.link, res)
      });
  }
  //универсальная функция, передаем в нее запрос, событие и текст изменения кнопки (если нужен другой, а не `"Сохранение..."`)
  handleSubmit(makeRequest, evt);
}

// обработчик сабмита формы профиля
export function handlerProfileFormSubmit(evt) {
  // функция которая возвращает промис
  function makeRequest() {
    //это позволяет потом дальше продолжать цепочку `then, catch, finally`
    return setProfileInfo(popupName.value, popupJob.value)
      .then((res) => {
        profileName.textContent = res.name;
        profileJob.textContent = res.about;
      });
  }
  //универсальная функция, передаем в нее запрос, событие и текст изменения кнопки (если нужен другой, а не `"Сохранение..."`)
  handleSubmit(makeRequest, evt);
}

//функция обработчик «отправки» формы для обновления аватара
export function handlerCardFormAvatar(evt) {
  // функция которая возвращает промис
  function makeRequest() {
    //это позволяет потом дальше продолжать цепочку `then, catch, finally`
    return setAvatar(popupAvatarLink.value)
      .then((res) => {
        profileAvatar.style.backgroundImage = `url(${res.avatar})`
      });
  }
  //универсальная функция, передаем в нее запрос, событие и текст изменения кнопки (если нужен другой, а не `"Сохранение..."`)
  handleSubmit(makeRequest, evt);
}

// Прикрепляю обработчик к форме
export function handlerCardFormDelete(evt) {
  // функция которая возвращает промис
  function makeRequest() {
    return deleteCardServer(cardDelete.id)
      .then(() => {
        // удаляю карточку
        cardDelete.remove()
      })
  }
  //универсальная функция, передаем в нее запрос, событие и текст изменения кнопки (если нужен другой, а не `"Сохранение..."`)
  handleSubmit(makeRequest, evt);
}

// //функция обновляет информацию о пользователе с сервера
// export const updateProfileInfo = (object) => {
//   profileName.textContent = object.name;
//   profileJob.textContent = object.about;
//   profileAvatar.style.backgroundImage = `url(${object.avatar})`;
// };

export { popupCard, popupProfile, popupName, profileName, popupJob, profileJob, profileAvatar, popupDelete, popupAvatar, popupButtonCard, popupButtonAvatar, popupButtonProfile, cardDeleteForm, avatarForm, profileForm, cardForm }


export class Popup {
  constructor(selector) {
    this._element = document.querySelector(selector)
  }

  _handleEsc(e) {
    if (e.key === 'Escape') { this._close(document.querySelector('.popup_active')) }
  }

  _handleOverlayClose(e) {
    if (e.target.className.includes('popup_active')) { this._close(e.target) }
  }

  open() {
    this._element.classList.add('popup_active')
    this.setEventListeners()
  }

  close() {
    this._element.classList.remove('popup_active')
    this.removeEventListeners()
  }

  setEventListeners() {
    document.addEventListener('keydown', this._handleEsc)
    this._element.addEventListener('click', this._handleOverlayClose)
  }

  removeEventListeners() {
    document.removeEventListener('keydown', this._handleEsc)
    this._element.removeEventListener('click', this._handleOverlayClose)
  }
}

export class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector)
  }

  open(link) {
    super.open()
    this._element.querySelector('.popup-picture__img').src = link
  }
}

export class PopupWithForm extends Popup {
  constructor(selector, callback) {
    super(selector)
    this._callback = callback
    this._form = this._element.querySelector('.popup__form')
  }

  _getInputValues() {
    const formData = new FormData(this._form)
    return Object.fromEntries(formData)
  }

  _submitForm() {
    this._callback(this._getInputValues())
  }

  setEventListeners() {
    super.setEventListeners()
    this._form.addEventListener('submit', this._submitForm)
  }

  removeEventListeners() {
    super.removeEventListeners()
    this._form.addEventListener('submit', this._submitForm)
  }

  close() {
    super.close()
    this._form.reset()
  }
}
