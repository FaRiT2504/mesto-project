export class Popup {
  constructor(selector) {
    this._element = document.querySelector(selector)
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
    this._element.querySelector('.popup__close').addEventListener('click', this.close.bind(this))
  }

  removeEventListeners() {
    document.removeEventListener('keydown', this._handleEsc)
    this._element.removeEventListener('click', this._handleOverlayClose)
    this._element.querySelector('.popup__close').removeEventListener('click', this.close)
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
    this._submitButton = this._form.querySelector('.popup__button')
  }

  open({ name, about }) {
    super.open()
    if (name && about) {
      this._form.elements.name.value = name
      this._form.elements.about.value = about
    }
  }

  close() {
    super.close()
    this._form.reset()
  }

  _getInputValues() {
    const formData = new FormData(this._form)
    return Object.fromEntries(formData)
  }

  _submitForm = (e) => {
    e.preventDefault()
    const inputValues = this._getInputValues()
    const submitInitialValue = this._submitButton.textContent
    this._submitButton.textContent = 'Сохранение...'

    this._callback(inputValues).then(() => {
      this._submitButton.textContent = submitInitialValue
      this.close()
    })
  }

  setEventListeners() {
    super.setEventListeners()
    this._form.addEventListener('submit', this._submitForm)
  }

  removeEventListeners() {
    super.removeEventListeners()
    this._form.addEventListener('submit', this._submitForm)
  }
}
