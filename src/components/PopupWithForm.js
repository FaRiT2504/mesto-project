import Popup from "./Popup"

export default class PopupWithForm extends Popup {
  constructor(selector, callback) {
    super(selector)
    this._callback = callback
    this.form = this._element.querySelector('.popup__form')
    this._submitButton = this.form.querySelector('.popup__button')
    this._submitForm = this._submitForm.bind(this)
    this._inputList = this.form.querySelectorAll('input')
  }

  open() {
    super.open()
  }

  close() {
    super.close()
    this.form.reset()
  }

  _getInputValues() {
    const formData = new FormData(this.form)
    return Object.fromEntries(formData)
  }

  setInputValues(values) {
    this._inputList.forEach((input, index) => {
      input.value = values[index]
    })
  }

  _submitForm(e) {
    e.preventDefault()
    const inputValues = this._getInputValues()
    const submitInitialValue = this._submitButton.textContent
    this._submitButton.textContent = 'Сохранение...'

    this._callback(inputValues, this.card).then(() => {
      this.close()
    }).catch(err => {
      console.log(err)
    }).finally(() => {
      this._submitButton.textContent = submitInitialValue
    })
  }

  setEventListeners() {
    super.setEventListeners()
    this.form.addEventListener('submit', this._submitForm)
  }

  removeEventListeners() {
    super.removeEventListeners()
    this.form.removeEventListener('submit', this._submitForm)
  }
}

