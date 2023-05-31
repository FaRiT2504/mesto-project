const object = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  errorClass: 'popup__error_visible',
}

//функция, которая добавляет класс с ошибкой. Получает параметром форму, в которой
// находится проверяемое поле, и само это поле
const showInputError = (formElement, inputElement, errorMessage, object) => {
  // выбираю текст ошибки на основе уникального класса
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.add(object.inputErrorClass);
  errorElement.textContent = errorMessage;
  //показываю сообщение об ошибке
  errorElement.classList.add(object.errorClass);
};

//функция, которая удаляет класс с ошибкой.Получает параметром форму, в которой
// находится проверяемое поле, и само это поле
const hideInputError = (formElement, inputElement, object) => {
  // Нахожу элемент ошибки
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(object.inputErrorClass);
  //скрываю сообщение об ошибке
  errorElement.classList.remove(object.errorClass);
  errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement) => {

  if (inputElement.validity.patternMismatch) {

    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  }
  else {
    inputElement.setCustomValidity("");
  }
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, object);
  }
  else {
    hideInputError(formElement, inputElement, object);
  }
};

const setEventListeners = (formElement, object) => {
  const inputList = Array.from(formElement.querySelectorAll(object.inputSelector));
  const buttonElement = formElement.querySelector(object.submitButtonSelector)
  // buttonElement.setAttribute('disabled', true)
  // деактивируем кнопку при 1й загрузке сайта
  toggleButtonState(inputList, buttonElement, object)
  formElement.addEventListener('reset', () => {
    disableButton(buttonElement, object)
  });
  inputList.forEach(function (inputElement) {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement, object)
    });
  });
};

function enableValidation(object) {
  const formList = Array.from(document.querySelectorAll(object.formSelector));
  formList.forEach(function (formElement) {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    setEventListeners(formElement, object);
  });
};

// Функция принимает массив полей и проверяет каждое поле на валидность
function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
}
// функция деактивировации кнопки сабмита
function disableButton(buttonElement, object) {
  buttonElement.classList.add(object.inactiveButtonClass);
  buttonElement.setAttribute('disabled', true)
}
// функция активировации кнопки сабмита
export function activeButton(buttonElement, object) {
  buttonElement.classList.remove(object.inactiveButtonClass);
  buttonElement.removeAttribute('disabled')
}
//функция отключает и включает кнопку
function toggleButtonState(inputList, buttonElement, object) {
  if (hasInvalidInput(inputList)) {
    disableButton(buttonElement, object);
  } else {
    activeButton(buttonElement, object);
  }
}

export { object, showInputError, hideInputError, checkInputValidity, setEventListeners, enableValidation, hasInvalidInput, toggleButtonState, disableButton }

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
      _hideInputError(inputElement, errorElement)
    } else {
      _showInputError(inputElement, errorElement)
    }
  }

  toggleButtonState(inputList, buttonElement) {
    buttonElement.disabled = _hasInvalidInput(inputList)
  }

  _setEventListeners(formElement) {
    const inputList = Array.from(formElement.querySelectorAll(this._inputSelector))
    const submitButton = formElement.querySelector(this._submitButtonSelector)

    toggleButtonState(inputList, submitButton)

    inputList.forEach(inputElement => inputElement.addEventListener('input', () => {
      const errorElement = formElement.querySelector(`${inputElement.name}-input-error`)
      _checkInputValidity(inputElement, this._inputErrorClass, errorElement)
      toggleButtonState(inputList, submitButton)
    }))
  }

  enableValidation() {
    const forms = Array.from(document.querySelectorAll(this._formSelector))

    forms.forEach(form => {
      _setEventListeners(form)
    });
  }
}
