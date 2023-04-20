// Объявление класса
export class FormValidator {
  constructor(config, formElement) {
    this._formSelector = config.formSelector;
    this._inputSelector = config.inputSelector;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._form = formElement;
    this._inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
    this._submitButtonSelector = formElement.querySelector(config.submitButtonSelector);
  }

  // Методы, отображающие ошибку в валидации
  _showInputError(input, errorMessage) {
    this._formError = this._form.querySelector(`.${input.id}-error`);
    input.classList.add(this._inputErrorClass);
    this._formError.classList.add(this._errorClass);
    this._formError.textContent = errorMessage;
  }
  _hideInputError(input) {
    this._formError = this._form.querySelector(`.${input.id}-error`);
    input.classList.remove(this._inputErrorClass);
    this._formError.classList.remove(this._errorClass);
    this._formError.textContent = '';
  }

  // Метод, проверяющий валидность инпута
  _checkInputValidity(input) {
    if (!input.validity.valid) {
      this._showInputError(input, input.validationMessage);
    } else {
      this._hideInputError(input);
    }
  }

  // Методы присваивания активности кнопке
  _disableButton() {
    this._submitButtonSelector.classList.add(this._inactiveButtonClass);
    this._submitButtonSelector.disabled = true;
  }
  _enableButton() {
    this._submitButtonSelector.classList.remove(this._inactiveButtonClass);
    this._submitButtonSelector.disabled = false;
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
  _setEventListeners() {
    this._inputList.forEach((input) => {
      input.addEventListener('input', () =>{
        this._checkInputValidity(input);
        this._toggleButtonState();
      });
    });
  }
  
  // Публичный метод сброса ошибки
  setDefaultButton() {
    this._inputList.forEach((input) => {
      this._hideInputError(input);
      this._toggleButtonState();
    })
  }
  
  // Публичный метод, который собирает данные из верстки
  enableValidation() {
    this._setEventListeners();
  }
}