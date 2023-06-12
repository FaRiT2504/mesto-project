const object = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  errorClass: 'popup__error_visible',
}

export default class FormValidator {
  constructor(classes) {
    this._formSelector = classes.formSelector;
    this._inputSelector = classes.inputSelector;
    this._submitButtonSelector = classes.submitButtonSelector;
    this._inputErrorClass = classes.inputErrorClass;
  }

  _hasInvalidInput(inputList) {return inputList.some(inputElement => !inputElement.validity.valid)}

  _showInputError(inputElement, errorElement) {
    inputElement.classList.add(this._inputErrorClass);

    errorElement.textContent = inputElement.validationMessage
  }

  _hideInputError(inputElement, errorElement) {
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.textContent = ''
  }

  _checkInputValidity (inputElement, errorElement) {

    if (inputElement.validity.patternMismatch) {
      inputElement.setCustomValidity(inputElement.dataset.errorMessage)
    } else {
      inputElement.setCustomValidity('')
    }

    if (inputElement.validity.valid) {
      this._hideInputError(inputElement, errorElement)
    } else {
      this._showInputError(inputElement, errorElement)
    }
  }

  toggleButtonState(inputList, buttonElement) {
    buttonElement.disabled = this._hasInvalidInput(inputList)
  }

  _setEventListeners(formElement) {
    const inputList = Array.from(formElement.querySelectorAll(this._inputSelector))
    const submitButton = formElement.querySelector(this._submitButtonSelector)

    this.toggleButtonState(inputList, submitButton)

    inputList.forEach(inputElement => inputElement.addEventListener('input', () => {
      const errorElement = formElement.querySelector(`.${inputElement.name}-input-error`)
      this._checkInputValidity(inputElement, errorElement)
      this.toggleButtonState(inputList, submitButton)
    }))
  }

  enableValidation() {
    const forms = Array.from(document.querySelectorAll(this._formSelector))

    forms.forEach(form => {
      this._setEventListeners(form)
    });
  }
}
