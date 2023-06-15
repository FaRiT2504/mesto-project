import Popup from "./Popup"

export default class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector)
    this._image = this._element.querySelector('.popup-picture__img')
    this._imageName = this._element.querySelector('.popup-picture__caption')
  }

  open(link, name) {
    super.open()
    this._image.src = link
    this._image.alt = name
    this._imageName.textContent = name
  }
}
