export default class Popup {
  constructor(selector) {
    this._element = document.querySelector(selector)
    this.close = this.close.bind(this)
  }

  _handleEsc = (e) => {
    if (e.key === 'Escape') { this.close(document.querySelector('.popup_opened')) }
  }

  _handleOverlayClose = (e) => {
    if (e.target.className.includes('popup_opened')) { this.close(e.target) }
  }

  open() {
    this._element.classList.add('popup_opened')
    this.setEventListeners()
  }

  close() {
    this._element.classList.remove('popup_opened')
    this.removeEventListeners()
  }

  setEventListeners() {
    document.addEventListener('keydown', this._handleEsc)
    this._element.addEventListener('click', this._handleOverlayClose)
    this._element.querySelector('.popup__close').addEventListener('click', this.close)
  }

  removeEventListeners() {
    document.removeEventListener('keydown', this._handleEsc)
    this._element.removeEventListener('click', this._handleOverlayClose)
    this._element.querySelector('.popup__close').removeEventListener('click', this.close)
  }
}
