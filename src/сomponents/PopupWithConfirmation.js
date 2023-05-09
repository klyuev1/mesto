import {Popup} from './Popup.js';

export class PopupWithConfirmation extends Popup {
  constructor(popupSelector, handleSubmitForm) {
    super(popupSelector);
    this._handleSubmitForm = handleSubmitForm;
    this._formElement = this._popupSelector.querySelector('.popup__form');
  }
  setData(cardId, element) {
    this._cardId = cardId;
    this._element = element;
  }

  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleSubmitForm(this._cardId, this._element);
      this.closePopup();
    });
  }
  closePopup() {
    super.closePopup();
    this._formElement.reset();
  }
}