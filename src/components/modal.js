import { addСard } from "./card.js"
import { closePopup } from "./utils.js"
import { enableValidation, object } from "./validate.js"
import { setProfileInfo, addNewCardServer, getInitialCards, deleteCardServer, setAvatar } from "./api.js"
// находим формы в проекте
const profileForm = document.forms['profile-form'];
const cardForm = document.forms['card-form'];
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


//функция обработчик «отправки» формы для карточек
function handlerCardFormSubmit(evt) {
  // Эта строчка отменяет стандартную отправку формы.
  evt.preventDefault();
  // //вызываю функцию добавления карточек
  // addСard(popupCardTitle.value, popupCardLink.value);
  //присваиваю кнопке значение
  popupButtonCard.textContent = "Сохранение..."
  //добавляю на сервер новую карточку
  addNewCardServer(popupCardTitle.value, popupCardLink.value)
    .then((res) => {
      setTimeout(() => {
        //ощищаю импуты
        cardForm.reset();
        //закрываю попап
        closePopup(popupCard)
        popupButtonCard.textContent = "Создать"
        return res
      }
        , 1500)
    })
}

//функция обработчик «отправки» формы для профиля
function handlerProfileFormSubmit(evt) {
  // Эта строчка отменяет стандартную отправку формы.
  evt.preventDefault();
  //присваиваю кнопке значение
  popupButtonProfile.textContent = "Сохранение..."
  //отображаем на странице то что сохранилось в форме «Имя» и «О себе»
  setProfileInfo(popupName.value, popupJob.value)
    .then((res) => {
      setTimeout(() => {
        //ощищаю импуты
        cardForm.reset();
        //закрываю попап
        closePopup(popupProfile)
        popupButtonProfile.textContent = "Сохранить"
        return res
      }
        , 1500)
    })
  // profileName.textContent = popupName.value;
  // profileJob.textContent = popupJob.value;
}

//функция обработчик «отправки» формы для удаления карточки
function handlerCardFormDelete(evt) {
  // Эта строчка отменяет стандартную отправку формы.
  evt.preventDefault();
  //удаляю карточку с сервера
  deleteCardServer(evt.target.id)
  //закрываю попап
  closePopup(popupDelete);
}

//функция обработчик «отправки» формы для обновления аватара
function handlerCardFormAvatar(evt) {
  // Эта строчка отменяет стандартную отправку формы.
  evt.preventDefault();
  //присваиваю кнопке значение
  popupButtonAvatar.textContent = "Сохранение..."
  //удаляю карточку с сервера
  setAvatar(popupAvatarLink.value)
    .then((res) => {
      setTimeout(() => {
        //ощищаю импуты
        cardForm.reset();
        //закрываю попап
        closePopup(popupAvatar)
        popupButtonAvatar.textContent = "Сохранить"
        return res
      }
        , 1500)
    })
}

// Прикрепляю обработчик к формам:
profileForm.addEventListener('submit', handlerProfileFormSubmit);
cardForm.addEventListener('submit', handlerCardFormSubmit);
popupDelete.addEventListener('submit', handlerCardFormDelete);
popupAvatar.addEventListener('submit', handlerCardFormAvatar);

//функция обновляет информацию о пользователе с сервера
export const updateProfileInfo = (object) => {
  profileName.textContent = object.name;
  profileJob.textContent = object.about;
  profileAvatar.style.backgroundImage = `url(${object.avatar})`;
};

export { popupCard, popupProfile, popupName, profileName, popupJob, profileJob, profileAvatar, popupDelete, popupAvatar, popupButtonCard, popupButtonAvatar, popupButtonProfile }







// setUserInfo({
//   name: nameInput.value,
//   about: jobInput.value
// })

// .then((info) =>{
//   updateUserInfo(info);
//   closePopup(profilePopup);
// })
// .catch((err) => console.log(`Ошибка при обновлении данных пользователя: ${err}`)
// )
// .finally(() => {
//   renderLoading(profilePopup);
// })
