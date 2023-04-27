export class Popup {
  constructor(popupSelector) {
    this._popupSelector = document.querySelector(popupSelector);
    this._popupCloseButton = this._popupSelector.querySelector('.popup__button-close');
  }
  _handleEscClose = (evt) => {
    if (evt.key === 'Escape') {
    this.closePopup();
    }
  }

  openPopup() {
    this._popupSelector.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }
  closePopup() {
    this._popupSelector.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }
  setEventListeners() {
    this._popupCloseButton.addEventListener('click', () => this.closePopup());
    this._popupSelector.addEventListener('click', (evt) => {
      if (evt.currentTarget === evt.target) {
        this.closePopup();
      }
    });
  }
}