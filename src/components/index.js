import '../pages/index.css'
import Api from './api';
import { UserInfo } from "./UserInfo";
import FormValidator from "./validate";
import { PopupWithForm, PopupWithImage } from "./modal";
import { addButton, avatarButton, editButton } from './utils';

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

const avatarForm = new PopupWithForm('#popup-avatar', userInfo.setUserAvatar)
const editForm = new PopupWithForm('#popup-edit', userInfo.setUserInfo)
const picturePopup = new PopupWithImage('#popup-picture')
const addForm = new PopupWithForm('#popup-add')

editButton.addEventListener('click', () => editForm.open.call(editForm, userInfo.getUserInfo()))
addButton.addEventListener('click', addForm.open.bind(addForm))
avatarButton.addEventListener('click', avatarForm.open.bind(avatarForm))

validator.enableValidation()
