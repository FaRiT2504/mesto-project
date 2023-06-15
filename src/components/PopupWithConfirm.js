import PopupWithForm from "./PopupWithForm"

export default class PopupWithConfirm extends PopupWithForm {
  constructor(selector, callback) {
    super(selector)
    this._callback = callback
    this.form = this._element.querySelector('.popup__form')
    this._submitButton = this.form.querySelector('.popup__button')
  }

  open(card, id) {
    super.open()
    this._id = id
    this._card = card
  }

  _submitForm(e) {
    e.preventDefault()
    const submitInitialValue = this._submitButton.textContent
    this._submitButton.textContent = 'Сохранение...'

    this._callback(this._card, this._id).then(() => {
      this.close()
    }).catch(err => {
      console.log(err)
    }).finally(() => {
      this._submitButton.textContent = submitInitialValue
    })
  }
}
