import '../pages/index.css'
import Api from './api';
import { UserInfo } from "./UserInfo";
import FormValidator from "./validate";
import { PopupWithForm, PopupWithImage } from "./modal";
import { addButton, avatarButton, editButton } from './utils';
import Section from './section';
import Card from './card';

const api = new Api({
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-22',
  headers: {
    authorization: 'da373be5-de2f-43e0-943d-28642416cb3a',
    'Content-Type': 'application/json'
  }
})

const userInfo = new UserInfo({
  nameSelector: '.profile__name',
  jobSelector: '.profile__job',
  avatarSelector: '.profile__avatar'
}, api.getProfileInfo, api.setProfileInfo, api.setAvatar)

const validator = new FormValidator({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  errorClass: 'popup__error_visible',
})

const picturePopup = new PopupWithImage('#popup-picture')
const deletePopup = new PopupWithForm('#popup-delete')

const section = new Section({
  items: api.getInitialCards().then(items => {
    return items.map(item => {
      const card = new Card(item, api.setLike, api.deleteLike, api.deleteCardServer, '#card-template', picturePopup, deletePopup, userInfo.getUserInfo)
      return card.generate()
    })
  }),
  renderer: (item => {
    document.querySelector('.cards').prepend(item)
  })
})

const avatarForm = new PopupWithForm('#popup-avatar', userInfo.setUserAvatar)
const editForm = new PopupWithForm('#popup-edit', userInfo.setUserInfo)
const addForm = new PopupWithForm('#popup-add', pictureData => {
  api.addNewCardServer(pictureData.title, pictureData.url).then(picture => {
    const card = new Card(picture, api.setLike, api.deleteLike, api.deleteCardServer, '#card-template')
    section.addItem(card.generate())
  })
})

editButton.addEventListener('click', () => editForm.open.call(editForm, userInfo.getUserInfo()))
addButton.addEventListener('click', addForm.open.bind(addForm))
avatarButton.addEventListener('click', avatarForm.open.bind(avatarForm))

validator.enableValidation()

section.renderItems()

