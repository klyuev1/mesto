import {Popup} from './Popup.js';

export class PopupWithForm extends Popup {
  constructor(popupSelector, handleSubmitForm) {
    super(popupSelector);
    this._handleSubmitForm = handleSubmitForm;
    this._formElement = this._popupSelector.querySelector('.popup__form');
    this._inputList = this._formElement.querySelectorAll('.popup__input');
  }
  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }
  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleSubmitForm(this._getInputValues());
      this.closePopup();
    });
  }
  closePopup() {
    super.closePopup();
    this._formElement.reset();
  }
}