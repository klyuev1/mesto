import {Popup} from './Popup.js';

export class PopupWithForm extends Popup {
  constructor(popupSelector, handleSubmitForm) {
    super(popupSelector);
    this._handleSubmitForm = handleSubmitForm;
    this._formElement = document.querySelector('.popup__form');
    this._inputList = this._formElement.querySelectorAll('.popup__input');
  }
  _getInputValues() {
    this._inputList.forEach((input) => {
      return this._inputValue = input.value;
    });
  }
  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._getInputValues();
    });
  }
}