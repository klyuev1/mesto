// Объявление объекта, используемого в качестве конфига
const selectors = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
  submitButtonSelector: '.popup__button-save',
  inactiveButtonClass: 'popup__button_disabled'
}

class FormValidator {
  constructor(config) {
    this._formSelector = config.formSelector;
    this._inputSelector = config.inputSelector;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
  }

  // Методы, отображающие ошибку в валидации
  _showInputError(input, errorMessage) {
    input.classList.add(this._inputErrorClass);
    this._formError.classList.add(this._errorClass);
    this._formError.textContent = errorMessage;
  }
  _hideInputError(input) {
    input.classList.remove(this._inputErrorClass);
    this._formError.classList.remove(this._errorClass);
    this._formError.textContent = '';
  }

  // Метод, проверяющий валидность инпута
  _checkInputValidity(form, input) {
    this._formError = form.querySelector(`.${input.id}-error`);
    if (!input.validity.valid) {
      this._showInputError(input, input.validationMessage);
    } else {
      this._hideInputError(input);
    }
  }

  // Методы присваивания активности кнопке
  _disableButton() {
    this._submitButton.classList.add(this._inactiveButtonClass);
    this._submitButton.disabled = true;
  }
  _enableButton() {
    this._submitButton.classList.remove(this._inactiveButtonClass);
    this._submitButton.disabled = false;
  }

  // Метод проверки валидных инпутов для кнопки submit
  _hasInvalidInput() {
    return this._inputList.some((input) => {return !input.validity.valid});
  }

  // Метод обработки кнопки submit и ее активного состояния
  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._disableButton();
    } else {
      this._enableButton();
    }
  }

  // Метод, добавляющий слушатели
  _setEventListeners(form) {
    form.addEventListener('submit', (evt) =>{
      evt.preventDefault();
    });
    this._toggleButtonState();
    this._inputList.forEach((input) => {
      input.addEventListener('input', () => {
        this._checkInputValidity(form, input);
        this._toggleButtonState();
      });
    });

  }

  // Методы сброса ошибки
  resetForm(popup) {
    this._formElement = popup.querySelector(this._formSelector);
    this._inputList = this._formElement.querySelectorAll(this._inputSelector);
    this._inputList.forEach((input) => {
      this._formError = this._formElement.querySelector(`.${input.id}-error`);
      this._hideInputError(input);
    });
  }
  setDefaultButton(popup) {
    this._formElement = popup.querySelector(this._formSelector);
    this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    this._submitButton = popup.querySelector(this._submitButtonSelector);
    this._toggleButtonState();
  }


  // Публичный метод, который собирает данные из верстки
  enableValidation() {
    this._formList = Array.from(document.querySelectorAll(this._formSelector));
    this._formList.forEach((form) => {
      this._inputList = Array.from(form.querySelectorAll(this._inputSelector));
      this._submitButton = form.querySelector(this._submitButtonSelector);
      this._setEventListeners(form);
    });
  }
}


const formValidator = new FormValidator(selectors);
const elementformValidator = formValidator.enableValidation();