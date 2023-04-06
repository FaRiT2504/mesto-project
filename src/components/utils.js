
//функция открытия попапа
function openPopup(popup) {
  //открываю попап
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupEsc);
};

//функция закрытия попапа
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupEsc);
}
// закрываю попап клавишей ESC
function closePopupEsc(evt) {
  if (evt.key === 'Escape') {
    const popup = document.querySelector('.popup_opened');
    closePopup(popup);
  }
}

export { openPopup, closePopup }


