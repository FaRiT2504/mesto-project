import '../pages/index.css'
import Api from './api';
import UserInfo from "./UserInfo";
import FormValidator from "./validate";
import PopupWithForm from './PopupWithForm';
import PopupWithConfirm from './PopupWithConfirm';
import PopupWithImage from './PopupWithImage';
import { addButton, avatarButton, editButton, formClasses } from './utils';
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

const picturePopup = new PopupWithImage('#popup-picture')
const deletePopup = new PopupWithConfirm('#popup-delete', (id, card) => api.deleteCardServer(id).then(() => {
  card.remove()
}))

const createCard = (item) => {
    const card = new Card(item, api.setLike, api.deleteLike, api.deleteCardServer, '#card-template', picturePopup, deletePopup, userInfo.getUserInfo)
    return card.generate()
}

const section = new Section({
  items: api.getInitialCards().then(items => {
    return items.map(createCard)
  }),
  renderer: (item => {
    document.querySelector('.cards').prepend(item)
  })
})

const avatarForm = new PopupWithForm('#popup-avatar', userInfo.setUserAvatar)
const avatarFormValidator = new FormValidator(formClasses, avatarForm.form)
avatarFormValidator.enableValidation()
const editForm = new PopupWithForm('#popup-edit', userInfo.setUserInfo)
const editFormValidator = new FormValidator(formClasses, editForm.form)
editFormValidator.enableValidation()
const addForm = new PopupWithForm('#popup-add', pictureData => {
  return api.addNewCardServer(pictureData.title, pictureData.url).then((res) => section.addItem(createCard(res)))
})
const addFormValidator = new FormValidator(formClasses, addForm.form)
addFormValidator.enableValidation()

editButton.addEventListener('click', () => {
  editForm.setInputValues(Object.values(userInfo.getUserInfo()))
  editForm.open.call(editForm)

})
addButton.addEventListener('click', addForm.open.bind(addForm))
avatarButton.addEventListener('click', avatarForm.open.bind(avatarForm))

// validator.enableValidation()
section.renderItems()

