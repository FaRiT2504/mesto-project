
//функция открытия попапа
function openPopup(popup) {
  //открываю попап
  popup.classList.add('popup_opened');
};

//функция закрытия попапа
function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

export { openPopup, closePopup }


